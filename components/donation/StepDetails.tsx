// components/donation/StepDetails.tsx
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface StepDetailsProps {
  donorName: string
  donorEmail: string
  anonymous: boolean
  receipt: boolean
  onDonorNameChange: (name: string) => void
  onDonorEmailChange: (email: string) => void
  onAnonymousChange: (val: boolean) => void
  onReceiptChange: (val: boolean) => void
  onBack: () => void
  onNext: () => void
}

export function StepDetails({
  donorName,
  donorEmail,
  anonymous,
  receipt,
  onDonorNameChange,
  onDonorEmailChange,
  onAnonymousChange,
  onReceiptChange,
  onBack,
  onNext,
}: StepDetailsProps) {
  const handleNext = () => {
    if (!donorName || !donorEmail) {
      alert('Please fill in your details')
      return
    }
    onNext()
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Donation Details</h1>
        <p className="text-lg text-foreground/60">Please provide your contact information</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-foreground font-semibold mb-2">Full Name</label>
          <input
            type="text"
            value={donorName}
            onChange={e => onDonorNameChange(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
          />
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-2">Email Address</label>
          <input
            type="email"
            value={donorEmail}
            onChange={e => onDonorEmailChange(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
          />
        </div>

        <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={e => onAnonymousChange(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-border accent-primary cursor-pointer"
          />
          <span className="text-foreground font-medium">Make this donation anonymous</span>
        </label>

        <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-colors">
          <input
            type="checkbox"
            checked={receipt}
            onChange={e => onReceiptChange(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-border accent-primary cursor-pointer"
          />
          <span className="text-foreground font-medium">I want a tax receipt</span>
        </label>
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
          Back
        </Button>
        <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
          Review <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}