'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Heart, Check, AlertCircle, ArrowRight, Loader2, Calendar, User, Mail } from 'lucide-react'
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi'
import { useSelector } from 'react-redux'
import { useCreateDonationMutation } from '@/lib/reudx/fetchers/donation/donationApi'

export function MoneyDonationForm() {
  const searchParams = useSearchParams()
  const campaignFromUrl = searchParams.get('campaign')

  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState('')
  const [completed, setCompleted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const user = useSelector((state: any) => state?.auth?.user)

  const { data, isLoading, isError } = useGetCampaignsQuery(undefined)
  const campaigns = data?.data || []

  const [createDonation, { isLoading: isSubmitting }] = useCreateDonationMutation()

  // ✅ set campaign from URL
  useEffect(() => {
    if (campaignFromUrl) {
      setSelectedCampaign(campaignFromUrl)
    }
  }, [campaignFromUrl])

  // auto fill user
  useEffect(() => {
    if (user) {
      if (user.name && !donorName) setDonorName(user.name)
      if (user.email && !donorEmail) setDonorEmail(user.email)
    }
  }, [user, donorName, donorEmail])

  const finalAmount = Number(customAmount || amount || 0)

  const selectedCampaignData = campaigns.find((c: any) => c.id === selectedCampaign)

  const presetAmounts = [500, 1000, 2500, 5000, 10000]

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
    if (step === 2 && (!donorName || !donorEmail)) {
      alert('Please fill in your details')
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = async () => {
    setSubmitError(null)

    try {
      if (!selectedCampaign) {
        setSubmitError('Campaign not selected')
        return
      }

      const donationData = {
        amount: finalAmount,
        donorName,
        donorEmail,
        campaignId: selectedCampaign,
        donorId: user?.id || null,
        anonymous: false,
      }

      const result = await createDonation(donationData).unwrap()

      if (result?.data?.url) {
        window.location.href = result?.data?.url
        return
      }

      setCompleted(true)
    } catch (err: any) {
      setSubmitError(err?.data?.message || 'Payment failed')
      console.log(err)
    }
  }

  // loading
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


 
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-secondary/5 px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex-1 mx-2">
                <div className={`h-2 rounded-full transition-colors ${
                  num <= step ? 'bg-primary' : 'bg-muted'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-foreground/60 font-medium">
            <span>Amount</span>
            <span>Details</span>
            <span>Confirm</span>
          </div>
        </div>

        {/* Step 1: Amount */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">How much would you like to donate?</h1>
              <p className="text-lg text-foreground/60">Every contribution makes a real difference</p>
            </div>

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

        {/* Step 2: Personal Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Donation Details</h1>
              <p className="text-lg text-foreground/60">Please provide your contact information</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-foreground font-semibold mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your name"
                    className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                  <input
                    type="email"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Review <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm & Submit */}
        {step === 3 && (
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-foreground/60 mb-1">Donor</p>
                  <p className="font-semibold text-foreground">{donorName}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-foreground/60 mb-1">Email</p>
                  <p className="font-semibold text-foreground text-sm break-all">{donorEmail}</p>
                </div>
              </div>

              {selectedCampaignData && (
                <div className="p-4 rounded-xl bg-muted">
                  <div className="flex gap-4">
                    {selectedCampaignData.image && (
                      <div className="flex-shrink-0 w-16 h-16 relative rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={selectedCampaignData.image}
                          alt={selectedCampaignData.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-foreground/60 mb-1">Campaign</p>
                      <p className="font-semibold text-foreground">{selectedCampaignData.title}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/60 mt-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Start: {formatDate(selectedCampaignData.startDate)}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> End: {formatDate(selectedCampaignData.endDate)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                  {submitError}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                size="lg" 
                disabled={isSubmitting}
                className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold disabled:opacity-70"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <Heart className="w-4 h-4 mr-2" />
                )}
                {isSubmitting ? 'Processing...' : 'Confirm Donation'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}