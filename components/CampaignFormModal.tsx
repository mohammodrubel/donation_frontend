"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CampaignForm } from "./form/CampaignForm";

export interface CampaignFormData {
  id?: string; // ✅ FIXED
  title: string;
  slug: string;
  description: string;
  story: string;
  category: string;

  goalAmount: number;
  endDate: string;

  image: string;

  tags: string[];
  acceptedItems: string[]; // 🔥 must include if schema uses it

  featured: boolean;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: CampaignFormData;
  onSubmit: (data: CampaignFormData) => void;
  onCancel?: () => void;
}

export function CampaignFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[95vw] md:max-w-[80vw] lg:max-w-[1000px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData.id ? "Edit Campaign" : "Create Campaign"}
          </DialogTitle>
        </DialogHeader>

        <CampaignForm
          initialData={initialData}
          onSubmit={(data) => {
            onSubmit(data);
            onOpenChange(false);
          }}
          onCancel={() => {
            onCancel?.(); // safe call
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}