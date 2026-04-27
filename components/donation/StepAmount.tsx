// components/donation/StepAmount.tsx
'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface StepAmountProps {
  amount: string
  customAmount: string
  onAmountChange: (amount: string) => void
  onCustomAmountChange: (customAmount: string) => void
  onNext: () => void
}

export function StepAmount({
  amount,
  customAmount,
  onAmountChange,
  onCustomAmountChange,
  onNext,
}: StepAmountProps) {
  const presetAmounts = [500, 1000, 2500, 5000, 10000]
  const finalAmount = customAmount ? parseInt(customAmount) : parseInt(amount)

  const handlePresetClick = (amt: number) => {
    onAmountChange(amt.toString())
    onCustomAmountChange('')
  }

  const handleNext = () => {
    if (!finalAmount) {
      alert('Please select or enter an amount')
      return
    }
    onNext()
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 border border-border/50 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">How much would you like to donate?</h1>
        <p className="text-lg text-foreground/60">Every contribution makes a real difference</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {presetAmounts.map(amt => (
          <button
            key={amt}
            onClick={() => handlePresetClick(amt)}
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
            onChange={(e) => onCustomAmountChange(e.target.value)}
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
  )
}