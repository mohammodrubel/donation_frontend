"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RichTextEditor } from "@/components/share/rich-text-editor";
import { LANG_LABELS, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";

export interface CharityTranslationRow {
  lang: Lang;
  name: string;
  mission: string;
  description: string;
  address: string;
}

export interface CharityFormData {
  id?: string;
  name: string;
  description: string;
  mission: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  logo?: string;
  banner?: string;
  translations?: CharityTranslationRow[];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: CharityFormData,
    logo: File | null,
    banner: File | null
  ) => Promise<void>;
  initialData?: CharityFormData;
  isLoading?: boolean;
}

type LangFormState = Record<
  Lang,
  { name: string; mission: string; description: string; address: string }
>;

const blankLangForm = (): LangFormState =>
  SUPPORTED_LANGS.reduce((acc, lang) => {
    acc[lang] = { name: "", mission: "", description: "", address: "" };
    return acc;
  }, {} as LangFormState);

const hydrateLangForms = (initial?: CharityFormData): LangFormState => {
  const next = blankLangForm();
  if (initial) {
    next[DEFAULT_LANG] = {
      name: initial.name || "",
      mission: initial.mission || "",
      description: initial.description || "",
      address: initial.address || "",
    };
    for (const t of initial.translations || []) {
      if (SUPPORTED_LANGS.includes(t.lang)) {
        next[t.lang] = {
          name: t.name || "",
          mission: t.mission || "",
          description: t.description || "",
          address: t.address || "",
        };
      }
    }
  }
  return next;
};

