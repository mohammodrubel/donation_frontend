'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight } from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  image: string;
  collectedAmount: number;
  goalAmount: number;
  donors: number;
  category: string;
  tags: string[];
}

interface CategoryInfo {
  id: string;
  name: string;
  color: string;
  textColor: string;
}

interface FeaturedCampaignsProps {
  campaigns: Campaign[];
  categories: CategoryInfo[];
}

export function FeaturedCampaigns({ campaigns, categories }: FeaturedCampaignsProps) {
  const featuredCampaigns = campaigns.slice(0, 3);
  const [hoveredCampaign, setHoveredCampaign] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Featured Campaigns</h2>
          <p className="text-lg text-foreground/60">Support urgent causes that need your help right now</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCampaigns.map((campaign) => {
            const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100;
            const categoryInfo = categories.find((c) => c.id === campaign.category);
            const isFeatured = campaign.tags.includes('urgent');

            return (
              <Link
                key={campaign.id}
                href={`/campaigns/${campaign.id}`}
                className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
                onMouseEnter={() => setHoveredCampaign(campaign.id)}
                onMouseLeave={() => setHoveredCampaign(null)}
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5">
                  {isFeatured && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                      FEATURED
                    </div>
                  )}
                  <Image
                    src={campaign.image}
                    alt={campaign.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo?.color} ${categoryInfo?.textColor}`}
                    >
                      {categoryInfo?.name}
                    </span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-semibold text-foreground">{campaign.donors}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-foreground line-clamp-2 text-lg group-hover:text-primary transition-colors">
                    {campaign.title}
                  </h3>

                  <p className="text-sm text-foreground/70 line-clamp-2">{campaign.description}</p>

                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-foreground">
                        ৳{(campaign.collectedAmount / 100000).toFixed(1)}L of ৳{(campaign.goalAmount / 100000).toFixed(1)}L
                      </span>
                      <span className="text-foreground/60 font-medium">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                    <span className="text-foreground/60">{campaign.donors.toLocaleString()} donors</span>
                    <span className="text-primary font-semibold group-hover:gap-1 flex items-center transition-all">
                      Learn more <ArrowRight className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-lg px-8">
            <Link href="/campaigns" className="flex items-center gap-2">
              View All {campaigns.length} Campaigns <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}