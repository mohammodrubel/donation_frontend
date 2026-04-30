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
  Gift,
  Sparkles,
  ChevronRight,
  Clock,
  Truck,
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

function formatAmount(amount: number) {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount}`;
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

// Helper to get initials from name
function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Random pastel color based on name (for avatar background)
function getAvatarColor(name: string) {
  const colors = [
    'bg-red-200 text-red-800',
    'bg-blue-200 text-blue-800',
    'bg-green-200 text-green-800',
    'bg-yellow-200 text-yellow-800',
    'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800',
    'bg-indigo-200 text-indigo-800',
    'bg-teal-200 text-teal-800',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const { data, isLoading, error } = useGetSingleCampaignQuery(id);
  const campaign = data?.data;

  const [showForm, setShowForm] = useState(false);
  const [showAllDonors, setShowAllDonors] = useState(false);
  const [showAllItems, setShowAllItems] = useState(false);

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

  const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100;
  const daysLeft = getDaysLeft(campaign.endDate);
  const categoryKey = campaign.category?.toLowerCase() || 'other';
  const categoryLabel =
    campaignCategories.find((c) => c.id === campaign.category)?.name ||
    campaign.category ||
    'Other';
  const plainStory = stripHtml(campaign.story || '');
  const plainDescription = stripHtml(campaign.description || '');

  // Filter completed donations (exclude pending)
  const completedDonations =
    campaign.donations?.filter((donation: any) => donation.status !== 'pending') || [];

  const displayedDonors = showAllDonors ? completedDonations : completedDonations.slice(0, 5);
  const displayedItems = showAllItems ? campaign.itemDonations || [] : (campaign.itemDonations || []).slice(0, 3);

  // Helper to get item status icon
  const getItemStatusIcon = (status?: string) => {
    switch (status) {
      case 'delivered':
        return <Truck className="w-3.5 h-3.5 text-green-600" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5 text-amber-600" />;
      default:
        return <Gift className="w-3.5 h-3.5 text-gray-500" />;
    }
  };

  return (
    <main className="bg-white">
      {/* top */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Campaigns
        </Link>
      </div>

      {/* body */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 shadow-md">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                    categoryStyles[categoryKey] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {categoryLabel}
                </span>
              </div>
            </div>

            {/* title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
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

            {/* story & help */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-3">The Story</h2>
                <p className="text-gray-700 leading-7">{plainStory}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3">How You Can Help</h2>
                <p className="text-gray-700 leading-7">{plainDescription}</p>
              </div>
            </div>

            {/* ============ PREMIUM MONETARY DONATIONS SECTION ============ */}
            {completedDonations.length > 0 && (
              <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-100 shadow-sm p-6 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">Recent Donors</h3>
                  </div>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>

                <div className="space-y-4">
                  {displayedDonors.map((donation: any, idx: number) => {
                    const isAnonymous = donation.anonymous === true;
                    const donorName = isAnonymous
                      ? 'Anonymous'
                      : donation.donor?.name || donation.donorName || 'Supporter';
                    const avatarColor = !isAnonymous ? getAvatarColor(donorName) : 'bg-gray-200 text-gray-500';
                    const initials = getInitials(donorName);
                    const amount = formatAmount(donation.amount);
                    const date = new Date(donation.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                    });

                    return (
                      <div
                        key={donation.id}
                        className="group flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white hover:shadow-sm"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-medium shadow-sm ${avatarColor}`}
                        >
                          {!isAnonymous && donation.donor?.avatar ? (
                            <img
                              src={donation.donor.avatar}
                              alt=""
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold">{initials}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-1">
                            <p className="font-semibold text-gray-800">{donorName}</p>
                            <span className="text-xs text-gray-400">{date}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm font-bold text-primary">{amount}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-400">Monetary</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {completedDonations.length > 5 && (
                  <button
                    onClick={() => setShowAllDonors(!showAllDonors)}
                    className="mt-5 w-full text-center text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1 transition"
                  >
                    {showAllDonors ? 'Show less' : `View all ${completedDonations.length} donors`}
                    <ChevronRight className={`w-4 h-4 transition-transform ${showAllDonors ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>
            )}

            {/* ============ PREMIUM ITEM DONATIONS SECTION ============ */}
            {campaign.itemDonations?.length > 0 && (
              <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50/80 border border-gray-100 shadow-sm p-6 transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      <Package className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">Item Donations</h3>
                  </div>
                  <Gift className="w-4 h-4 text-primary/60" />
                </div>

                <div className="space-y-5">
                  {displayedItems.map((item: any) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 transition-all hover:shadow-md hover:border-primary/20"
                    >
                      <div className="flex items-start gap-4">
                        {/* donor avatar */}
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-medium shadow-sm ${
                            item.donor?.avatar
                              ? ''
                              : getAvatarColor(item.donor?.name || 'Anonymous')
                          }`}
                        >
                          {item.donor?.avatar ? (
                            <img
                              src={item.donor.avatar}
                              alt=""
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-sm font-bold">
                              {getInitials(item.donor?.name || 'Anonymous')}
                            </span>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <p className="font-semibold text-gray-800">
                                {item.donor?.name || 'Anonymous'}
                              </p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                  {item.category}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {item.quantity} item{item.quantity !== 1 ? 's' : ''}
                                </span>
                                {item.status && (
                                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                                    {getItemStatusIcon(item.status)}
                                    <span className="capitalize">{item.status}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>

                          {item.description && (
                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                              {item.description}
                            </p>
                          )}

                          {item.photos?.length > 0 && (
                            <div className="flex gap-2 mt-3">
                              {item.photos.slice(0, 3).map((img: string, i: number) => (
                                <img
                                  key={i}
                                  src={img}
                                  alt="donation item"
                                  className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                                />
                              ))}
                              {item.photos.length > 3 && (
                                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                                  +{item.photos.length - 3}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {campaign.itemDonations.length > 3 && (
                  <button
                    onClick={() => setShowAllItems(!showAllItems)}
                    className="mt-5 w-full text-center text-sm text-primary hover:text-primary/80 font-medium flex items-center justify-center gap-1 transition"
                  >
                    {showAllItems ? 'Show less' : `View all ${campaign.itemDonations.length} item donations`}
                    <ChevronRight className={`w-4 h-4 transition-transform ${showAllItems ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* right sidebar (unchanged, but kept for completeness) */}
          <div className="space-y-6">
            {/* progress card (same as before) */}
            <div className="border rounded-2xl p-6 bg-white shadow-sm">
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
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                  <p className="text-sm mt-2 font-medium">{Math.round(progressPercent)}% funded</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-2xl font-bold">{daysLeft}</p>
                    <p className="text-xs text-gray-500">Days Left</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {completedDonations.length + (campaign.itemDonations?.length || 0)}
                    </p>
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
              <div className="border rounded-2xl p-6 bg-white shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Items You Can Donate
                </h3>
                <div className="space-y-3 mb-5">
                  {campaign.acceptedItems.map((item: string, index: number) => (
                    <div key={index} className="border-l-4 border-primary/40 pl-3 text-gray-700">
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

            {/* item donation form */}
            {showForm && (
              <ItemDonationForm
                campaignId={campaign.id}
                acceptedItems={campaign.acceptedItems || []}
                onSuccess={() => setShowForm(false)}
              />
            )}

            {/* trust badges */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-3 items-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Campaign verified</span>
              </div>
              <div className="flex gap-3 items-center">
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

// Skeleton loader with improved matching design
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
          <Skeleton className="h-64 rounded-2xl" /> {/* donors skeleton */}
          <Skeleton className="h-80 rounded-2xl" /> {/* items skeleton */}
        </div>
        <div className="space-y-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}