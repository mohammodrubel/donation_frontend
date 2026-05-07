'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, CheckCircle, Users, TrendingUp } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { useTranslation } from '@/lib/i18n/useTranslation'

const BENEFIT_ICONS = [CheckCircle, Users, TrendingUp, Heart]

type Step = { title: string; description: string }
type Benefit = { title: string; description: string }
type Success = { value: string; description: string; note: string }

export default function FundraiserPage() {
  const { t, tArr } = useTranslation()
  const steps = tArr<Step>('fundraiserPage.steps')
  const benefits = tArr<Benefit>('fundraiserPage.benefits')
  const successItems = tArr<Success>('fundraiserPage.successItems')

  return (
    <>
      <Header />
      <main className="bg-white">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">{t('fundraiserPage.heroBadge')}</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
              {t('fundraiserPage.heroTitle')}
            </h1>
            <p className="text-xl text-foreground/70 leading-relaxed mb-8">
              {t('fundraiserPage.heroDescription')}
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
              <Link href="/campaigns">{t('fundraiserPage.startBtn')}</Link>
            </Button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-12">{t('fundraiserPage.stepsTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  {idx + 1}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-12">{t('fundraiserPage.benefitsTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = BENEFIT_ICONS[idx] ?? Heart
              return (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-foreground/70">{benefit.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50">
          <h2 className="text-4xl font-bold text-foreground mb-12">{t('fundraiserPage.successTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {successItems.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-all">
                <p className="text-4xl font-bold text-primary mb-2">{item.value}</p>
                <p className="text-foreground/70 mb-4">{item.description}</p>
                <p className="text-sm text-foreground/60">{item.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 border-t border-border/50 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">{t('fundraiserPage.ctaTitle')}</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">{t('fundraiserPage.ctaDescription')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-lg">
              <Link href="/campaigns">{t('fundraiserPage.startBtn')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-lg">
              <Link href="/about">{t('fundraiserPage.learnMoreBtn')}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
