'use client'

import { Heart, Users, TrendingUp, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTranslation } from '@/lib/i18n/useTranslation'

const VALUE_ICONS = [Heart, Shield, Users, TrendingUp]

type ValueItem = { title: string; description: string }
type ImpactItem = { value: string; label: string }

export default function AboutPage() {
  const { t, tArr } = useTranslation()
  const values = tArr<ValueItem>('about.values')
  const impactItems = tArr<ImpactItem>('about.impactItems')

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed">{t('about.heroDescription')}</p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-12">{t('about.valuesTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = VALUE_ICONS[idx] ?? Heart
              return (
                <div key={idx} className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                  <p className="text-foreground/70">{value.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-12">{t('about.impactTitle')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {impactItems.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-primary mb-2">{item.value}</p>
                <p className="text-foreground/70">{item.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">{t('about.ctaTitle')}</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">{t('about.ctaDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg">
              <Link href="/donate-money">{t('about.donateBtn')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <Link href="/campaigns">{t('about.viewCampaignsBtn')}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
