'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Heart, Users, TrendingUp, CheckCircle } from 'lucide-react';
import bannerImage from '@/assets/banner.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] sm:min-h-[700px] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
  );
}