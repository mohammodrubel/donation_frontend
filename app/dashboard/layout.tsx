'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector, useDispatch } from 'react-redux'
import {
  Heart,
  Menu,
  X,
  LogOut,
  User,
  Bell,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { adminSidebarItems, userSidebarItems } from '@/components/sidebar/sidebar'
// Import your logout action (if you have one)
// import { logout } from '@/store/authSlice'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  // Get user from Redux store
  const user = useSelector((state: any) => state?.auth?.user)
  const role = user?.role === 'ADMIN' ? 'ADMIN' : 'USER'

  // Choose correct sidebar based on role
  const sidebarItems = role === 'ADMIN' ? adminSidebarItems : userSidebarItems

  const handleLogout = () => {
    // Clear app-specific data
    localStorage.removeItem('token') // adjust to your actual key
    // Dispatch logout action to clear Redux state
    // dispatch(logout())
    router.push('/auth')
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
                {role === 'ADMIN' ? 'Admin Panel' : 'Donor Dashboard'}
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

        {/* Footer - Logout */}
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

      {/* Main content area */}
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
                {role === 'ADMIN'
                  ? 'Manage donations & campaigns'
                  : 'Track your donations & activity'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative rounded-xl p-2 hover:bg-muted transition">
              <Bell className="size-5 text-muted-foreground" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
            </button>

            {/* User Profile Button */}
            <button className="flex items-center gap-2 rounded-xl border px-3 py-2 hover:bg-muted transition">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="size-4 text-primary" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium leading-none">
                  {user?.name || (role === 'ADMIN' ? 'Admin User' : 'John Doe')}
                </p>
                <p className="text-xs text-muted-foreground capitalize">
                  {role.toLowerCase()}
                </p>
              </div>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}