'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/lib/reudx/store'
import { logout } from '@/lib/reudx/fetchers/auth/authSlice'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animateHeader, setAnimateHeader] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state?.auth?.user)
  const { t } = useTranslation()

  const handleLogout = ()=>{
    dispatch(logout())
  }
  useEffect(() => {
    // Check if this is the first visit (sessionStorage = resets on tab close)
    const hasVisited = sessionStorage.getItem('hasSeenHeaderAnimation')
    if (!hasVisited) {
      // First time → trigger animation and store flag
      setAnimateHeader(true)
      sessionStorage.setItem('hasSeenHeaderAnimation', 'true')
    }
  }, [])

  const handleAnimationEnd = () => {
    setAnimateHeader(false) // remove animation class after it finishes
  }

  return (
    <header
      className={`
        sticky top-0 z-50 bg-white border-b border-border/40 shadow-sm
        ${animateHeader ? 'animate-in slide-in-from-top-3 duration-500' : ''}
      `}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* rest of your header content stays exactly the same */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="text-3xl  font-extrabold tracking-tight">
              DONAR
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/campaigns" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              {t('nav.campaigns')}
            </Link>
            <Link href="/fundraiser" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              {t('nav.startFundraiser')}
            </Link>
            <Link href="/contact" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              {t('nav.contactUs')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            {
              user ? <>
              <Button onClick={handleLogout} variant="outline" asChild><Link href="/#">{t('common.logout')}</Link></Button>
              <Button asChild className="bg-primary hover:bg-primary/90"><Link href="/dashboard">{t('common.dashboard')}</Link></Button>
              </>
              :
            <Button variant="outline" asChild><Link href="/auth">{t('common.signIn')}</Link></Button>}

          </div>

          <div className="md:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border/40 space-y-1 animate-in slide-in-from-top-2">
            <Link href="/campaigns" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              {t('nav.campaigns')}
            </Link>
            <Link href="/donate-money" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              {t('nav.donateMoney')}
            </Link>
            <Link href="/fundraiser" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              {t('nav.startFundraiser')}
            </Link>
            <div className="px-4 py-3 space-y-2 border-t border-border/40 mt-2 pt-3">
              {
                user ?
                <Button onClick={handleLogout} variant="outline" asChild className="w-full"><Link href="#">{t('common.logout')}</Link></Button>
                :
              <Button variant="outline" asChild className="w-full"><Link href="/auth">{t('common.signIn')}</Link></Button>}
              <Button asChild className="w-full bg-primary hover:bg-primary/90"><Link href="/donate-money">{t('common.donateNow')}</Link></Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
