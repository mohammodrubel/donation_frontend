'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, HelpCircle, MessageCircle, Search, Sparkles, X } from 'lucide-react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTranslation } from '@/lib/i18n/useTranslation'

type FaqCategory = { id: string; name: string }
type FaqItem = { category: string; question: string; answer: string }

export default function FaqPage() {
  const { t, tArr } = useTranslation()
  const categories = tArr<FaqCategory>('faq.categories')
  const items = tArr<FaqItem>('faq.items')

  const [activeCategory, setActiveCategory] = useState<string>('')
  const [query, setQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((item) => {
      const matchesCategory = !activeCategory || item.category === activeCategory
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [items, activeCategory, query])

  const countByCategory = useMemo(() => {
    const map: Record<string, number> = {}
    for (const item of items) map[item.category] = (map[item.category] ?? 0) + 1
    return map
  }, [items])

  const handleToggle = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx))
  }

  const clearSearch = () => {
    setQuery('')
    setActiveCategory('')
  }

  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-gray-50 via-white to-white">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
          <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:36px_36px]" aria-hidden />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-primary/20 text-sm font-semibold text-primary mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {t('faq.heroBadge')}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
                {t('faq.heroTitle')}
              </h1>
              <p className="mt-5 text-lg text-foreground/70">{t('faq.heroSubtitle')}</p>

              {/* Search */}
              <div className="relative mt-8 max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t('faq.searchPlaceholder')}
                  className="pl-11 pr-11 h-12 rounded-full bg-white shadow-sm border-gray-200 focus:ring-primary/20"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label={t('common.clear')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Categories + List */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid lg:grid-cols-[260px_1fr] gap-8">
            {/* Categories */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible -mx-4 px-4 lg:mx-0 lg:px-0 pb-2 lg:pb-0">
                <button
                  type="button"
                  onClick={() => setActiveCategory('')}
                  className={`shrink-0 lg:w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    activeCategory === ''
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-white text-foreground/80 border-gray-200 hover:border-primary/40 hover:bg-primary/5'
                  }`}
                >
                  <span className="font-medium">{t('faq.allCategoriesLabel')}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    activeCategory === '' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {items.length}
                  </span>
                </button>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id
                  const count = countByCategory[cat.id] ?? 0
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 lg:w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-white text-foreground/80 border-gray-200 hover:border-primary/40 hover:bg-primary/5'
                      }`}
                    >
                      <span className="font-medium">{cat.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </aside>

            {/* Questions */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-foreground/60">
                  {t('faq.questionsCount', { count: filteredItems.length })}
                </p>
                {(query || activeCategory) && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {t('faq.clearBtn')}
                  </button>
                )}
              </div>

              {filteredItems.length > 0 ? (
                <ul className="space-y-3">
                  {filteredItems.map((item, idx) => {
                    const isOpen = openIndex === idx
                    return (
                      <li
                        key={`${item.category}-${idx}`}
                        className={`rounded-2xl border bg-white transition-all overflow-hidden ${
                          isOpen ? 'border-primary/40 shadow-md' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggle(idx)}
                          aria-expanded={isOpen}
                          className="w-full text-left px-5 sm:px-6 py-5 flex items-start justify-between gap-4"
                        >
                          <div className="flex items-start gap-3">
                            <span className={`mt-1 inline-flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${
                              isOpen ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                            }`}>
                              <HelpCircle className="w-4 h-4" />
                            </span>
                            <span className="font-semibold text-foreground text-base sm:text-lg leading-snug">
                              {item.question}
                            </span>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-foreground/60 shrink-0 mt-1.5 transition-transform ${
                              isOpen ? 'rotate-180 text-primary' : ''
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 sm:px-6 pb-6 pt-0 pl-16 text-foreground/70 leading-relaxed">
                              {item.answer}
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 rounded-full bg-gray-50 mx-auto flex items-center justify-center mb-4">
                    <Search className="w-7 h-7 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{t('faq.emptyTitle')}</h3>
                  <p className="text-foreground/60 mt-2 max-w-sm mx-auto">{t('faq.emptyDesc')}</p>
                  <Button onClick={clearSearch} variant="outline" className="mt-5 rounded-full">
                    {t('faq.clearBtn')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white p-8 sm:p-12 shadow-lg overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="absolute -left-10 -bottom-16 w-56 h-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-3 text-white/80">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium uppercase tracking-wide">{t('nav.support')}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold leading-tight">{t('faq.ctaTitle')}</h2>
                <p className="mt-3 text-white/85">{t('faq.ctaDescription')}</p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full font-semibold shadow-md"
              >
                <Link href="/contact">{t('faq.contactBtn')}</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
