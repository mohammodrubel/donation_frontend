"use client";

import { useState } from "react";
import { CampaignFormModal, CampaignFormData } from "@/components/CampaignFormModal";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [open, setOpen] = useState(false);

  const emptyCampaign: CampaignFormData = {
    id: "", // keep for edit, OK for create UI

    title: "",
    slug: "",
    description: "",
    story: "",

    category: "", // better: force user to select

    goalAmount: 0,
    endDate: "",

    image: "",

    tags: [],
    acceptedItems: [], // ✅ MUST include

    featured: false,
  };

  const handleSubmit = (data: CampaignFormData) => {
    console.log("FORM SUBMIT:", data);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <Button
        onClick={() => setOpen(true)}
        className="px-4 py-2  rounded"
      >
        + Create Campaign
      </Button>

      <CampaignFormModal
        open={open}
        onOpenChange={setOpen}
        initialData={emptyCampaign}
        onSubmit={handleSubmit}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
}