export default function CharityForm({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: Props) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [bannerPreview, setBannerPreview] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    description?: string;
    email?: string;
    website?: string;
    logo?: string;
    banner?: string;
  }>({});

  const [shared, setShared] = useState({
    website: "",
    email: "",
    phone: "",
  });
  const [langForms, setLangForms] = useState<LangFormState>(() => hydrateLangForms(initialData));

  const blobUrlsRef = useRef<string[]>([]);

  const revokeBlobUrls = () => {
    blobUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    blobUrlsRef.current = [];
  };

  useEffect(() => {
    if (!open) {
      revokeBlobUrls();
      return;
    }

    setLogoFile(null);
    setBannerFile(null);
    setErrors({});
    setLangForms(hydrateLangForms(initialData));

    if (initialData) {
      setShared({
        website: initialData.website || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
      });
      setLogoPreview(initialData.logo || "");
      setBannerPreview(initialData.banner || "");
    } else {
      setShared({ website: "", email: "", phone: "" });
      setLogoPreview("");
      setBannerPreview("");
    }

    return () => {
      revokeBlobUrls();
    };
  }, [open, initialData]);

  const updateLangField = (
    lang: Lang,
    field: "name" | "mission" | "description" | "address",
    value: string
  ) => {
    setLangForms((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleSharedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShared((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (logoPreview && logoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
      blobUrlsRef.current = blobUrlsRef.current.filter((url) => url !== logoPreview);
    }

    setLogoFile(file);
    const newPreview = URL.createObjectURL(file);
    setLogoPreview(newPreview);
    blobUrlsRef.current.push(newPreview);
  };

  const handleBanner = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (bannerPreview && bannerPreview.startsWith("blob:")) {
      URL.revokeObjectURL(bannerPreview);
      blobUrlsRef.current = blobUrlsRef.current.filter((url) => url !== bannerPreview);
    }

    setBannerFile(file);
    const newPreview = URL.createObjectURL(file);
    setBannerPreview(newPreview);
    blobUrlsRef.current.push(newPreview);
  };

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    const isCreating = !initialData?.id;

    if (!langForms[DEFAULT_LANG].name.trim())
      newErrors.name = "English charity name is required";
    if (!langForms[DEFAULT_LANG].description.trim())
      newErrors.description = "English description is required";
    if (shared.email && !/^\S+@\S+\.\S+$/.test(shared.email))
      newErrors.email = "Invalid email address";
    if (shared.website && !/^https?:\/\/\S+$/.test(shared.website))
      newErrors.website = "Invalid URL (must start with http:// or https://)";

    if (isCreating && !logoFile) newErrors.logo = "Logo image is required";
    if (isCreating && !bannerFile) newErrors.banner = "Banner image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const en = langForms[DEFAULT_LANG];

    const translations: CharityTranslationRow[] = SUPPORTED_LANGS
      .map((lang) => ({ lang, ...langForms[lang] }))
      .filter((t) => t.name.trim() !== "" && t.description.trim() !== "");

    await onSubmit(
      {
        id: initialData?.id,
        name: en.name,
        description: en.description,
        mission: en.mission,
        address: en.address,
        website: shared.website,
        email: shared.email,
        phone: shared.phone,
        translations,
      },
      logoFile,
      bannerFile
    );
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div className="bg-white w-full max-w-3xl rounded-xl p-6 overflow-y-auto max-h-[90vh] shadow-xl">
        <h2 className="text-xl font-bold mb-4">
          {initialData?.id ? "Edit Charity" : "Create Charity"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Translatable content per language */}
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
                    Charity Name ({LANG_LABELS[lang].native})
                    {lang === DEFAULT_LANG && <span className="text-destructive ml-1">*</span>}
                  </label>
                  <Input
                    placeholder={`Charity name in ${LANG_LABELS[lang].native}`}
                    value={langForms[lang].name}
                    onChange={(e) => updateLangField(lang, "name", e.target.value)}
                    className={lang === DEFAULT_LANG && errors.name ? "border-red-500" : ""}
                  />
                  {lang === DEFAULT_LANG && errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Description ({LANG_LABELS[lang].native})</label>
                  <RichTextEditor
                    content={langForms[lang].description}
                    onChange={(v: string) => updateLangField(lang, "description", v)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Mission ({LANG_LABELS[lang].native})</label>
                  <RichTextEditor
                    content={langForms[lang].mission}
                    onChange={(v: string) => updateLangField(lang, "mission", v)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Address ({LANG_LABELS[lang].native})</label>
                  <Input
                    placeholder={`Address in ${LANG_LABELS[lang].native}`}
                    value={langForms[lang].address}
                    onChange={(e) => updateLangField(lang, "address", e.target.value)}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Shared contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <Input
                name="website"
                placeholder="Website"
                value={shared.website}
                onChange={handleSharedChange}
                className={errors.website ? "border-red-500" : ""}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1">{errors.website}</p>
              )}
            </div>

            <div>
              <Input
                name="email"
                placeholder="Email"
                value={shared.email}
                onChange={handleSharedChange}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <Input
              name="phone"
              placeholder="Phone"
              value={shared.phone}
              onChange={handleSharedChange}
            />
          </div>

          {/* Logo */}
          <div>
            <label className="text-sm font-medium">
              Logo {!initialData?.id && <span className="text-destructive">*</span>}
            </label>
            <Input type="file" accept="image/*" onChange={handleLogo} className={errors.logo ? "border-red-500" : ""} />
            {errors.logo && <p className="text-red-500 text-sm mt-1">{errors.logo}</p>}
            {logoPreview && (
              <Image
                src={logoPreview}
                alt="Logo preview"
                width={80}
                height={80}
                className="mt-2 rounded object-cover"
              />
            )}
          </div>

          {/* Banner */}
          <div>
            <label className="text-sm font-medium">
              Banner {!initialData?.id && <span className="text-destructive">*</span>}
            </label>
            <Input type="file" accept="image/*" onChange={handleBanner} className={errors.banner ? "border-red-500" : ""} />
            {errors.banner && <p className="text-red-500 text-sm mt-1">{errors.banner}</p>}
            {bannerPreview && (
              <Image
                src={bannerPreview}
                alt="Banner preview"
                width={220}
                height={120}
                className="mt-2 rounded object-cover"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save Charity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
