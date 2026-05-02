"use client";

import { useState } from "react";
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

import { Loader2, Pencil, Trash2, CheckCircle, XCircle, Plus, ImagePlus } from "lucide-react";

interface Banner {
  id: string;
  short_title: string;
  title: string;
  description: string;
  photo: string;
  isActive?: boolean;
}

interface BannerFormData {
  short_title: string;
  title: string;
  description: string;
}

export default function BannerManagement() {
  const { data, isLoading, refetch } = useGetBannersQuery({});
  const [createBanner, { isLoading: isCreating }] = useCreateBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const [deleteBanner, { isLoading: isDeleting }] = useDeleteBannerMutation();

  const banners: Banner[] = data?.data || [];
  const activeBanner = banners.find((b) => b.isActive);
  const inactiveBanners = banners.filter((b) => !b.isActive);

  const [formData, setFormData] = useState<BannerFormData>({
    short_title: "",
    title: "",
    description: "",
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActivating, setIsActivating] = useState<string | null>(null);

  // INPUT
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FILE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPhotoFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({ short_title: "", title: "", description: "" });
    setPhotoFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  // CREATE
  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photoFile) return alert("Image required");

    const fd = new FormData();
    fd.append("data", JSON.stringify(formData));
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
    fd.append("data", JSON.stringify(formData));

    if (photoFile) {
      fd.append("file", photoFile);
    }

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

  // EDIT OPEN
  const openEditModal = (banner: Banner) => {
    setSelectedBanner(banner);
    setFormData({
      short_title: banner.short_title,
      title: banner.title,
      description: banner.description,
    });
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

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="border shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-2xl font-bold">Banner Management</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your website banners, create, edit, and set active banners
            </p>
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

            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl">Create New Banner</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleCreateBanner} className="space-y-5 mt-2">
                <div className="space-y-2">
                  <Label htmlFor="short_title">Short Title</Label>
                  <Input
                    id="short_title"
                    name="short_title"
                    value={formData.short_title}
                    onChange={handleInputChange}
                    placeholder="e.g., Summer Sale"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Main banner headline"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Detailed banner description"
                    rows={3}
                    required
                  />
                </div>

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
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Banner</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUpdateBanner} className="space-y-5 mt-2">
            <div className="space-y-2">
              <Label htmlFor="edit_short_title">Short Title</Label>
              <Input
                id="edit_short_title"
                name="short_title"
                value={formData.short_title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_title">Title</Label>
              <Input
                id="edit_title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_description">Description</Label>
              <Textarea
                id="edit_description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </div>

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