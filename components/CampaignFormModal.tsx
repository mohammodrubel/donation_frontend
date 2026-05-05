"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  CampaignForm,
  CampaignFormData,
} from "@/components/form/CampaignForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: CampaignFormData;
  onSubmit: (
    data: CampaignFormData,
    file: File | null,
    iconFiles: File[]
  ) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CampaignFormModal({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
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
          onSubmit={onSubmit}
          onCancel={onCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}