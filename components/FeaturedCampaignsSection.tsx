'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Star, ArrowRight, Heart } from 'lucide-react';
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi';
import { Campaign } from '@/lib/types';

export function FeaturedCampaigns() {
  const { data, isLoading, error } = useGetCampaignsQuery(undefined);
  const [hoveredCampaign, setHoveredCampaign] = useState<string | null>(null);
  const router = useRouter();

  const campaigns = data?.data || [];

  // Skeleton loader with matching improved layout
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-border overflow-hidden animate-pulse shadow-sm">
      <div className="relative h-48 bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-gray-200 rounded" />
          <div className="w-8 h-3 bg-gray-200 rounded" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="h-3 bg-gray-200 rounded w-1/3" />
            <div className="h-3 bg-gray-200 rounded w-8" />
          </div>
          <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden" />
        </div>
        <div className="pt-2">
          <div className="h-9 bg-gray-200 rounded-lg w-full" />
        </div>
      </div>
    </div>
  );

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

  const handleCardClick = (campaignId: string) => {
    router.push(`/campaigns/${campaignId}`);
  };

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
            ? Array.from({ length: 3 }).map((_, idx) => <SkeletonCard key={idx} />)
            : campaigns.map((campaign: Campaign) => {
                const progressPercent =
                  (campaign.collectedAmount / campaign.goalAmount) * 100;
                const isFeatured = campaign.tags?.includes('urgent');
                const isHovered = hoveredCampaign === campaign.id;

                return (
                  <div
                    key={campaign.id}
                    className="group relative bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                    onMouseEnter={() => setHoveredCampaign(campaign.id)}
                    onMouseLeave={() => setHoveredCampaign(null)}
                    onClick={() => handleCardClick(campaign.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(campaign.id);
                      }
                    }}
                  >
                    {/* Image section */}
                    <div className="relative h-48 overflow-hidden">
                      {isFeatured && (
                        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                          🔥 URGENT
                        </div>
                      )}
                      <Image
                        src={campaign.image}
                        alt={campaign.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Dark overlay gradient on hover for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-foreground/70">
                            {campaign.donors?.length || 0} donors
                          </span>
                        </div>
                      </div> */}

                      <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors">
                        {campaign.title}
                      </h3>

                      <p className="text-sm text-foreground/70 line-clamp-3 leading-relaxed">
                        {campaign.description}
                      </p>

                      {/* Progress bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium">
                          <span className="text-primary">
                            ৳{campaign.collectedAmount.toLocaleString()}
                          </span>
                          <span className="text-foreground/60">
                            ৳{campaign.goalAmount.toLocaleString()}
                          </span>
                        </div>
                        <div className="relative w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          />
                        </div>
                        <div className="flex justify-end">
                          <span className="text-xs font-semibold text-primary">
                            {Math.round(progressPercent)}% funded
                          </span>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <Button
                        variant="outline"
                        className="w-full mt-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(campaign.id);
                        }}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                );
              })}
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