'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heart, Check, AlertCircle, ArrowRight, Loader2, Calendar } from 'lucide-react'
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi'

interface MoneyDonationFormProps {
  campaignId?: string
}

interface Campaign {
  id: string
  title: string
  description: string
  collectedAmount: number
  goalAmount: number
  creatorId: string
  startDate: string
  endDate: string
  image?: string
  slug?: string
  status?: string
  tags?: string[]
}

export function MoneyDonationForm({ campaignId }: MoneyDonationFormProps) {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [receipt, setReceipt] = useState(true)
  const [selectedCampaign, setSelectedCampaign] = useState(campaignId || '')
  const [completed, setCompleted] = useState(false)

  const { data, isLoading, isError } = useGetCampaignsQuery(undefined)
  const campaigns: Campaign[] = data?.data || []

  const finalAmount = customAmount ? parseInt(customAmount) : parseInt(amount)
  const selectedCampaignData = campaigns.find(c => c.id === selectedCampaign)

  const presetAmounts = [500, 1000, 2500, 5000, 10000]

  // Format date to readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleNext = () => {
    if (step === 1 && !finalAmount) {
      alert('Please select or enter an amount')
      return
    }
    if (step === 2 && !selectedCampaign) {
      alert('Please select a campaign')
      return
    }
    if (step === 3 && (!donorName || !donorEmail)) {
      alert('Please fill in your details')
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = () => {
    setCompleted(true)
    setTimeout(() => {
      setStep(1)
      setAmount('')
      setCustomAmount('')
      setDonorName('')
      setDonorEmail('')
      setSelectedCampaign(campaignId || '')
      setCompleted(false)
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/70">Loading campaigns...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center border border-border/50">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-3">Unable to load campaigns</h1>
          <p className="text-foreground/70 mb-6">Please try again later or contact support.</p>
          <Button onClick={() => window.location.reload()} className="w-full">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-border/50">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Thank You!</h1>
          <p className="text-lg text-foreground/70 mb-2">Your donation of ৳{finalAmount.toLocaleString()} has been received.</p>
          <p className="text-foreground/60 mb-8">A confirmation email has been sent to {donorEmail}</p>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
            <Link href="/campaigns">Back to Campaigns</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex-1 mx-2">
                <div className={`h-2 rounded-full transition-colors ${
                  num <= step ? 'bg-primary' : 'bg-muted'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-foreground/60 font-medium">
            <span>Amount</span>
            <span>Campaign</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Amount Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">How much would you like to donate?</h1>
              <p className="text-lg text-foreground/60">Every contribution makes a real difference</p>
            </div>

            {/* Preset Amounts */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {presetAmounts.map(amt => (
                <button
                  key={amt}
                  onClick={() => {
                    setAmount(amt.toString())
                    setCustomAmount('')
                  }}
                  className={`p-6 rounded-xl border-2 transition-all text-center font-bold text-lg ${
                    amount === amt.toString()
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  ৳{(amt / 1000).toFixed(1)}K
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="space-y-2">
              <label className="block text-foreground font-semibold">Or enter a custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/60 font-semibold">৳</span>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setAmount('')
                  }}
                  placeholder="Enter amount"
                  className="w-full pl-8 pr-4 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground font-semibold"
                />
              </div>
            </div>

            {finalAmount > 0 && (
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-sm text-foreground/60 mb-1">You are about to donate</p>
                <p className="text-3xl font-bold text-primary">৳{finalAmount.toLocaleString()}</p>
              </div>
            )}

            <Button onClick={handleNext} size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Campaign Selection with Start & End Dates */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Which campaign do you want to support?</h1>
              <p className="text-lg text-foreground/60">Choose a campaign or leave it for general donations</p>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              <button
                onClick={() => setSelectedCampaign('')}
                className={`p-4 rounded-xl border-2 text-left transition-all w-full ${
                  selectedCampaign === ''
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <p className="font-semibold text-foreground">General Donation</p>
                <p className="text-sm text-foreground/60">Support our general fund for maximum flexibility</p>
              </button>

              {campaigns.map(campaign => {
                // Strip HTML tags from description
                const plainDescription = campaign.description?.replace(/<[^>]*>/g, '') || ''
                const truncatedDesc = plainDescription.length > 100 
                  ? plainDescription.substring(0, 100) + '...' 
                  : plainDescription

                return (
                  <button
                    key={campaign.id}
                    onClick={() => setSelectedCampaign(campaign.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all w-full ${
                      selectedCampaign === campaign.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground text-lg">{campaign.title}</p>
                      
                      {truncatedDesc && (
                        <p className="text-sm text-foreground/70 line-clamp-2">{truncatedDesc}</p>
                      )}
                      
                      {/* Start and End Dates */}
                      <div className="flex items-center gap-4 text-xs text-foreground/60 mt-2">
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
                  </button>
                )
              })}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Details */}
        {step === 3 && (
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
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={anonymous}
                  onChange={(e) => setAnonymous(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-border accent-primary cursor-pointer"
                />
                <span className="text-foreground font-medium">Make this donation anonymous</span>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-border hover:border-primary/50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={receipt}
                  onChange={(e) => setReceipt(e.target.checked)}
                  className="w-5 h-5 rounded border-2 border-border accent-primary cursor-pointer"
                />
                <span className="text-foreground font-medium">I want a tax receipt</span>
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Review <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Confirm Your Donation</h1>
              <p className="text-lg text-foreground/60">Please review your donation details</p>
            </div>

            {/* Summary */}
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
              <Button onClick={() => setStep(3)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleSubmit} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                <Heart className="w-4 h-4 mr-2" />
                Confirm Donation
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}