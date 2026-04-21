'use client'

import Link from 'next/link'
import Image from 'next/image'
import { campaigns, campaignCategories } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Heart, Share2, Flag, ArrowLeft, Users, Calendar, TrendingUp, CheckCircle, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

interface CampaignDetailsProps {
  id: string
}

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const campaign = campaigns.find(c => c.id === id)
  const [donated, setDonated] = useState(false)

  if (!campaign) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-lg text-foreground/70 mb-6">Campaign not found</p>
          <Button asChild size="lg">
            <Link href="/campaigns">Back to Campaigns</Link>
          </Button>
        </div>
      </main>
    )
  }

  const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100
  const categoryInfo = campaignCategories.find(c => c.id === campaign.category)
  const remainingAmount = campaign.goalAmount - campaign.collectedAmount
  const daysLeft = Math.floor(Math.random() * 30) + 10

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/campaigns" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Campaigns
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
              <img 
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                {categoryInfo && (
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${categoryInfo.color} ${categoryInfo.textColor}`}>
                    {categoryInfo.name}
                  </span>
                )}
              </div>
            </div>

            {/* Title & Meta */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                {campaign.title}
              </h1>
              
              <div className="flex flex-wrap gap-6 text-foreground/70">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">By</p>
                    <p className="font-semibold text-foreground">{campaign.creatorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Started</p>
                    <p className="font-semibold text-foreground">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Donors</p>
                    <p className="font-semibold text-foreground">{campaign.donors.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/50" />

            {/* Story Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">The Story</h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {campaign.story}
                </p>
              </div>

              {/* Description */}
              <p className="text-foreground/60 leading-relaxed">
                {campaign.description}
              </p>
            </div>

            {/* Updates Section */}
            {campaign.updates.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Updates</h3>
                <div className="space-y-4">
                  {campaign.updates.map((update, idx) => (
                    <div key={idx} className="p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground/60 mb-2">{new Date(update.date).toLocaleDateString()}</p>
                          <p className="text-foreground font-medium">{update.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Donors */}
            {campaign.recentDonors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Recent Supporters</h3>
                <div className="space-y-3">
                  {campaign.recentDonors.slice(0, 5).map((donor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-4">
                        <img 
                          src={donor.avatar}
                          alt={donor.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-foreground">{donor.name}</p>
                          <p className="text-sm text-foreground/60">{new Date(donor.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">৳{donor.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Progress Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-border/50">
                <div className="space-y-6">
                  {/* Amount */}
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Amount Collected</p>
                    <p className="text-4xl font-bold text-primary">
                      ৳{(campaign.collectedAmount / 100000).toFixed(1)}L
                    </p>
                    <p className="text-sm text-foreground/60 mt-2">
                      of ৳{(campaign.goalAmount / 100000).toFixed(1)}L goal
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      {Math.round(progressPercent)}% funded
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{campaign.donors.toLocaleString()}</p>
                      <p className="text-xs text-foreground/60">Supporters</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{daysLeft}</p>
                      <p className="text-xs text-foreground/60">Days left</p>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    asChild 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold h-12"
                  >
                    <Link href={`/donate-money?campaign=${campaign.id}`} className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" />
                      Donate Now
                    </Link>
                  </Button>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Flag className="w-4 h-4 mr-2" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Creator Card */}
              <div className="bg-white p-6 rounded-2xl border border-border/50">
                <p className="text-sm text-foreground/60 mb-4">Campaign Creator</p>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={campaign.creatorAvatar}
                    alt={campaign.creatorName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-bold text-foreground">{campaign.creatorName}</p>
                    <p className="text-sm text-foreground/60">Verified Creator</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg">
                  Contact Creator
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Campaign verified by DonateBridge</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Transparent fund management</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/70">Regular updates required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
