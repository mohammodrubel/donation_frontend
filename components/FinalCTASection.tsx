'use client';

import { Button } from '@/components/ui/button';
import { Heart, Gift, Smile } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/useTranslation';

export function FinalCTASection() {
  const { t } = useTranslation();

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight text-foreground">
            {t('finalCTA.title')}
          </h2>
          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            {t('finalCTA.description')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-semibold h-12 px-8"
          >
            <Heart className="w-5 h-5 mr-2" />
            {t('finalCTA.donateMoney')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold h-12 px-8"
          >
            <Gift className="w-5 h-5 mr-2" />
            {t('finalCTA.donateItems')}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 rounded-lg font-semibold h-12 px-8"
          >
            <Smile className="w-5 h-5 mr-2" />
            {t('finalCTA.startFundraiser')}
          </Button>
        </div>

        <p className="text-sm text-foreground/60">
          {t('finalCTA.trust')}
        </p>
      </div>
    </section>
  );
}