'use client';

import { campaigns, testimonials, stats, howItWorks, campaignCategories, partners } from '@/lib/mockData';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturedCampaigns } from './FeaturedCampaignsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PartnersSection } from './PartnersSection';
import { FinalCTASection } from './FinalCTASection';


export function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <StatsSection stats={stats} />
      <FeaturedCampaigns campaigns={campaigns} categories={campaignCategories} />
      <HowItWorksSection steps={howItWorks} />
      <TestimonialsSection testimonials={testimonials} />
      <PartnersSection partners={partners} />
      <FinalCTASection />
    </main>
  );
}