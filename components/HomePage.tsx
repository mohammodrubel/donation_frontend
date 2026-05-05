'use client';

import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { FeaturedCampaigns } from './FeaturedCampaignsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PartnersSection } from './PartnersSection';
import { FinalCTASection } from './FinalCTASection';
import CharitySection from './charity';


export function HomePage() {
  return (
    <main className="bg-white">
      <HeroSection />
      <StatsSection />
      <FeaturedCampaigns />
      <HowItWorksSection />
      <TestimonialsSection />
      <CharitySection />
      <PartnersSection />
      <FinalCTASection />
    </main>
  );
}
