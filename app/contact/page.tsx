'use client'

import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin } from 'lucide-react'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <>
      <Header />
      <main className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-6">{t('contact.title')}</h1>
              <p className="text-lg text-foreground/70 mb-8">{t('contact.description')}</p>

              <form className="space-y-6">
                <div>
                  <label className="block text-foreground font-semibold mb-2">{t('contact.formName')}</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none"
                    placeholder={t('contact.formNamePlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-2">{t('contact.formEmail')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none"
                    placeholder={t('contact.formEmailPlaceholder')}
                  />
                </div>
                <div>
                  <label className="block text-foreground font-semibold mb-2">{t('contact.formMessage')}</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none resize-none"
                    placeholder={t('contact.formMessagePlaceholder')}
                  />
                </div>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 rounded-lg h-12 font-semibold">
                  {t('contact.sendBtn')}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">{t('contact.infoTitle')}</h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('contact.emailLabel')}</h3>
                      <p className="text-foreground/70">{t('contact.emailLine1')}</p>
                      <p className="text-foreground/70">{t('contact.emailLine2')}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('contact.phoneLabel')}</h3>
                      <p className="text-foreground/70">{t('contact.phoneLine1')}</p>
                      <p className="text-foreground/70">{t('contact.phoneLine2')}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('contact.addressLabel')}</h3>
                      <p className="text-foreground/70">
                        {t('contact.addressLine1')}<br />
                        {t('contact.addressLine2')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20">
                <h3 className="text-xl font-bold text-foreground mb-4">{t('contact.quickHelpTitle')}</h3>
                <ul className="space-y-2 text-foreground/70">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('contact.quickHelp1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('contact.quickHelp2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{t('contact.quickHelp3')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
