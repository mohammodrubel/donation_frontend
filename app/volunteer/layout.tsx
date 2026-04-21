'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Heart, MapPin, Truck, CheckCircle, MessageSquare, Settings, Menu, X, LogOut } from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
  { icon: MapPin, label: 'Nearby Pickups', href: '/volunteer' },
  { icon: Truck, label: 'My Tasks', href: '/volunteer/tasks' },
  { icon: CheckCircle, label: 'Completed', href: '/volunteer/completed' },
  { icon: MessageSquare, label: 'Messages', href: '/volunteer/messages' },
  { icon: Settings, label: 'Profile', href: '/volunteer/profile' },
]

export default function VolunteerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">DonateBridge</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Volunteer Badge */}
        <div className="px-6 py-3 bg-secondary/10 border-b border-border">
          <p className="text-xs font-semibold text-secondary uppercase">Volunteer</p>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold">
              Volunteer
            </div>
            <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
              <span className="text-sm font-semibold text-secondary">VL</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 md:p-8">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  )
}
