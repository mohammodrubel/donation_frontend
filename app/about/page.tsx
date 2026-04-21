import { Heart, Users, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'About DonateBridge - Our Mission',
  description: 'Learn about DonateBridge, our mission to connect donors with verified causes, and how we\'re making a difference.',
}

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Our Mission: Connecting Compassion with Action
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed">
            DonateBridge exists to create a transparent, efficient platform where generous donors can connect directly with verified campaigns and make a real, measurable impact in their communities.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-4xl font-bold text-foreground mb-12">Our Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Compassion First</h3>
            <p className="text-foreground/70">We believe in the power of human kindness and the impact of generosity.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">100% Transparent</h3>
            <p className="text-foreground/70">Every donation is tracked, and donors see exactly how their contribution helps.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Community Driven</h3>
            <p className="text-foreground/70">We empower individuals and organizations to create positive change together.</p>
          </div>
          <div className="space-y-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Impact Focused</h3>
            <p className="text-foreground/70">We measure success by the real, measurable difference we make.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-4xl font-bold text-foreground mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">₳50Cr+</p>
            <p className="text-foreground/70">Total Funds Raised</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">45K+</p>
            <p className="text-foreground/70">Active Donors</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">250K+</p>
            <p className="text-foreground/70">Lives Impacted</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">124</p>
            <p className="text-foreground/70">Active Campaigns</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">Join Our Community</h2>
        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
          Be part of a movement that&apos;s transforming how people give and receive help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg">
            <Link href="/donate-money">Donate Now</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-lg">
            <Link href="/campaigns">View Campaigns</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
