// components/donation/StepCampaign.tsx
'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { Campaign } from '@/lib/types'


interface StepCampaignProps {
  campaigns: Campaign[]
  selectedCampaign: string
  onSelectCampaign: (id: string) => void
  onBack: () => void
  onNext: () => void
}

export function StepCampaign({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
  onBack,
  onNext,
}: StepCampaignProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleNext = () => {
    if (!selectedCampaign) {
      alert('Please select a campaign')
      return
    }
    onNext()
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Which campaign do you want to support?</h1>
        <p className="text-lg text-foreground/60">Choose a campaign or leave it for general donations</p>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        <button
          onClick={() => onSelectCampaign('')}
          className={`p-4 rounded-xl border-2 text-left transition-all w-full ${
            selectedCampaign === '' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
        >
          <p className="font-semibold text-foreground">General Donation</p>
          <p className="text-sm text-foreground/60">Support our general fund for maximum flexibility</p>
        </button>

        {campaigns.map(campaign => {
          const plainDescription = campaign.description?.replace(/<[^>]*>/g, '') || ''
          const truncatedDesc = plainDescription.length > 100 ? plainDescription.substring(0, 100) + '...' : plainDescription

          return (
            <button
              key={campaign.id}
              onClick={() => onSelectCampaign(campaign.id)}
              className={`p-4 rounded-xl border-2 text-left transition-all w-full ${
                selectedCampaign === campaign.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex gap-4">
                {campaign.image && (
                  <div className="flex-shrink-0 w-20 h-20 relative rounded-lg overflow-hidden bg-muted">
                    <Image src={campaign.image} alt={campaign.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-foreground text-lg">{campaign.title}</p>
                  {truncatedDesc && <p className="text-sm text-foreground/70 line-clamp-2">{truncatedDesc}</p>}
                  <div className="flex items-center gap-4 text-xs text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Start: {formatDate(campaign.startDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>End: {formatDate(campaign.endDate)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
          Back
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}