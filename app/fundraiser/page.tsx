import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, CheckCircle, Users, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Start a Fundraiser - DonateBridge',
  description: 'Create your own campaign on DonateBridge and start raising funds for your cause.',
}

export default function FundraiserPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Start Fundraising Today</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
            Start Your Campaign and Make an Impact
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed mb-8">
            Have a cause you believe in? Create a fundraiser on DonateBridge and connect with thousands of compassionate donors ready to help.
          </p>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
            <Link href="/campaigns">Start Fundraiser</Link>
          </Button>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-4xl font-bold text-foreground mb-12">3 Simple Steps</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              1
            </div>
            <h3 className="text-2xl font-bold text-foreground">Create Your Story</h3>
            <p className="text-foreground/70">Tell us about your cause. Upload a compelling story with photos and videos to connect with donors emotionally.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              2
            </div>
            <h3 className="text-2xl font-bold text-foreground">Set Your Goal</h3>
            <p className="text-foreground/70">Define your fundraising goal and timeline. We help you reach the right audience with your cause.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              3
            </div>
            <h3 className="text-2xl font-bold text-foreground">Track & Share</h3>
            <p className="text-foreground/70">Monitor your progress in real-time and share updates with your supporters. Celebrate milestones together.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-4xl font-bold text-foreground mb-12">Why Choose DonateBridge?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Verified & Trusted</h3>
              <p className="text-foreground/70">Our verification process ensures donors trust your campaign. Build credibility from day one.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Reach 45,000+ Donors</h3>
              <p className="text-foreground/70">Access our community of compassionate donors actively looking to help causes like yours.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Transparent Progress</h3>
              <p className="text-foreground/70">Real-time updates and detailed tracking keep your supporters engaged and informed.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Community Support</h3>
              <p className="text-foreground/70">Our team is here to help at every step. From launch to completion, we support your success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
        <h2 className="text-4xl font-bold text-foreground mb-12">Success Stories</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-primary mb-2">৳50L+</p>
            <p className="text-foreground/70 mb-4">Medical Emergency Campaign raised over ৳50 lakhs in 3 months</p>
            <p className="text-sm text-foreground/60">Success Rate: 98%</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-primary mb-2">10K+</p>
            <p className="text-foreground/70 mb-4">Education Campaign connected with 10,000+ supporters</p>
            <p className="text-sm text-foreground/60">Avg. Donation: ৳5,000</p>
          </div>
          <div className="p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all">
            <p className="text-4xl font-bold text-primary mb-2">48hrs</p>
            <p className="text-foreground/70 mb-4">Disaster Relief Campaign raised goal amount in just 2 days</p>
            <p className="text-sm text-foreground/60">12K Supporters</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Make a Difference?</h2>
        <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
          Your story matters. Start a campaign today and connect with people who want to help.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg">
            <Link href="/campaigns">Start Fundraiser</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
