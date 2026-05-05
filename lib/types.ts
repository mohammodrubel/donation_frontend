// types/campaign.ts
export interface CampaignFormData {
  id: string;
  title: string;
  slug: string;
  description: string;
  story: string;
  category: string;
  goalAmount: number;
  endDate: string;
  image: string;
  icons: string[];
  tags: string;
  featured: boolean;
}


export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string;
  story: string;

  category: string;

  goalAmount: number;
  collectedAmount: number;

  image: string;
  icons: string[];

  status: "pending" | "active" | "completed" | "rejected" | string;

  featured: boolean;

  creatorId: string;

  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;

  contributor: number;

  tags: string[];
  acceptedItems: string[];

  updates: any | null; // you can replace with proper type later
}