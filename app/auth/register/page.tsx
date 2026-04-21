'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Heart, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'donor',
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
          {/* Progress */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-colors ${
                  step >= s ? 'bg-primary' : 'bg-border'
                }`}
              ></div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
                <p className="text-muted-foreground">Join our community of givers</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+880 1234 567890"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-base" onClick={() => setStep(2)}>
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">Set Password</h1>
                <p className="text-muted-foreground">Create a strong password</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <p className="text-xs text-muted-foreground mt-2">At least 8 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground">
                    <strong>Password must include:</strong> 8+ characters, 1 uppercase, 1 number
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => setStep(3)}>
                  Continue <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-foreground mb-2">Choose Your Role</h1>
                <p className="text-muted-foreground">How do you want to help?</p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    value: 'donor',
                    label: '💝 Donor',
                    desc: 'Make financial or item donations',
                  },
                  {
                    value: 'fundraiser',
                    label: '📢 Fundraiser',
                    desc: 'Create campaigns for your cause',
                  },
                  {
                    value: 'volunteer',
                    label: '👥 Volunteer',
                    desc: 'Help with pickups and deliveries',
                  },
                ].map((role) => (
                  <label
                    key={role.value}
                    className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role.value}
                      checked={formData.role === role.value}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <div className="ml-3 flex-1">
                      <p className="font-semibold text-foreground">{role.label}</p>
                      <p className="text-sm text-muted-foreground">{role.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="agree" className="rounded" />
                <label htmlFor="agree" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90 gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Create Account
                </Button>
              </div>
            </>
          )}

          {/* Sign In Link */}
          <p className="text-center text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
