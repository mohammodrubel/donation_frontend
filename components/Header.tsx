'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [animateHeader, setAnimateHeader] = useState(false)

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
            <div className="text-3xl font-extrabold tracking-tight">
              Give<span className="text-primary">Hope</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/campaigns" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              Campaigns
            </Link>
            <Link href="/donate-items" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              Donate Items
            </Link>
            <Link href="/donate-money" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              Donate Money
            </Link>
            <Link href="/fundraiser" className="px-4 py-2 text-foreground/70 hover:text-primary font-medium transition-colors">
              Start Fundraiser
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild><Link href="/auth">Sign In</Link></Button>
            <Button asChild className="bg-primary hover:bg-primary/90"><Link href="/donate-money">Donate Now</Link></Button>
          </div>

          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-border/40 space-y-1 animate-in slide-in-from-top-2">
            {/* ... mobile nav items (unchanged) ... */}
            <Link href="/campaigns" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              Campaigns
            </Link>
            <Link href="/donate-items" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              Donate Items
            </Link>
            <Link href="/donate-money" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              Donate Money
            </Link>
            <Link href="/fundraiser" className="block px-4 py-3 text-foreground/80 hover:bg-primary/5 rounded-lg transition-colors font-medium">
              Start Fundraiser
            </Link>
            <div className="px-4 py-3 space-y-2 border-t border-border/40 mt-2 pt-3">
              <Button variant="outline" asChild className="w-full"><Link href="/auth">Sign In</Link></Button>
              <Button asChild className="w-full bg-primary hover:bg-primary/90"><Link href="/donate-money">Donate Now</Link></Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}