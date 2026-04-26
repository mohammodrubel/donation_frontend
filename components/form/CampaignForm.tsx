"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextEditor } from "@/components/share/rich-text-editor";
import { useCreateCampaignMutation } from "@/lib/reudx/fetchers/campain/campainApi";

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
}

interface Props {
  initialData: CampaignFormData;
  onSubmit: (data: CampaignFormData) => void;
  onCancel: () => void;
}

export function CampaignForm({ initialData, onSubmit, onCancel }: Props) {
  const [form, setForm] = useState<CampaignFormData>(initialData);

  const [imagePreview, setImagePreview] = useState<string>(initialData.image);
  const [tagInput, setTagInput] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [file, setFile] = useState<any>({});
  const [addNewCampain] = useCreateCampaignMutation();

  const update = (key: keyof CampaignFormData, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleTitle = (value: string) => {
    update("title", value);
    update("slug", generateSlug(value));
  };

  const addTag = (value: string) => {
    const tag = value.trim();
    if (!tag) return;
    if (form.tags.includes(tag)) return;

    update("tags", [...form.tags, tag]);
  };

  const removeTag = (index: number) => {
    const arr = [...form.tags];
    arr.splice(index, 1);
    update("tags", arr);
  };

  const addItem = (value: string) => {
    const item = value.trim();
    if (!item) return;
    if (form.acceptedItems.includes(item)) return;

    update("acceptedItems", [...form.acceptedItems, item]);
  };

  const removeItem = (index: number) => {
    const arr = [...form.acceptedItems];
    arr.splice(index, 1);
    update("acceptedItems", arr);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFile(file);

    const url = URL.createObjectURL(file);
    setImagePreview(url);
    update("image", url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!form.title || !form.category || !form.goalAmount) {
        alert("Required fields missing");
        return;
      }

      const formData = new FormData();

      const { image, ...rest } = form;

      if (file) {
        formData.append("image", file);
      }

      formData.append("data", JSON.stringify(rest));

      const response = await addNewCampain(formData).unwrap();

      console.log(response);

      onSubmit(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* BASIC INFO */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-semibold text-lg">Basic Info</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => handleTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input
              placeholder="Slug"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="medical">Medical</option>
              <option value="emergency">Emergency</option>
              <option value="education">Education</option>
              <option value="disaster">Disaster</option>
              <option value="family">Family</option>
              <option value="food">Food</option>
              <option value="shelter">Shelter</option>
              <option value="orphan">Orphan</option>
              <option value="women">Women</option>
              <option value="community">Community</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Goal Amount</label>
            <Input
              type="number"
              placeholder="Goal Amount"
              value={form.goalAmount}
              onChange={(e) => update("goalAmount", Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">End Date</label>
            <Input
              type="date"
              value={form.endDate}
              onChange={(e) => update("endDate", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tags</label>
            <Input
              placeholder="Add tag + Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag(tagInput);
                  setTagInput("");
                }
              }}
            />

            <div className="flex flex-wrap gap-2">
              {form.tags.map((t, i) => (
                <span key={i} className="px-2 py-1 bg-gray-200 rounded">
                  {t}
                  <button type="button" onClick={() => removeTag(i)}>
                    {" "}
                    ×{" "}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Accepted Items</label>
            <Input
              placeholder="Accepted item + Enter"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem(itemInput);
                  setItemInput("");
                }
              }}
            />

            <div className="flex flex-wrap gap-2">
              {form.acceptedItems.map((i, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 rounded">
                  {i}
                  <button type="button" onClick={() => removeItem(idx)}>
                    {" "}
                    ×{" "}
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="text-sm font-medium">Featured Campaign</label>
            <Switch
              checked={form.featured}
              onCheckedChange={(v) => update("featured", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* CONTENT */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-semibold text-lg">Content</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <RichTextEditor
              content={form.description}
              onChange={(v) => update("description", v)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Story</label>
            <RichTextEditor
              content={form.story}
              onChange={(v) => update("story", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* IMAGE */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h2 className="font-semibold text-lg">Image</h2>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload Image</label>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          {imagePreview && (
            <img
              src={imagePreview}
              className="w-40 h-40 rounded object-cover"
              alt="Preview"
            />
          )}
        </CardContent>
      </Card>

      {/* ACTIONS */}
      <div className="flex gap-3">
        <Button type="submit" className="flex-1">
          Save Campaign
        </Button>

        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}