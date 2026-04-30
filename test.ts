'use client'

import { useState } from 'react'
import Link from 'next/link'
import { itemCategories } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Check, ArrowRight, AlertCircle, Upload, Truck } from 'lucide-react'

export function ItemDonationForm() {
  const [step, setStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [itemName, setItemName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [condition, setCondition] = useState('used')
  const [description, setDescription] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [address, setAddress] = useState('')
  const [preferredDate, setPreferredDate] = useState('')
  const [preferredTime, setPreferredTime] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [completed, setCompleted] = useState(false)

  const conditions = [
    { id: 'new', label: 'Brand New', desc: 'Never used, in original packaging' },
    { id: 'excellent', label: 'Excellent', desc: 'Like new, minimal wear' },
    { id: 'used', label: 'Good Condition', desc: 'Well maintained, functional' },
    { id: 'fair', label: 'Fair Condition', desc: 'Shows wear, but still usable' },
  ]

  const handleNext = () => {
    if (step === 1 && !selectedCategory) {
      alert('Please select a category')
      return
    }
    if (step === 2 && (!itemName || !quantity || !condition)) {
      alert('Please fill in item details')
      return
    }
    if (step === 3 && (!address || !preferredDate)) {
      alert('Please fill in pickup details')
      return
    }
    if (step === 4 && (!contactName || !contactPhone)) {
      alert('Please fill in your contact information')
      return
    }
    setStep(step + 1)
  }

  const handleSubmit = () => {
    setCompleted(true)
    setTimeout(() => {
      resetForm()
    }, 3000)
  }

  const resetForm = () => {
    setStep(1)
    setSelectedCategory('')
    setItemName('')
    setQuantity('')
    setCondition('used')
    setDescription('')
    setPhotos([])
    setAddress('')
    setPreferredDate('')
    setPreferredTime('')
    setContactName('')
    setContactPhone('')
    setCompleted(false)
  }

  if (completed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary/5 to-secondary/5 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-12 text-center border border-border/50">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Thank You!</h1>
          <p className="text-lg text-foreground/70 mb-2">Your {itemName} donation has been registered.</p>
          <p className="text-foreground/60 mb-8">Our team will contact you shortly to arrange pickup.</p>
          <Button asChild className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
            <Link href="/campaigns">Browse Campaigns</Link>
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
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className="flex-1 mx-2">
                <div className={`h-2 rounded-full transition-colors ${
                  num <= step ? 'bg-primary' : 'bg-muted'
                }`} />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs sm:text-sm text-foreground/60 font-medium">
            <span>Category</span>
            <span>Item Details</span>
            <span>Pickup</span>
            <span>Contact</span>
            <span>Review</span>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">What would you like to donate?</h1>
              <p className="text-lg text-foreground/60">Select the category of items</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {itemCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-6 rounded-xl border-2 transition-all text-center space-y-2 ${
                    selectedCategory === cat.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-3xl block">{cat.icon}</span>
                  <span className="block font-bold text-foreground text-sm">{cat.name}</span>
                </button>
              ))}
            </div>

            <Button onClick={handleNext} size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Item Details */}
        {step === 2 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Tell us about the items</h1>
              <p className="text-lg text-foreground/60">Provide details to help recipients prepare</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-foreground font-semibold mb-2">Item Name</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g., Winter Jackets, Textbooks"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-semibold mb-2">Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Number of items"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-2">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  >
                    {conditions.map(cond => (
                      <option key={cond.id} value={cond.id}>{cond.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add any additional details about the items..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground resize-none"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Add Photos (Optional)</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-foreground/40 mx-auto mb-2" />
                  <p className="text-foreground/60">Click to upload photos of your items</p>
                  <p className="text-xs text-foreground/40 mt-1">JPG, PNG up to 5MB</p>
                </div>
              </div>
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

        {/* Step 3: Pickup Details */}
        {step === 3 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Pickup Information</h1>
              <p className="text-lg text-foreground/60">When and where can we collect the items?</p>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 text-sm">Free Pickup Service</p>
                <p className="text-xs text-blue-800">Our volunteers will pick up your donation at your convenience</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-foreground font-semibold mb-2">Pickup Address</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter complete pickup address"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-foreground font-semibold mb-2">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-2">Preferred Time</label>
                  <input
                    type="time"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Contact Information */}
        {step === 4 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Your Contact Information</h1>
              <p className="text-lg text-foreground/60">We&apos;ll use this to coordinate pickup</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-foreground font-semibold mb-2">Full Name</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <div>
                <label className="block text-foreground font-semibold mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+880 1XXX XXXXXX"
                  className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none text-foreground"
                />
              </div>

              <div className="p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900 text-sm">Your privacy is protected</p>
                  <p className="text-xs text-green-800">We only use your contact info for pickup coordination</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(3)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleNext} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                Review <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Review & Confirm */}
        {step === 5 && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Review Your Donation</h1>
              <p className="text-lg text-foreground/60">Please verify all details before submitting</p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-border/50">
                <p className="text-sm text-foreground/60 mb-2">Item Summary</p>
                <div className="space-y-2">
                  <p className="text-xl font-bold text-primary">{itemName}</p>
                  <p className="text-foreground/70">
                    <span className="font-semibold">{quantity}</span> item(s) in <span className="font-semibold">{condition}</span> condition
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-foreground/60 mb-2">Pickup Date</p>
                  <p className="font-semibold text-foreground">{new Date(preferredDate).toLocaleDateString()}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted">
                  <p className="text-xs text-foreground/60 mb-2">Contact</p>
                  <p className="font-semibold text-foreground">{contactName}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted">
                <p className="text-xs text-foreground/60 mb-2">Pickup Address</p>
                <p className="font-semibold text-foreground text-sm">{address}</p>
              </div>

              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Ready for Pickup</p>
                  <p className="text-xs text-foreground/60">We&apos;ll send you an SMS and email when the volunteer is nearby</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(4)} variant="outline" size="lg" className="flex-1 rounded-lg h-12 font-semibold">
                Back
              </Button>
              <Button onClick={handleSubmit} size="lg" className="flex-1 bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                <Check className="w-4 h-4 mr-2" />
                Submit Donation
              </Button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}


import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ItemDonationForm } from '@/components/ItemDonationForm'

export const metadata = {
  title: 'Donate Items - DonateBridge',
  description: 'Donate physical items like clothing, books, medical supplies, and more to verified NGO campaigns.',
}

export default function DonateItemsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Donate Items</h1>
          <p className="text-foreground/70">
            Share physical items that can directly help those in need. From clothing to educational materials, your donations make a real difference.
          </p>
        </div>
        <ItemDonationForm />
      </main>
      <Footer />
    </div>
  )
}