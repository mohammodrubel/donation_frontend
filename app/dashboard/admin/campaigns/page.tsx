"use client";

import { useEffect, useState } from "react";
import { CampaignFormModal } from "@/components/CampaignFormModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, CheckCircle } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
} from "@/lib/reudx/fetchers/campain/campainApi";

import { CampaignFormData } from "@/components/form/CampaignForm";
import { CompleteCampaignForm } from "@/components/form/CompleteCampaignForm";
import { PaginationBar } from "@/components/share/PaginationBar";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<CampaignFormData | null>(null);
  const [completing, setCompleting] = useState<any | null>(null);

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

  const { data, isLoading, refetch } = useGetCampaignsQuery({ page, limit, search });

  const [createCampaign, { isLoading: createLoading }] =
    useCreateCampaignMutation();

  const [updateCampaign, { isLoading: updateLoading }] =
    useUpdateCampaignMutation();

  const [deleteCampaign, { isLoading: deleteLoading }] =
    useDeleteCampaignMutation();

  const campaigns = data?.data || [];
  const meta = data?.meta;

  const emptyCampaign: CampaignFormData = {
    id: "",
    title: "",
    slug: "",
    description: "",
    story: "",
    category: "",
    goalAmount: 0,
    collectedAmount: 0,
    image: "",
    icons: [],
    featured: false,
    endDate: "",
    tags: [],
    acceptedItems: [],
    translations: [],
  };

  const handleCreate = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditData({
      id: item.id,
      title: item.title || "",
      slug: item.slug || "",
      description: item.description || "",
      story: item.story || "",
      category: item.category || "",
      goalAmount: item.goalAmount || 0,
      collectedAmount: item.collectedAmount || 0,
      image: item.image || "",
      icons: item.icons || [],
      featured: item.featured || false,
      endDate: item.endDate?.slice(0, 10) || "",
      tags: item.tags || [],
      acceptedItems: item.acceptedItems || [],
      translations: item.translations || [],
    });

    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Delete this campaign?");
    if (!confirmDelete) return;

    try {
      await deleteCampaign(id).unwrap();
      refetch();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (
    formData: CampaignFormData,
    file: File | null,
    iconFiles: File[]
  ) => {
    try {
      const payload = new FormData();

      const data = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        story: formData.story,
        category: formData.category,
        goalAmount: Number(formData.goalAmount),
        endDate: formData.endDate,
        featured: formData.featured,
        tags: formData.tags,
        acceptedItems: formData.acceptedItems,
        translations: formData.translations || [],
        existingIcons: formData.icons || [],
      };

      payload.append("data", JSON.stringify(data));

      if (file) {
        payload.append("image", file);
      }

      iconFiles.forEach((f) => payload.append("icons", f));

      if (formData.id) {
        await updateCampaign({
          id: formData.id,
          data: payload,
        }).unwrap();
      } else {
        await createCampaign(payload).unwrap();
      }

      setOpen(false);
      setEditData(null);
      refetch();
    } catch (error) {
      console.log(error);
      alert("Save failed");
    }
  };

  const saving = createLoading || updateLoading;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Campaign List</h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search campaigns…"
              className="pl-8 w-full sm:w-64"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <Button onClick={handleCreate}>+ Create Campaign</Button>
        </div>
      </div>

      <CampaignFormModal
        open={open}
        onOpenChange={setOpen}
        initialData={editData || emptyCampaign}
        onSubmit={handleSubmit}
        isLoading={saving}
        onCancel={() => {
          setOpen(false);
          setEditData(null);
        }}
      />

      <div className="border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : campaigns.length > 0 ? (
              campaigns.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 rounded object-cover"
                    />
                  </TableCell>

                  <TableCell>{item.title}</TableCell>

                  <TableCell>${item.goalAmount}</TableCell>

                  <TableCell>
                    {item.status === "completed" ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">
                        completed
                      </Badge>
                    ) : (
                      <Badge>{item.status}</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {new Date(item.endDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>

                    {item.status !== "completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-emerald-700 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => setCompleting(item)}
                      >
                        <CheckCircle className="w-3.5 h-3.5 mr-1" />
                        Complete
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={deleteLoading}
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No Campaign Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {meta && (
        <PaginationBar
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          limit={meta.limit}
          onPageChange={setPage}
        />
      )}

      <Dialog open={!!completing} onOpenChange={(o) => !o && setCompleting(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mark Campaign as Successful</DialogTitle>
            <DialogDescription>
              {completing?.title}
            </DialogDescription>
          </DialogHeader>
          {completing && (
            <CompleteCampaignForm
              campaignId={completing.id}
              initialSuccessStory={completing.successStory || ""}
              initialSuccessImages={completing.successImages || []}
              initialTranslations={(completing.translations || []).map((t: any) => ({
                lang: t.lang,
                successStory: t.successStory,
              }))}
              onSuccess={() => {
                setCompleting(null);
                refetch();
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}