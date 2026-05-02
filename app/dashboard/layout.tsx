'use client'

import { useState, useEffect } from 'react'
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
import { logout } from '@/lib/reudx/fetchers/auth/authSlice'

// Adjust the path to your RootState type
// import { RootState } from '@/lib/reudx/store'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()

  // Get user and loading state from Redux
  const user = useSelector((state: any) => state?.auth?.user)
  // Replace 'isLoading' with your actual loading flag (e.g., state.auth.status === 'loading')
  const isLoading = useSelector((state: any) => state?.auth?.isLoading)

  const role = user?.role === 'ADMIN' ? 'ADMIN' : 'USER'
  const sidebarItems = role === 'ADMIN' ? adminSidebarItems : userSidebarItems

  // Auto-logout if no user exists after loading finishes
  useEffect(() => {
    if (!isLoading && !user) {
      dispatch(logout())
      router.push('/auth') // Redirect to your login page
    }
  }, [user, isLoading, dispatch, router])

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // If still no user after loading (the useEffect will redirect, but this prevents flash)
  if (!user) {
    return null
  }

  // --- Original layout continues here (unchanged) ---
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
            onClick={() => {
              dispatch(logout())
              router.push('/login')
            }}
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