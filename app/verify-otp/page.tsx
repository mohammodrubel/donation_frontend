'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [verified, setVerified] = useState(false)

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl">DonateBridge</span>
        </div>

        {/* Card */}
        <Card className="p-8 space-y-6">
          {!verified ? (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Verify Email</h1>
                <p className="text-muted-foreground">We sent a 6-digit code to john@example.com</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-foreground">Verification Code</label>
                <div className="flex gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="flex-1 text-center text-2xl font-bold border-2 border-border rounded-lg bg-background text-foreground focus:border-primary focus:outline-none py-3"
                      placeholder="-"
                    />
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/90 text-base"
                onClick={() => setVerified(true)}
              >
                Verify <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">Didn&apos;t receive the code?</p>
                <button className="text-primary hover:underline font-semibold text-sm">
                  Resend in 30s
                </button>
              </div>

              <p className="text-center text-muted-foreground text-sm">
                Wrong email?{' '}
                <Link href="/auth/register" className="text-primary hover:underline">
                  Go back
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Verified!</h1>
                <p className="text-muted-foreground">Your email has been verified successfully</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ✓ Your account is now fully verified. You can start donating and making a difference!
                </p>
              </div>

              <Link href="/dashboard">
                <Button className="w-full bg-primary hover:bg-primary/90 text-base">
                  Go to Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
