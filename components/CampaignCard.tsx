// components/campaign/CampaignCard.tsx
'use client'

import Link from 'next/link'
import { Calendar, Target, Clock, AlertCircle } from 'lucide-react'
import { Campaign } from '@/lib/types'
import { categoryStyles, formatDate, getDaysLeft, stripHtml } from '@/lib/utils'



interface CampaignCardProps {
  campaign: Campaign
  categoryLabel?: string  // optional override, otherwise will be derived from campaign.category
}

export function CampaignCard({ campaign, categoryLabel }: CampaignCardProps) {
  const progress = (campaign.collectedAmount / campaign.goalAmount) * 100
  const daysLeft = getDaysLeft(campaign.endDate)
  const isEnded = daysLeft === 0 && new Date(campaign.endDate) < new Date()
  const plainDescription = stripHtml(campaign.description || '')
  const categoryKey = campaign.category?.toLowerCase() || 'other'
  const displayCategory = categoryLabel || campaign.category || 'Other'
console.log(campaign)
  return (
    <Link
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
            {displayCategory}
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

        {/* Icons */}
        {campaign.icons && campaign.icons.length > 0 && (
          <div className="flex items-center flex-wrap gap-2 mt-3">
            {campaign.icons.slice(0, 6).map((icon, i) => (
              <img
                key={`${icon}-${i}`}
                src={icon}
                alt=""
                className="w-8 h-8 rounded-md object-cover border border-gray-200 bg-white"
              />
            ))}
            {campaign.icons.length > 6 && (
              <span className="text-xs text-gray-400">
                +{campaign.icons.length - 6}
              </span>
            )}
          </div>
        )}

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
            <span className="text-xs font-medium text-gray-500">Contributor {campaign?.contributor}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}