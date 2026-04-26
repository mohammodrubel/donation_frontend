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
  featured: boolean;
  endDate: string;
  image: string;
  tags: string[];      
}