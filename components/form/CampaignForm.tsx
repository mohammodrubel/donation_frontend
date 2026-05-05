"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/share/rich-text-editor";
import { LANG_LABELS, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";

export interface CampaignTranslationRow {
  lang: Lang;
  title: string;
  description: string;
  story: string;
}

export interface CampaignFormData {
  id?: string;
  title: string;
  slug: string;
  description: string;
  story: string;
  category: string;
  goalAmount: number;
  collectedAmount?: number;
  image: string;
  featured: boolean;
  endDate: string;
  tags: string[];
  acceptedItems: string[];
  translations?: CampaignTranslationRow[];
}

interface Props {
  initialData: CampaignFormData;
  onSubmit: (data: CampaignFormData, file: File | null) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

type LangFormState = Record<Lang, { title: string; description: string; story: string }>;

const blankLangForm = (): LangFormState =>
  SUPPORTED_LANGS.reduce((acc, lang) => {
    acc[lang] = { title: "", description: "", story: "" };
    return acc;
  }, {} as LangFormState);

const hydrateLangForms = (initial: CampaignFormData): LangFormState => {
  const next = blankLangForm();
  next[DEFAULT_LANG] = {
    title: initial.title || "",
    description: initial.description || "",
    story: initial.story || "",
  };
  for (const t of initial.translations || []) {
    if (SUPPORTED_LANGS.includes(t.lang)) {
      next[t.lang] = {
        title: t.title || "",
        description: t.description || "",
        story: t.story || "",
      };
    }
  }
  return next;
};

export function CampaignForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<CampaignFormData>(initialData);
  const [langForms, setLangForms] = useState<LangFormState>(() => hydrateLangForms(initialData));
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData.image);

  const [tagInput, setTagInput] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [acceptsMoney, setAcceptsMoney] = useState<boolean>(
    (initialData.goalAmount ?? 0) > 0
  );

  useEffect(() => {
    setForm(initialData);
    setPreview(initialData.image);
    setLangForms(hydrateLangForms(initialData));
    setAcceptsMoney((initialData.goalAmount ?? 0) > 0);
  }, [initialData]);

  const updateField = (
    key: keyof CampaignFormData,
    value: string | number | boolean | string[]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateLangField = (
    lang: Lang,
    field: "title" | "description" | "story",
    value: string
  ) => {
    setLangForms((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleEnglishTitle = (value: string) => {
    updateLangField(DEFAULT_LANG, "title", value);
    updateField("slug", generateSlug(value));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (!form.tags.includes(tagInput.trim())) {
      updateField("tags", [...form.tags, tagInput.trim()]);
    }
    setTagInput("");
  };

  const removeTag = (index: number) => {
    updateField("tags", form.tags.filter((_, i) => i !== index));
  };

  const addItem = () => {
    if (!itemInput.trim()) return;
    if (!form.acceptedItems.includes(itemInput.trim())) {
      updateField("acceptedItems", [...form.acceptedItems, itemInput.trim()]);
    }
    setItemInput("");
  };

  const removeItem = (index: number) => {
    updateField("acceptedItems", form.acceptedItems.filter((_, i) => i !== index));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const en = langForms[DEFAULT_LANG];

    if (!en.title || !form.category) {
      alert("Please fill required fields (English title, category)");
      return;
    }

    if (acceptsMoney && (!form.goalAmount || form.goalAmount <= 0)) {
      alert("Please enter a goal amount, or turn off 'Accept monetary donations'");
      return;
    }

    if (!acceptsMoney && form.acceptedItems.length === 0) {
      alert("Add at least one accepted item, or turn on 'Accept monetary donations'");
      return;
    }

    const translations: CampaignTranslationRow[] = SUPPORTED_LANGS
      .map((lang) => ({ lang, ...langForms[lang] }))
      .filter((t) => t.title.trim() !== "" && t.description.trim() !== "" && t.story.trim() !== "");

    await onSubmit(
      {
        ...form,
        goalAmount: acceptsMoney ? Number(form.goalAmount) : 0,
        title: en.title,
        description: en.description,
        story: en.story,
        image: preview,
        translations,
      },
      file
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Translatable content per language */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Content (per language)</h2>

          <Tabs defaultValue={DEFAULT_LANG} className="w-full">
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${SUPPORTED_LANGS.length}, minmax(0, 1fr))` }}
            >
              {SUPPORTED_LANGS.map((lang) => (
                <TabsTrigger key={lang} value={lang} className="gap-2">
                  <span aria-hidden>{LANG_LABELS[lang].flag}</span>
                  <span>{LANG_LABELS[lang].native}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {SUPPORTED_LANGS.map((lang) => (
              <TabsContent key={lang} value={lang} className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium">
                    Title ({LANG_LABELS[lang].native})
                    {lang === DEFAULT_LANG && <span className="text-destructive ml-1">*</span>}
                  </label>
                  <Input
                    placeholder={`Title in ${LANG_LABELS[lang].native}`}
                    value={langForms[lang].title}
                    onChange={(e) =>
                      lang === DEFAULT_LANG
                        ? handleEnglishTitle(e.target.value)
                        : updateLangField(lang, "title", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Description ({LANG_LABELS[lang].native})</label>
                  <RichTextEditor
                    content={langForms[lang].description}
                    onChange={(v) => updateLangField(lang, "description", v)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Story ({LANG_LABELS[lang].native})</label>
                  <RichTextEditor
                    content={langForms[lang].story}
                    onChange={(v) => updateLangField(lang, "story", v)}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Basic Info (shared) */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Info</h2>

          <Input
            placeholder="Slug"
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
          />

          <select
            className="w-full border rounded px-3 py-2"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="food">Food</option>
            <option value="family">Family</option>
            <option value="community">Community</option>
            <option value="emergency">Emergency</option>
            <option value="disaster">Disaster</option>
            <option value="shelter">Shelter</option>
            <option value="orphan">Orphan</option>
            <option value="women">Women</option>
          </select>

          <div className="rounded border p-3 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">Accept monetary donations</p>
                <p className="text-xs text-muted-foreground">
                  Turn off for an items-only campaign.
                </p>
              </div>
              <Switch
                checked={acceptsMoney}
                onCheckedChange={(v) => {
                  setAcceptsMoney(v);
                  if (!v) updateField("goalAmount", 0);
                }}
              />
            </div>

            {acceptsMoney && (
              <Input
                type="number"
                min={1}
                placeholder="Goal Amount"
                value={form.goalAmount || ""}
                onChange={(e) => updateField("goalAmount", Number(e.target.value))}
              />
            )}
          </div>

          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />

          <div className="flex justify-between items-center">
            <span>Featured Campaign</span>
            <Switch
              checked={form.featured}
              onCheckedChange={(v) => updateField("featured", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tags + Accepted Items */}
      <Card>
        <CardContent className="pt-6 space-y-5">
          <div>
            <h2 className="font-semibold mb-2">Tags</h2>
            <Input
              placeholder="Add tag + Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {form.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="ml-2">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Accepted Items</h2>
            <Input
              placeholder="Accepted item + Enter"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem();
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {form.acceptedItems.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 rounded-full text-sm">
                  {item}
                  <button type="button" onClick={() => removeItem(i)} className="ml-2">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-semibold text-lg">Image</h2>
          <Input type="file" accept="image/*" onChange={handleImage} />
          {preview && (
            <img src={preview} alt="Preview" className="w-40 h-40 rounded object-cover" />
          )}
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Campaign"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
