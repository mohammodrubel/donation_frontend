'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Gift, Heart, Bell, ArrowUpRight, ArrowDownLeft } from 'lucide-react'
import Link from 'next/link'

export default function DashboardOverview() {
  const stats = [
    {
      label: 'Total Donated',
      value: '$12,450',
      icon: TrendingUp,
      color: 'primary',
      change: '+2,450 this month',
    },
    {
      label: 'Active Campaigns',
      value: '3',
      icon: Heart,
      color: 'accent',
      change: '1 new this week',
    },
    {
      label: 'Item Donations',
      value: '24',
      icon: Gift,
      color: 'secondary',
      change: '8 pending pickup',
    },
    {
      label: 'Notifications',
      value: '5',
      icon: Bell,
      color: 'primary',
      change: '2 unread',
    },
  ]

  const recentDonations = [
    {
      id: 1,
      campaign: 'Emergency Medical Fund',
      amount: '$500',
      date: 'Today',
      status: 'Confirmed',
    },
    {
      id: 2,
      campaign: 'Education Support',
      amount: '$250',
      date: '2 days ago',
      status: 'Confirmed',
    },
    {
      id: 3,
      campaign: 'Disaster Relief',
      amount: '$1000',
      date: '1 week ago',
      status: 'Confirmed',
    },
  ]

  const myItems = [
    {
      id: 1,
      item: 'Clothing Bundle',
      quantity: 15,
      status: 'Pending Pickup',
      statusColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      id: 2,
      item: 'Books (Educational)',
      quantity: 8,
      status: 'Collected',
      statusColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 3,
      item: 'Kitchen Items',
      quantity: 12,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back, John!</h1>
          <p className="text-muted-foreground mt-2">Here&apos;s your donation impact overview</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/donations">
            <Button variant="outline">Donate Money</Button>
          </Link>
          <Link href="/dashboard/items">
            <Button className="bg-primary hover:bg-primary/90">Donate Items</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const StatIcon = stat.icon
          return (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}/10`}>
                  <StatIcon className={`w-6 h-6 text-${stat.color}`} />
                </div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Donations */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-foreground">Recent Donations</h2>
              <Link href="/dashboard/donations">
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Heart className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{donation.campaign}</p>
                      <p className="text-sm text-muted-foreground">{donation.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">{donation.amount}</p>
                    <p className="text-xs text-green-600">{donation.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <Card className="p-6 h-full">
            <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link href="/dashboard/donations">
                <Button variant="outline" className="w-full justify-start text-left">
                  <ArrowDownLeft className="w-4 h-4 mr-2" />
                  Donate Money
                </Button>
              </Link>
              <Link href="/dashboard/items">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Gift className="w-4 h-4 mr-2" />
                  Donate Items
                </Button>
              </Link>
              <Link href="/dashboard/create-campaign">
                <Button variant="outline" className="w-full justify-start text-left">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Create Campaign
                </Button>
              </Link>
              <Link href="/dashboard/notifications">
                <Button variant="outline" className="w-full justify-start text-left">
                  <Bell className="w-4 h-4 mr-2" />
                  Check Notifications
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* My Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">My Item Donations</h2>
          <Link href="/dashboard/items">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Item</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {myItems.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 text-foreground font-medium">{item.item}</td>
                  <td className="py-4 px-4 text-muted-foreground">{item.quantity} items</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
