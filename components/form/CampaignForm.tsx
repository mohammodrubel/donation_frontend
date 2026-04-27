"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { RichTextEditor } from "@/components/share/rich-text-editor";

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
  onSubmit: (data: CampaignFormData, file: File | null) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CampaignForm({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}: Props) {
  const [form, setForm] = useState<CampaignFormData>(initialData);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(initialData.image);

  const [tagInput, setTagInput] = useState("");
  const [itemInput, setItemInput] = useState("");

  useEffect(() => {
    setForm(initialData);
    setPreview(initialData.image);
  }, [initialData]);

  const updateField = (
    key: keyof CampaignFormData,
    value: string | number | boolean | string[]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleTitle = (value: string) => {
    updateField("title", value);
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
    updateField(
      "tags",
      form.tags.filter((_, i) => i !== index)
    );
  };

  const addItem = () => {
    if (!itemInput.trim()) return;

    if (!form.acceptedItems.includes(itemInput.trim())) {
      updateField("acceptedItems", [
        ...form.acceptedItems,
        itemInput.trim(),
      ]);
    }

    setItemInput("");
  };

  const removeItem = (index: number) => {
    updateField(
      "acceptedItems",
      form.acceptedItems.filter((_, i) => i !== index)
    );
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.goalAmount) {
      alert("Please fill required fields");
      return;
    }

    await onSubmit(
      {
        ...form,
        image: preview,
      },
      file
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="text-lg font-semibold">Basic Info</h2>

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleTitle(e.target.value)}
          />

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
 
          <Input
            type="number"
            placeholder="Goal Amount"
            value={form.goalAmount}
            onChange={(e) =>
              updateField("goalAmount", Number(e.target.value))
            }
          />

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
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(i)}
                    className="ml-2"
                  >
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
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 rounded-full text-sm"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    className="ml-2"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content */}
      <Card>
        <CardContent className="pt-6 space-y-5">
          <h2 className="font-semibold text-lg">Content</h2>

          <div>
            <label>Description</label>
            <RichTextEditor
              content={form.description}
              onChange={(v) => updateField("description", v)}
            />
          </div>

          <div>
            <label>Story</label>
            <RichTextEditor
              content={form.story}
              onChange={(v) => updateField("story", v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Image */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <h2 className="font-semibold text-lg">Image</h2>

          <Input type="file" accept="image/*" onChange={handleImage} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded object-cover"
            />
          )}
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Campaign"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}