import {
  Home,
  TrendingUp,
  Package,
  Image,
  Megaphone,
  Heart,
  Bell,
  Settings,
  User,
  HandHeart,
  Receipt,
} from 'lucide-react'

export interface SidebarItem {
  icon: any
  label: string
  href: string
}

// Admin sidebar items
export const adminSidebarItems: SidebarItem[] = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: TrendingUp, label: 'Money Donations', href: '/dashboard/admin/donations' },
  { icon: Package, label: 'Item Donations', href: '/dashboard/admin/items' },
  { icon: Image, label: 'Banner', href: '/dashboard/admin/banner' },
  { icon: Megaphone, label: 'My Campaigns', href: '/dashboard/admin/campaigns' },
  { icon: Bell, label: 'Notifications', href: '/dashboard/admin/notifications' },
  { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
]

// User (donor) sidebar items
export const userSidebarItems: SidebarItem[] = [
  { icon: Home, label: 'Overview', href: '/dashboard' },
  { icon: HandHeart, label: 'My Donations Item', href: '/dashboard/user/my-donations' },
  { icon: Receipt, label: 'Donations History', href: '/dashboard/user/payment-history' },
  { icon: Bell, label: 'Profile', href: '/dashboard/user/profile' },
]