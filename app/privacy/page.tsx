'use client'

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { useTranslation } from "@/lib/i18n/useTranslation"

export default function PrivacyPage() {
  const { t, tArr } = useTranslation()
  const personalDataItems = tArr<string>('privacy.personalDataItems')
  const useItems = tArr<string>('privacy.useItems')

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-4xl font-bold text-foreground mb-8">{t('privacy.title')}</h1>

          <div className="prose prose-sm max-w-none space-y-8 text-foreground/70">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.introTitle')}</h2>
              <p>{t('privacy.introBody')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.collectionTitle')}</h2>
              <p>{t('privacy.collectionBody')}</p>

              <h3 className="text-xl font-bold text-foreground mt-4 mb-2">{t('privacy.typesTitle')}</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>{t('privacy.personalDataLabel')}:</strong> {t('privacy.personalDataIntro')}
                  <ul className="list-disc list-inside ml-4 mt-2">
                    {personalDataItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>{t('privacy.usageDataLabel')}:</strong> {t('privacy.usageDataBody')}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.useTitle')}</h2>
              <p>{t('privacy.useIntro')}</p>
              <ul className="list-disc list-inside space-y-2">
                {useItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.securityTitle')}</h2>
              <p>{t('privacy.securityBody')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.linksTitle')}</h2>
              <p>{t('privacy.linksBody')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.changesTitle')}</h2>
              <p>{t('privacy.changesBody')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">{t('privacy.contactTitle')}</h2>
              <p>{t('privacy.contactBody')}</p>
            </section>

            <p className="text-sm text-foreground/50 pt-8">{t('privacy.lastUpdated')}</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
