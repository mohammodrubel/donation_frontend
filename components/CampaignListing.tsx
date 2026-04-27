'use client'

import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { Search, Filter, Calendar, Tag, Target, Clock, AlertCircle } from 'lucide-react'
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi'
import { campaignCategories } from '@/lib/mockData'

function CampaignSkeleton() {
  return (
    <div className="border rounded-2xl p-5 space-y-4 bg-white shadow-sm">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <Skeleton className="h-2 w-full rounded-full" />
      <div className="flex justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  )
}

// Helper: strip HTML tags for description preview
function stripHtml(html: string) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

// Format date nicely
function formatDate(dateString: string) {
  if (!dateString) return 'TBD'
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

// Calculate days left (if end date is future)
function getDaysLeft(endDateString: string) {
  const end = new Date(endDateString)
  const today = new Date()
  if (end < today) return 0
  const diffTime = end.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Category badge styling
const categoryStyles: Record<string, string> = {
  emergency: 'bg-red-100 text-red-800 border-red-200',
  education: 'bg-blue-100 text-blue-800 border-blue-200',
  health: 'bg-green-100 text-green-800 border-green-200',
  environment: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  animal: 'bg-amber-100 text-amber-800 border-amber-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200',
}

export function CampaignListing() {
  const { data, isLoading } = useGetCampaignsQuery(undefined)
  const campaigns = data?.data || []

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">

      {/* HERO SECTION - Enhanced */}
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

        {/* SEARCH BAR - decorative only */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search campaigns..."
            className="pl-10 rounded-full bg-white shadow-sm border-gray-200 focus:ring-primary/20"
            readOnly
          />
        </div>

        {/* STATIC FILTER SECTION - purely visual, no functionality */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-10">
          <div className="flex flex-wrap items-center gap-8">
            {/* Category filter */}
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

            

            {/* Sort filter */}
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
            : campaigns.map((campaign: any) => {
                const progress = (campaign.collectedAmount / campaign.goalAmount) * 100
                const daysLeft = getDaysLeft(campaign.endDate)
                const isEnded = daysLeft === 0 && new Date(campaign.endDate) < new Date()
                const plainDescription = stripHtml(campaign.description || '')
                const categoryKey = campaign.category?.toLowerCase() || 'other'
                const categoryLabel = campaignCategories.find(c => c.id === campaign.category)?.name || campaign.category || 'Other'

                return (
                  <Link
                    key={campaign.id}
                    href={`/campaigns/${campaign.id}`}
                    className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image with overlay gradient */}
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      
                      {/* Category badge */}
                      <div className="absolute top-3 left-3">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${categoryStyles[categoryKey] || categoryStyles.other}`}>
                          {categoryLabel}
                        </span>
                      </div>

                      {/* Days left / Ended badge */}
                      {!isEnded && daysLeft > 0 && (
                        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                        </div>
                      )}
                      {isEnded && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Ended
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h2 className="font-bold text-xl text-gray-900 line-clamp-1 group-hover:text-primary transition">
                        {campaign.title}
                      </h2>

                      {/* Description */}
                      <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-relaxed">
                        {plainDescription}
                      </p>

                      {/* Tags */}
                      {campaign.tags && campaign.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {campaign.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              #{tag}
                            </span>
                          ))}
                          {campaign.tags.length > 3 && (
                            <span className="text-xs text-gray-400">+{campaign.tags.length - 3}</span>
                          )}
                        </div>
                      )}

                      {/* Dates */}
                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Starts {formatDate(campaign.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" />
                          <span>Ends {formatDate(campaign.endDate)}</span>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700">Raised</span>
                          <span className="font-semibold text-primary">
                            ${campaign.collectedAmount.toLocaleString()} 
                            <span className="text-gray-400 font-normal"> of ${campaign.goalAmount.toLocaleString()}</span>
                          </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-primary/70 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                        <div className="mt-2 text-right">
                          <span className="text-xs font-medium text-gray-500">{Math.round(progress)}% funded</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
        </div>

        {/* Empty state (if no campaigns) */}
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