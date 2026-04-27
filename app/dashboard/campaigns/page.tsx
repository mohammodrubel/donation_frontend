"use client";

import { useState } from "react";
import { CampaignFormModal } from "@/components/CampaignFormModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  useGetCampaignsQuery,
  useCreateCampaignMutation,
  useDeleteCampaignMutation,
  useUpdateCampaignMutation,
} from "@/lib/reudx/fetchers/campain/campainApi";

import { CampaignFormData } from "@/components/form/CampaignForm";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<CampaignFormData | null>(null);

  const { data, isLoading, refetch } = useGetCampaignsQuery(undefined);

  const [createCampaign, { isLoading: createLoading }] =
    useCreateCampaignMutation();

  const [updateCampaign, { isLoading: updateLoading }] =
    useUpdateCampaignMutation();

  const [deleteCampaign, { isLoading: deleteLoading }] =
    useDeleteCampaignMutation();

  const campaigns = data?.data || [];

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
    featured: false,
    endDate: "",
    tags: [],
    acceptedItems: [],
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
      featured: item.featured || false,
      endDate: item.endDate?.slice(0, 10) || "",
      tags: item.tags || [],
      acceptedItems: item.acceptedItems || [],
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
    file: File | null
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
      };

      payload.append("data", JSON.stringify(data));

      if (file) {
        payload.append("image", file);
      }

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Campaign List</h1>

        <Button onClick={handleCreate}>+ Create Campaign</Button>
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
                    <Badge>{item.status}</Badge>
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
    </div>
  );
}