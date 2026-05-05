'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

interface Step {
  step?: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface HowItWorksSectionProps {
  steps?: Step[];
}

export function HowItWorksSection({ steps: stepsProp }: HowItWorksSectionProps) {
  const { t, tArr } = useTranslation();
  const steps = stepsProp ?? tArr<Step>('howItWorks.steps');

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{t('howItWorks.title')}</h2>
          <p className="text-lg text-foreground/60">{t('howItWorks.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-8 rounded-2xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center mb-4 text-2xl">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-primary mb-2">{t('howItWorks.stepLabel')} {step.step ?? index + 1}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-foreground/60 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-16 -right-6 text-primary/30">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
