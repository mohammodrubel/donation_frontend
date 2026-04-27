// components/campaign/CampaignListing.tsx
'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Search, Filter, Calendar, Tag, Target, Clock, AlertCircle } from 'lucide-react'
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi'
import { campaignCategories } from '@/lib/mockData'  // adjust import as needed
import { CampaignCard } from './CampaignCard'
import { CampaignSkeleton } from './CampaignSkeleton'
import { Campaign } from '@/lib/types'


export function CampaignListing() {
  const { data, isLoading } = useGetCampaignsQuery(undefined)
  const campaigns: Campaign[] = data?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO SECTION */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 py-16 border-b border-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:40px_40px]" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Discover Campaigns
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Join movements that create real impact — support causes you care about.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* SEARCH BAR (visual only) */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10 rounded-full bg-white shadow-sm border-gray-200 focus:ring-primary/20"
            readOnly
          />
        </div>

        {/* STATIC FILTER SECTION (visual only) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm rounded-full bg-black text-white shadow-sm transition hover:bg-gray-800">
                  All
                </button>
                {campaignCategories.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Sort by
              </h3>
              <div className="flex gap-2">
                {['Recent', 'Trending', 'Urgent', 'Ending Soon'].map((sort) => (
                  <button
                    key={sort}
                    className="px-3 py-1.5 text-sm rounded-full bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition"
                  >
                    {sort}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CAMPAIGNS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <CampaignSkeleton key={i} />)
            : campaigns.map((campaign) => {
                const categoryObj = campaignCategories.find(c => c.id === campaign.category)
                const categoryLabel = categoryObj?.name || campaign.category || 'Other'
                return <CampaignCard key={campaign.id} campaign={campaign} categoryLabel={categoryLabel} />
              })}
        </div>

        {/* Empty state */}
        {!isLoading && campaigns.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No campaigns found</h3>
            <p className="text-gray-500 mt-2">Check back later for new opportunities to make an impact.</p>
          </div>
        )}
      </div>
    </div>
  )
}