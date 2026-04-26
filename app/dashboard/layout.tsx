'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Heart,
  Home,
  Gift,
  TrendingUp,
  Megaphone,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  MessageSquare,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: TrendingUp, label: 'Money Donations', href: '/dashboard/donations' },
  { icon: Gift, label: 'Item Donations', href: '/dashboard/items' },
  { icon: Gift, label: 'Banner', href: '/dashboard/banner' },
  { icon: Megaphone, label: 'My Campaigns', href: '/dashboard/campaigns' },
  { icon: Heart, label: 'Start Campaign', href: '/dashboard/create-campaign' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/notifications' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    router.push('/login')
  }

  return (
    <div className="h-screen bg-muted/30 flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-background border-r transition-transform duration-300 md:relative md:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="h-16 border-b px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
              <Heart className="size-5 text-primary-foreground fill-current" />
            </div>
            <div>
              <p className="font-bold leading-none">DonateBridge</p>
              <p className="text-xs text-muted-foreground">
                Donation Dashboard
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-140px)] px-4 py-5">
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all',
                    active
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4 bg-background">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start rounded-xl"
          >
            <LogOut className="mr-2 size-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b bg-background px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden"
            >
              <Menu className="size-6" />
            </button>

            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                Manage your donations & campaigns
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative rounded-xl p-2 hover:bg-muted transition">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
            </button>

            <button className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-muted transition">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="size-4 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground">Donor</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}