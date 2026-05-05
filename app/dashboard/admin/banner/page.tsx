"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  useCreateBannerMutation,
  useGetBannersQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} from "@/lib/reudx/fetchers/banner/bannerApi";

import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LANG_LABELS, SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";
import { PaginationBar } from "@/components/share/PaginationBar";

import { Loader2, Pencil, Trash2, CheckCircle, XCircle, Plus, ImagePlus, Search } from "lucide-react";

interface BannerTranslationRow {
  lang: Lang;
  short_title: string;
  title: string;
  description: string;
}

interface Banner {
  id: string;
  short_title: string;
  title: string;
  description: string;
  photo: string;
  isActive?: boolean;
  translations?: BannerTranslationRow[];
}

type LangFormState = Record<Lang, { short_title: string; title: string; description: string }>;

const blankLangForm = (): LangFormState =>
  SUPPORTED_LANGS.reduce((acc, lang) => {
    acc[lang] = { short_title: "", title: "", description: "" };
    return acc;
  }, {} as LangFormState);

export default function BannerManagement() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading, refetch } = useGetBannersQuery({ page, limit, search });
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const banners: Banner[] = data?.data || [];
  const meta = data?.meta;
  const activeBanner = banners.find((b) => b.isActive);

  const [langForms, setLangForms] = useState<LangFormState>(blankLangForm());

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActivating, setIsActivating] = useState<string | null>(null);

  const updateLangField = (
    lang: Lang,
    field: "short_title" | "title" | "description",
    value: string
  ) => {
    setLangForms((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setLangForms(blankLangForm());
    setPhotoFile(null);
    if (previewUrl && previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const buildPayload = () => {
    const defaults = langForms[DEFAULT_LANG];
    const translations = SUPPORTED_LANGS
      .map((lang) => ({ lang, ...langForms[lang] }))
      .filter((t) => t.title.trim() !== "");

    return {
      short_title: defaults.short_title,
      title: defaults.title,
      description: defaults.description,
      translations,
    };
  };

  // CREATE
  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoFile) return alert("Image required");
    if (!langForms[DEFAULT_LANG].title.trim()) return alert("English title is required");

    const fd = new FormData();
    fd.append("data", JSON.stringify(buildPayload()));
    fd.append("file", photoFile);

    await createBanner(fd).unwrap();

    resetForm();
    setIsCreateModalOpen(false);
    refetch();
  };

  // UPDATE
  const handleUpdateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBanner) return;

    const fd = new FormData();
    fd.append("data", JSON.stringify(buildPayload()));
    if (photoFile) fd.append("file", photoFile);

    await updateBanner({ id: selectedBanner.id, data: fd }).unwrap();

    resetForm();
    setSelectedBanner(null);
    setIsEditModalOpen(false);
    refetch();
  };

  // DELETE
  const handleDeleteBanner = async () => {
    if (!deleteTargetId) return;
    await deleteBanner(deleteTargetId).unwrap();
    setDeleteTargetId(null);
    refetch();
  };

  // ACTIVATE
  const handleActivateBanner = async (id: string) => {
    setIsActivating(id);

    const fd = new FormData();
    fd.append("data", JSON.stringify({ isActive: true }));

    if (activeBanner && activeBanner.id !== id) {
      const fd2 = new FormData();
      fd2.append("data", JSON.stringify({ isActive: false }));
      await updateBanner({ id: activeBanner.id, data: fd2 }).unwrap();
    }

    await updateBanner({ id, data: fd }).unwrap();

    setIsActivating(null);
    refetch();
  };

  // EDIT OPEN — hydrate per-language values from translations array, falling back to top-level for English
  const openEditModal = (banner: Banner) => {
    setSelectedBanner(banner);

    const next = blankLangForm();
    next[DEFAULT_LANG] = {
      short_title: banner.short_title || "",
      title: banner.title || "",
      description: banner.description || "",
    };

    for (const t of banner.translations || []) {
      if (SUPPORTED_LANGS.includes(t.lang as Lang)) {
        next[t.lang as Lang] = {
          short_title: t.short_title || "",
          title: t.title || "",
          description: t.description || "",
        };
      }
    }

    setLangForms(next);
    setPreviewUrl(banner.photo);
    setPhotoFile(null);
    setIsEditModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading banners...</p>
        </div>
      </div>
    );
  }

  const renderLangFields = (idPrefix: string) => (
    <Tabs defaultValue={DEFAULT_LANG} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${SUPPORTED_LANGS.length}, minmax(0, 1fr))` }}>
        {SUPPORTED_LANGS.map((lang) => (
          <TabsTrigger key={lang} value={lang} className="gap-2">
            <span aria-hidden>{LANG_LABELS[lang].flag}</span>
            <span>{LANG_LABELS[lang].native}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      {SUPPORTED_LANGS.map((lang) => (
        <TabsContent key={lang} value={lang} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}_${lang}_short_title`}>
              Short Title ({LANG_LABELS[lang].native})
            </Label>
            <Input
              id={`${idPrefix}_${lang}_short_title`}
              value={langForms[lang].short_title}
              onChange={(e) => updateLangField(lang, "short_title", e.target.value)}
              placeholder="e.g., Summer Sale"
              required={lang === DEFAULT_LANG}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}_${lang}_title`}>
              Title ({LANG_LABELS[lang].native})
              {lang === DEFAULT_LANG && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={`${idPrefix}_${lang}_title`}
              value={langForms[lang].title}
              onChange={(e) => updateLangField(lang, "title", e.target.value)}
              placeholder="Main banner headline"
              required={lang === DEFAULT_LANG}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${idPrefix}_${lang}_description`}>
              Description ({LANG_LABELS[lang].native})
            </Label>
            <Textarea
              id={`${idPrefix}_${lang}_description`}
              value={langForms[lang].description}
              onChange={(e) => updateLangField(lang, "description", e.target.value)}
              placeholder="Detailed banner description"
              rows={3}
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Banner Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Manage your website banners, create, edit, and set active banners
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search banners…"
                  className="pl-8 w-full sm:w-64"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
          <Dialog open={isCreateModalOpen} onOpenChange={(open) => {
            if (!open) resetForm();
            setIsCreateModalOpen(open);
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Banner
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Banner</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateBanner} className="space-y-5 mt-2">
                {renderLangFields("create")}

                <div className="space-y-2">
                  <Label htmlFor="photo">Banner Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="photo"
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="flex-1"
                    />
                    {photoFile && (
                      <Badge variant="secondary" className="gap-1">
                        <ImagePlus className="h-3 w-3" />
                        New
                      </Badge>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="mt-3 rounded-md border overflow-hidden w-fit">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        width={200}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

                <Button type="submit" disabled={isCreating} className="w-full gap-2">
                  {isCreating && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isCreating ? "Creating..." : "Create Banner"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {banners.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No banners found</div>
              <Button variant="outline" onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create your first banner
              </Button>
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[100px]">Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[120px]">Languages</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[180px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {banners.map((b) => (
                    <TableRow
                      key={b.id}
                      className={`group ${b.isActive ? "bg-primary/5 border-l-4 border-primary" : ""}`}
                    >
                      <TableCell>
                        <div className="relative h-12 w-20 rounded-md overflow-hidden bg-muted">
                          <Image
                            src={b.photo}
                            alt={b.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{b.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {b.short_title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {SUPPORTED_LANGS.map((lang) => {
                            const has =
                              lang === DEFAULT_LANG ||
                              !!b.translations?.some((t) => t.lang === lang);
                            return (
                              <Badge
                                key={lang}
                                variant={has ? "default" : "outline"}
                                className="text-[10px] px-1.5 py-0"
                              >
                                {lang.toUpperCase()}
                              </Badge>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {b.isActive ? (
                          <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            <CheckCircle className="h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {!b.isActive && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleActivateBanner(b.id)}
                              disabled={isActivating === b.id}
                              className="gap-1 text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                            >
                              {isActivating === b.id ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              ) : (
                                <CheckCircle className="h-3 w-3" />
                              )}
                              Set Active
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openEditModal(b)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteTargetId(b.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {meta && (
            <PaginationBar
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          )}

          {activeBanner && (
            <div className="mt-4 text-xs text-muted-foreground text-center">
              Currently showing active banner: <span className="font-medium">{activeBanner.title}</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* EDIT MODAL */}
      <Dialog open={isEditModalOpen} onOpenChange={(open) => {
        if (!open) {
          resetForm();
          setSelectedBanner(null);
        }
        setIsEditModalOpen(open);
      }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Banner</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateBanner} className="space-y-5 mt-2">
            {renderLangFields("edit")}

            <div className="space-y-2">
              <Label htmlFor="edit_photo">Banner Image (optional)</Label>
              <Input
                id="edit_photo"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              {previewUrl && (
                <div className="mt-3 rounded-md border overflow-hidden w-fit">
                  <Image
                    src={previewUrl}
                    alt="Preview"
                    width={200}
                    height={100}
                    className="object-cover"
                  />
                </div>
              )}
              {!photoFile && previewUrl && (
                <p className="text-xs text-muted-foreground mt-1">
                  Current image shown. Select a new file to replace.
                </p>
              )}
            </div>

            <Button type="submit" disabled={isUpdating} className="w-full gap-2">
              {isUpdating && <Loader2 className="h-4 w-4 animate-spin" />}
              {isUpdating ? "Updating..." : "Update Banner"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <AlertDialog open={!!deleteTargetId} onOpenChange={(open) => !open && setDeleteTargetId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the banner
              and remove it from your website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBanner}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
            >
              {isDeleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isDeleting ? "Deleting..." : "Delete Banner"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
