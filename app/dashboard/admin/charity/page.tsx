"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Pencil, Trash2, Plus, CheckCircle, Search } from "lucide-react";

import {
  useCreateCharityMutation,
  useGetCharitiesQuery,
  useUpdateCharityMutation,
  useDeleteCharityMutation,
} from "@/lib/reudx/fetchers/charity/charityApi";

import CharityForm, { type CharityFormData } from "@/components/form/charityCreateForm";
import { SUPPORTED_LANGS, DEFAULT_LANG, type Lang } from "@/lib/i18n/config";
import { PaginationBar } from "@/components/share/PaginationBar";

export default function CharityManagement() {
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

  const { data, isLoading, refetch } = useGetCharitiesQuery({ page, limit, search });
  const [createCharity, { isLoading: isCreating }] = useCreateCharityMutation();
  const [updateCharity, { isLoading: isUpdating }] = useUpdateCharityMutation();
  const [deleteCharity, { isLoading: isDeleting }] = useDeleteCharityMutation();

  const charities = data?.data || [];
  const meta = data?.meta;

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<CharityFormData | undefined>(undefined);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const saving = isCreating || isUpdating;

  const handleCreate = () => {
    setEditData(undefined);
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditData({
      id: item.id,
      name: item.name || "",
      description: item.description || "",
      mission: item.mission || "",
      website: item.website || "",
      email: item.email || "",
      phone: item.phone || "",
      address: item.address || "",
      logo: item.logo || "",
      banner: item.banner || "",
      translations: item.translations || [],
    });
    setOpen(true);
  };

  const handleSubmit = async (
    formData: CharityFormData,
    logoFile: File | null,
    bannerFile: File | null
  ) => {
    try {
      const fd = new FormData();
      const { id, logo, banner, ...rest } = formData;
      fd.append("data", JSON.stringify(rest));
      if (logoFile) fd.append("logo", logoFile);
      if (bannerFile) fd.append("banner", bannerFile);

      if (id) {
        await updateCharity({ id, data: fd }).unwrap();
      } else {
        await createCharity(fd).unwrap();
      }

      setOpen(false);
      setEditData(undefined);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteCharity(deleteTargetId).unwrap();
      setDeleteTargetId(null);
      refetch();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Charity Management</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Create and manage charities. Each charity can be filled in multiple languages.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search charities…"
                  className="pl-8 w-full sm:w-64"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              <Button className="gap-2" onClick={handleCreate}>
                <Plus className="h-4 w-4" />
                Create Charity
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {charities.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">No charities found</div>
              <Button variant="outline" onClick={handleCreate}>
                <Plus className="h-4 w-4 mr-2" />
                Create your first charity
              </Button>
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[80px]">Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-[120px]">Languages</TableHead>
                    <TableHead className="w-[100px]">Verified</TableHead>
                    <TableHead className="w-[160px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charities.map((c: any) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        {c.logo && (
                          <div className="relative h-10 w-10 rounded overflow-hidden bg-muted">
                            <Image src={c.logo} alt={c.name} fill className="object-cover" />
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{c.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{c.email}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {SUPPORTED_LANGS.map((lang: Lang) => {
                            const has =
                              lang === DEFAULT_LANG ||
                              !!c.translations?.some((t: any) => t.lang === lang);
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
                        {c.verified ? (
                          <Badge className="gap-1 bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                            <CheckCircle className="h-3 w-3" />
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="secondary">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(c)}
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setDeleteTargetId(c.id)}
                            disabled={isDeleting}
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
        </CardContent>
      </Card>

      <CharityForm
        open={open}
        onClose={() => {
          setOpen(false);
          setEditData(undefined);
        }}
        onSubmit={handleSubmit}
        initialData={editData}
        isLoading={saving}
      />

      {deleteTargetId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Delete this charity?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteTargetId(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
