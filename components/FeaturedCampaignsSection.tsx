
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useGetCampaignsQuery } from '@/lib/reudx/fetchers/campain/campainApi';
import { CampaignCard } from './CampaignCard';
import { Campaign } from '@/lib/types';
import { useTranslation } from '@/lib/i18n/useTranslation';



export function FeaturedCampaigns() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useGetCampaignsQuery(undefined);
  const campaigns = data?.data || [];

  if (error) {
    return (
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 mb-4">{t('featured.failedToLoad')}</p>
          <Button onClick={() => window.location.reload()}>{t('common.tryAgain')}</Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {t('featured.title')}
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl">
            {t('featured.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {
            campaigns?.map((item:Campaign)=> <CampaignCard key={item.id} campaign={item} categoryLabel='Fetchers'/>)
          }
        </div>

        {!isLoading && campaigns.length > 0 && (
          <div className="mt-12 text-center">
            <Button asChild size="lg" variant="default" className="shadow-lg hover:shadow-xl">
              <Link href="/campaigns">
                {t('featured.viewAll', { count: campaigns.length })}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
