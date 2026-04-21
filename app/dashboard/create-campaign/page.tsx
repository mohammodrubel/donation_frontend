'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Upload, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function CreateCampaignPage() {
  const [step, setStep] = useState(1)

  const steps = [
    { num: 1, title: 'Campaign Details' },
    { num: 2, title: 'Story & Media' },
    { num: 3, title: 'Goal & Timeline' },
    { num: 4, title: 'Review & Launch' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Fundraising Campaign</h1>
        <p className="text-muted-foreground mt-2">Share your story and start making a difference</p>
      </div>

      {/* Steps */}
      <div className="flex justify-between items-center">
        {steps.map((s, idx) => (
          <div key={s.num} className="flex items-center flex-1">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                step >= s.num
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {s.num}
            </div>
            <p className={`text-sm font-semibold ml-3 ${step >= s.num ? 'text-primary' : 'text-muted-foreground'}`}>
              {s.title}
            </p>
            {idx < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${step > s.num ? 'bg-primary' : 'bg-border'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-2xl">
        {step === 1 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Campaign Details</h2>
              <p className="text-muted-foreground">Tell us about your campaign</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Campaign Title *</label>
                <Input placeholder="e.g., Emergency Medical Fund for Surgery" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Category *</label>
                <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                  <option>Select a category</option>
                  <option>Medical Emergency</option>
                  <option>Education</option>
                  <option>Family Support</option>
                  <option>Disaster Relief</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Short Description *</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={4}
                  placeholder="Brief overview of your campaign"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2 ml-auto" onClick={() => setStep(2)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Your Story & Media</h2>
              <p className="text-muted-foreground">Share your story to inspire donors</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Story *</label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                  rows={8}
                  placeholder="Tell your story in detail..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Campaign Cover Image *</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2 ml-auto" onClick={() => setStep(3)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Goal & Timeline</h2>
              <p className="text-muted-foreground">Set your fundraising goals</p>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Fundraising Goal (BDT) *</label>
                  <Input type="number" placeholder="100000" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Campaign Duration (Days) *</label>
                  <Input type="number" placeholder="30" />
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-foreground mb-2">
                  <strong>Target Amount:</strong> ৳100,000
                </p>
                <p className="text-sm text-muted-foreground">
                  Your campaign will run for 30 days. You can extend it later if needed.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="bg-primary hover:bg-primary/90 gap-2 ml-auto" onClick={() => setStep(4)}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Review & Launch</h2>
              <p className="text-muted-foreground">Everything looks good?</p>
            </div>

            <div className="space-y-4 border-t border-b border-border py-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Campaign Title</span>
                <span className="font-semibold text-foreground">Emergency Medical Fund...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span className="font-semibold text-foreground">Medical Emergency</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Goal Amount</span>
                <span className="font-semibold text-foreground">৳100,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-semibold text-foreground">30 Days</span>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-800">
                ✓ Your campaign is ready to launch. Funds will be securely held and transferred only after the campaign ends.
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep(3)}>
                Back
              </Button>
              <Button className="bg-primary hover:bg-primary/90 gap-2 ml-auto">
                <Heart className="w-4 h-4" />
                Launch Campaign
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
