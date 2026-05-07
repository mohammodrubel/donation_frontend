'use client'

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function TermsPage() {
  const { t, tArr } = useTranslation()
  const s2Items = tArr<string>('terms.s2Items')

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-bold text-foreground mb-8">{t('terms.title')}</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/70">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s1Title')}</h2>
              <p>{t('terms.s1Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s2Title')}</h2>
              <p>{t('terms.s2Body')}</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                {s2Items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s3Title')}</h2>
              <p>{t('terms.s3Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s4Title')}</h2>
              <p>{t('terms.s4Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s5Title')}</h2>
              <p>{t('terms.s5Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s6Title')}</h2>
              <p>{t('terms.s6Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s7Title')}</h2>
              <p>{t('terms.s7Body')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('terms.s8Title')}</h2>
              <p>{t('terms.s8Body')}</p>
            </section>

            <p className="text-sm text-foreground/50 pt-8">{t('terms.lastUpdated')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
