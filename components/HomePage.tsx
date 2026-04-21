'use client';

import Link from 'next/link';
import Image from 'next/image';
import { campaigns, testimonials, stats, howItWorks, campaignCategories, partners } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Heart, Users, TrendingUp, ArrowRight, Star, CheckCircle, Gift, Smile } from 'lucide-react';
import { useState } from 'react';
import bannerImage from '../assets/banner.jpg'; // used in Hero

export function HomePage() {
  const featuredCampaigns = campaigns.slice(0, 3);
  const [hoveredCampaign, setHoveredCampaign] = useState<string | null>(null);

  return (
    <main className="bg-white">
      {/* Hero Section - fully implemented */}
      <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background gradient orbs (decorative) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                Verified Charity Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Bridge the Gap,
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {' '}Change Lives
                </span>
              </h1>
              <p className="text-lg text-foreground/70 max-w-xl mx-auto lg:mx-0">
                Join thousands of donors and fundraisers making a real impact. Donate money, items, or start your own campaign – 100% transparent.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/campaigns">Explore Campaigns</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <Link href="/start-fundraiser">Start Fundraising</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-foreground/60">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>500+ Campaigns</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-primary" />
                  <span>10k+ Donors</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>৳50L+ Raised</span>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={bannerImage}
                alt="People helping each other"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20"
              >
                <div className="flex justify-center mb-4">
                  {index === 0 && <Heart className="w-10 h-10 text-primary" />}
                  {index === 1 && <Smile className="w-10 h-10 text-secondary" />}
                  {index === 2 && <TrendingUp className="w-10 h-10 text-primary" />}
                  {index === 3 && <Users className="w-10 h-10 text-secondary" />}
                </div>
                <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-foreground/70 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Featured Campaigns</h2>
            <p className="text-lg text-foreground/60">Support urgent causes that need your help right now</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCampaigns.map((campaign) => {
              const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100;
              const categoryInfo = campaignCategories.find((c) => c.id === campaign.category);
              const isFeatured = campaign.tags.includes('urgent');

              return (
                <Link
                  key={campaign.id}
                  href={`/campaigns/${campaign.id}`}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
                  onMouseEnter={() => setHoveredCampaign(campaign.id)}
                  onMouseLeave={() => setHoveredCampaign(null)}
                >
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5">
                    {isFeatured && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        FEATURED
                      </div>
                    )}
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo?.color} ${categoryInfo?.textColor}`}
                      >
                        {categoryInfo?.name}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-semibold text-foreground">{campaign.donors}</span>
                      </div>
                    </div>

                    <h3 className="font-bold text-foreground line-clamp-2 text-lg group-hover:text-primary transition-colors">
                      {campaign.title}
                    </h3>

                    <p className="text-sm text-foreground/70 line-clamp-2">{campaign.description}</p>

                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-foreground">
                          ৳{(campaign.collectedAmount / 100000).toFixed(1)}L of ৳{(campaign.goalAmount / 100000).toFixed(1)}L
                        </span>
                        <span className="text-foreground/60 font-medium">{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(progressPercent, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                      <span className="text-foreground/60">{campaign.donors.toLocaleString()} donors</span>
                      <span className="text-primary font-semibold group-hover:gap-1 flex items-center transition-all">
                        Learn more <ArrowRight className="w-3 h-3 ml-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-lg px-8">
              <Link href="/campaigns" className="flex items-center gap-2">
                View All {campaigns.length} Campaigns <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-lg text-foreground/60">Simple, transparent, and impactful in four easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mb-4 text-2xl">
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-primary mb-2">STEP {step.step}</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
                </div>

                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:flex absolute top-16 -right-6 text-primary/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Success Stories</h2>
            <p className="text-lg text-foreground/60">Real people making a real difference through DonateBridge</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 text-base leading-relaxed mb-6 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-8">
            Trusted by leading organizations
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex items-center justify-center px-4 py-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <span className="text-sm font-medium text-foreground/70">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-secondary">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
              Start Your Journey to Impact
            </h2>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              Whether you have money or items to give, every contribution changes lives. Choose your way to donate
              and join thousands of compassionate supporters.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 rounded-lg font-semibold h-12 px-8"
            >
              <Link href="/donate-money" className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Donate Money
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-lg font-semibold h-12 px-8"
            >
              <Link href="/donate-items" className="flex items-center gap-2">
                <Gift className="w-5 h-5" />
                Donate Items
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 rounded-lg font-semibold h-12 px-8"
            >
              <Link href="/fundraiser" className="flex items-center gap-2">
                <Smile className="w-5 h-5" />
                Start Fundraiser
              </Link>
            </Button>
          </div>

          <p className="text-sm opacity-75">
            100% transparent • Verified campaigns • Secure payments • Real impact
          </p>
        </div>
      </section>
    </main>
  );
}