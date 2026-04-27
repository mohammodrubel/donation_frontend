// components/donation/StepConfirm.tsx
'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart, AlertCircle } from 'lucide-react'
import { Campaign } from '@/lib/types'

interface StepConfirmProps {
  finalAmount: number
  donorName: string
  donorEmail: string
  anonymous: boolean
  selectedCampaign: string
  selectedCampaignData?: Campaign
  onBack: () => void
  onSubmit: () => void
}

export function StepConfirm({
  finalAmount,
  donorName,
  donorEmail,
  anonymous,
  selectedCampaign,
  selectedCampaignData,
  onBack,
  onSubmit,
}: StepConfirmProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Confirm Your Donation</h1>
        <p className="text-lg text-foreground/60">Please review your donation details</p>
      </div>

      <div className="space-y-4">
        <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50">
          <p className="text-sm text-foreground/60 mb-2">Donation Amount</p>
          <p className="text-4xl font-bold text-primary">৳{finalAmount.toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-muted">
            <p className="text-xs text-foreground/60 mb-1">Donor</p>
            <p className="font-semibold text-foreground">{anonymous ? 'Anonymous' : donorName}</p>
          </div>
          <div className="p-4 rounded-xl bg-muted">
            <p className="text-xs text-foreground/60 mb-1">Email</p>
            <p className="font-semibold text-foreground text-sm">{donorEmail}</p>
          </div>
        </div>

        {selectedCampaign && selectedCampaignData && (
          <div className="p-4 rounded-xl bg-muted">
            <div className="flex gap-4">
              {selectedCampaignData.image && (
                <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                  <Image src={selectedCampaignData.image} alt={selectedCampaignData.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-xs text-foreground/60 mb-1">Campaign</p>
                <p className="font-semibold text-foreground">{selectedCampaignData.title}</p>
                <div className="flex items-center gap-4 text-xs text-foreground/60 mt-2">
                  <span>📅 Start: {formatDate(selectedCampaignData.startDate)}</span>
                  <span>📅 End: {formatDate(selectedCampaignData.endDate)}</span>
                </div>
                {selectedCampaignData.description && (
                  <p className="text-sm text-foreground/70 mt-2">
                    {selectedCampaignData.description.replace(/<[^>]*>/g, '').substring(0, 120)}
                    {selectedCampaignData.description.replace(/<[^>]*>/g, '').length > 120 ? '...' : ''}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-foreground">Secure Payment</p>
            <p className="text-xs text-foreground/60">Your payment is protected by industry-standard encryption</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
          Back
        </Button>
        <Button onClick={onSubmit} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
          <Heart className="w-4 h-4 mr-2" />
          Confirm Donation
        </Button>
      </div>
    </div>
  )
}