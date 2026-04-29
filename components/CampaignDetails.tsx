'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Heart,
  Share2,
  Flag,
  ArrowLeft,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle,
  Plus,
  Package,
} from 'lucide-react';

import { campaignCategories } from '@/lib/mockData';
import { useGetSingleCampaignQuery } from '@/lib/reudx/fetchers/campain/campainApi';
import ItemDonationForm from './form/itemDonationForm';

interface CampaignDetailsProps {
  id: string;
}

function stripHtml(html: string) {
  if (!html) return '';

  return html
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(dateString?: string) {
  if (!dateString) return 'TBD';

  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getDaysLeft(endDate?: string) {
  if (!endDate) return 0;

  const end = new Date(endDate);
  const today = new Date();

  if (end < today) return 0;

  const diffTime = end.getTime() - today.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

const categoryStyles: Record<string, string> = {
  emergency: 'bg-red-100 text-red-800',
  education: 'bg-blue-100 text-blue-800',
  health: 'bg-green-100 text-green-800',
  food: 'bg-amber-100 text-amber-800',
  environment: 'bg-emerald-100 text-emerald-800',
  animal: 'bg-purple-100 text-purple-800',
};

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const { data, isLoading, error } = useGetSingleCampaignQuery(id);
  console.log(data?.data)
  const campaign = data?.data;

  const [showForm, setShowForm] = useState(false);

  if (isLoading) {
    return <CampaignDetailsSkeleton />;
  }

  if (error || !campaign) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-6">
          {error ? 'Failed to load campaign.' : 'Campaign not found.'}
        </p>

        <Button asChild>
          <Link href="/campaigns">Back to Campaigns</Link>
        </Button>
      </main>
    );
  }

  const progressPercent =
    (campaign.collectedAmount / campaign.goalAmount) * 100;

  const daysLeft = getDaysLeft(campaign.endDate);

  const categoryKey =
    campaign.category?.toLowerCase() || 'other';

  const categoryLabel =
    campaignCategories.find((c) => c.id === campaign.category)?.name ||
    campaign.category ||
    'Other';

  const plainStory = stripHtml(campaign.story || '');

  const plainDescription = stripHtml(campaign.description || '');

  return (
    <main className="bg-white">
      {/* top */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-primary font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>
      </div>

      {/* body */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* left */}
          <div className="lg:col-span-2 space-y-8">

            {/* image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryStyles[categoryKey] ||
                    'bg-gray-100 text-gray-800'
                    }`}
                >
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">
                {campaign.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />

                  <div>
                    <p className="text-sm">Creator</p>
                    <p className="font-semibold text-gray-900">
                      {campaign.creatorId || 'Anonymous'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />

                  <div>
                    <p className="text-sm">Start</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(campaign.startDate)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />

                  <div>
                    <p className="text-sm">End</p>
                    <p className="font-semibold text-gray-900">
                      {formatDate(campaign.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* story */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">The Story</h2>
                <p className="text-gray-700 leading-7">{plainStory}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-3">
                  How You Can Help
                </h2>

                <p className="text-gray-700 leading-7">
                  {plainDescription}
                </p>

                {/* ========================= */}
                {/* ✅ ADDED DONOR INFO HERE */}
                {/* ========================= */}

                {campaign.itemDonations?.length > 0 && (
                  <div className="mt-6 border rounded-xl p-4 bg-gray-50">
                    <h3 className="font-bold mb-3">
                      Donor Contributions
                    </h3>

                    <div className="space-y-4">
                      {campaign.itemDonations.map((item: any) => (
                        <div
                          key={item.id}
                          className="border p-3 rounded-lg bg-white space-y-3"
                        >
                          {/* top row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {/* donor image */}
                              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                {item.donor?.avatar ? (
                                  <img
                                    src={item.donor.avatar}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-sm">
                                    {item.donor?.name?.[0]}
                                  </div>
                                )}
                              </div>

                              <div>
                                <p className="font-medium">
                                  {item.donor?.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.category} • {item.quantity} items
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* description */}
                          <p className="text-sm text-gray-700">
                            {item?.description}
                          </p>

                          {/* images */}
                          <div className="flex gap-2 flex-wrap">
                            {item.photos?.map((img: string, i: number) => (
                              <img
                                key={i}
                                src={img}
                                className="w-14 h-14 rounded object-cover"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* right */}
          <div className="space-y-6">

            {/* progress */}
            <div className="border rounded-2xl p-6 bg-white">
              <div className="space-y-5">
                <div>
                  <p className="text-sm text-gray-500">Collected</p>

                  <h3 className="text-4xl font-bold text-primary">
                    ${(campaign.collectedAmount / 1000).toFixed(1)}K
                  </h3>

                  <p className="text-sm text-gray-500">
                    of ${(campaign.goalAmount / 1000).toFixed(1)}K goal
                  </p>
                </div>

                <div>
                  <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-3 bg-primary"
                      style={{
                        width: `${Math.min(progressPercent, 100)}%`,
                      }}
                    />
                  </div>

                  <p className="text-sm mt-2 font-medium">
                    {Math.round(progressPercent)}% funded
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold">{daysLeft}</p>
                    <p className="text-xs text-gray-500">Days Left</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold">0</p>
                    <p className="text-xs text-gray-500">Supporters</p>
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/donate-money?campaign=${campaign.id}`}>
                    <Heart className="w-4 h-4 mr-2" />
                    Donate Money
                  </Link>
                </Button>
              </div>
            </div>

            {/* accepted items */}
            {campaign.acceptedItems?.length > 0 && (
              <div className="border rounded-2xl p-6 bg-white">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Items You Can Donate
                </h3>

                <div className="space-y-3 mb-5">
                  {campaign.acceptedItems.map((item: string, index: number) => (
                    <div
                      key={index}
                      className="border-l-4 border-primary/40 pl-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowForm(!showForm)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Donate Items
                </Button>
              </div>
            )}

            {/* form */}
            {showForm && (
              <ItemDonationForm
                campaignId={campaign.id}
                acceptedItems={campaign.acceptedItems || []}
                onSuccess={() => setShowForm(false)}
              />
            )}

            {/* trust */}
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Campaign verified</span>
              </div>

              <div className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Transparent fund management</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

function CampaignDetailsSkeleton() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-96 rounded-2xl" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}