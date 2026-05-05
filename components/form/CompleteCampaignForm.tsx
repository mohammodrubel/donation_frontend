"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/share/rich-text-editor";
import { Loader2, X } from "lucide-react";
import { useCompleteCampaignMutation } from "@/lib/reudx/fetchers/campain/campainApi";
import { LANG_LABELS, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";
import { Flag } from "@/lib/i18n/Flag";
import { toast } from "sonner";

interface Props {
  campaignId: string;
  initialSuccessStory?: string;
  initialSuccessImages?: string[];
  initialTranslations?: Array<{ lang: string; successStory?: string | null }>;
  onSuccess?: () => void;
}

type LangFormState = Record<Lang, { successStory: string }>;

const blank = (): LangFormState =>
  SUPPORTED_LANGS.reduce((acc, lang) => {
    acc[lang] = { successStory: "" };
    return acc;
  }, {} as LangFormState);

export function CompleteCampaignForm({
  campaignId,
  initialSuccessStory,
  initialSuccessImages = [],
  initialTranslations = [],
  onSuccess,
}: Props) {
  const [complete, { isLoading }] = useCompleteCampaignMutation();
  const [langForms, setLangForms] = useState<LangFormState>(() => {
    const next = blank();
    next[DEFAULT_LANG].successStory = initialSuccessStory || "";
    for (const t of initialTranslations) {
      if (SUPPORTED_LANGS.includes(t.lang as Lang)) {
        next[t.lang as Lang].successStory = t.successStory || "";
      }
    }
    return next;
  });
  const [keptImages, setKeptImages] = useState<string[]>(initialSuccessImages);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const previewUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      previewUrlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      previewUrlsRef.current = [];
    };
  }, []);

  const updateLang = (lang: Lang, value: string) => {
    setLangForms((prev) => ({
      ...prev,
      [lang]: { successStory: value },
    }));
  };

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setNewFiles((prev) => [...prev, ...files]);
    files.forEach((f) => previewUrlsRef.current.push(URL.createObjectURL(f)));
    e.target.value = "";
  };

  const removeKept = (url: string) => {
    setKeptImages((prev) => prev.filter((u) => u !== url));
  };

  const removeNew = (idx: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const en = langForms[DEFAULT_LANG].successStory.trim();
    if (!en) {
      toast.error("English success story is required");
      return;
    }

    const translations = SUPPORTED_LANGS
      .map((lang) => ({ lang, successStory: langForms[lang].successStory }))
      .filter((t) => t.successStory.trim() !== "");

    const fd = new FormData();
    fd.append(
      "data",
      JSON.stringify({
        successStory: en,
        translations,
        existingImages: keptImages,
      })
    );
    newFiles.forEach((f) => fd.append("successImages", f));

    try {
      await complete({ id: campaignId, data: fd }).unwrap();
      toast.success("Campaign marked as completed");
      onSuccess?.();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to complete campaign");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="text-sm text-muted-foreground">
        Once marked as completed, this campaign will stop accepting donations and item donations.
      </p>

      <div>
        <Label className="mb-2 block">Success Story</Label>
        <Tabs defaultValue={DEFAULT_LANG} className="w-full">
          <TabsList
            className="grid w-full"
            style={{ gridTemplateColumns: `repeat(${SUPPORTED_LANGS.length}, minmax(0, 1fr))` }}
          >
            {SUPPORTED_LANGS.map((lang) => (
              <TabsTrigger key={lang} value={lang} className="gap-2">
                <Flag lang={lang} />
                <span>{LANG_LABELS[lang].native}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {SUPPORTED_LANGS.map((lang) => (
            <TabsContent key={lang} value={lang} className="pt-4">
              <Label className="text-xs text-muted-foreground mb-1 block">
                Story ({LANG_LABELS[lang].native})
                {lang === DEFAULT_LANG && <span className="text-destructive ml-1">*</span>}
              </Label>
              <RichTextEditor
                content={langForms[lang].successStory}
                onChange={(v: string) => updateLang(lang, v)}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div>
        <Label className="mb-2 block">Success Images</Label>

        {(keptImages.length > 0 || newFiles.length > 0) && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
            {keptImages.map((url) => (
              <div key={url} className="relative group">
                <img src={url} alt="" className="w-full h-24 object-cover rounded-md border" />
                <button
                  type="button"
                  onClick={() => removeKept(url)}
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {newFiles.map((file, i) => (
              <div key={`${file.name}-${i}`} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt=""
                  className="w-full h-24 object-cover rounded-md border"
                />
                <button
                  type="button"
                  onClick={() => removeNew(i)}
                  className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove image"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Input type="file" accept="image/*" multiple onChange={onFilesChange} />
        <p className="text-xs text-muted-foreground mt-1">
          Add photos that show the impact. Up to 10 images.
        </p>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isLoading} className="gap-2">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          Mark as Successful
        </Button>
      </div>
    </form>
  );
}
