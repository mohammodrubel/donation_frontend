
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi';
import { Campaign } from '@/lib/types';
import { CampaignSkeleton } from './CampaignSkeleton';
import { CampaignCard } from './CampaignCard';

export function FeaturedCampaigns() {
  const { data, isLoading, error } = useGetCampaignsQuery(undefined);
  const campaigns = data?.data || [];

  if (error) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 mb-4">Failed to load campaigns.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Featured Campaigns
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            Support urgent causes that need your help right now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => <CampaignSkeleton key={idx} />)
            : campaigns.map((campaign:Campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                //   featured={campaign.tags?.includes('urgent')} 
                //   showButton={true}                        
                />
              ))}
        </div>

        {!isLoading && campaigns.length > 0 && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="default" className="shadow-lg hover:shadow-xl">
              <Link href="/campaigns">
                View All {campaigns.length} Campaigns
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}