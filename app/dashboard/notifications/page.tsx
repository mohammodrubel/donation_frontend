'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Gift, TrendingUp, Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react'

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: 'donation',
      title: 'New Donation Received',
      message: 'You received $500 from Sarah Ahmed for Medical Emergency Fund',
      time: '2 minutes ago',
      read: false,
      icon: Heart,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      id: 2,
      type: 'pickup',
      title: 'Pickup Scheduled',
      message: 'Your item donation pickup is scheduled for tomorrow at 2:00 PM',
      time: '1 hour ago',
      read: false,
      icon: Gift,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      id: 3,
      type: 'campaign',
      title: 'Campaign Update',
      message: 'Your Medical Fund campaign has reached 45% of its goal!',
      time: '3 hours ago',
      read: true,
      icon: TrendingUp,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      id: 4,
      type: 'system',
      title: 'Important: Verify Your Account',
      message: 'Please verify your email to ensure you receive all important updates',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'Pickup team sent you a new message about your scheduled pickup',
      time: '2 days ago',
      read: true,
      icon: Bell,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Achievement Unlocked',
      message: 'You&apos;ve donated to 5 different campaigns! Keep it up!',
      time: '3 days ago',
      read: true,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      id: 7,
      type: 'info',
      title: 'Donation Receipt',
      message: 'Your tax receipt for Q1 donations is ready for download',
      time: '5 days ago',
      read: true,
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-2">Stay updated on your campaigns and donations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
          <Button variant="outline" size="sm">
            Clear all
          </Button>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Unread</p>
          <p className="text-3xl font-bold text-primary">{unreadCount}</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting your attention</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total</p>
          <p className="text-3xl font-bold text-primary">{notifications.length}</p>
          <p className="text-xs text-muted-foreground mt-2">All time</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Settings</p>
          <Button variant="outline" size="sm" className="mt-2">
            Manage Preferences
          </Button>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['All', 'Donations', 'Pickups', 'Campaigns', 'Messages'].map((filter) => (
          <Button
            key={filter}
            variant={filter === 'All' ? 'default' : 'outline'}
            size="sm"
            className={filter === 'All' ? 'bg-primary hover:bg-primary/90' : ''}
          >
            {filter}
          </Button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => {
          const NotifIcon = notification.icon
          return (
            <Card
              key={notification.id}
              className={`p-4 hover:shadow-md transition-all cursor-pointer ${
                !notification.read ? 'bg-primary/5 border-primary/30' : ''
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 p-3 rounded-lg ${notification.bgColor}`}>
                  <NotifIcon className={`w-6 h-6 ${notification.color}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>

                {/* Actions */}
                <div className="flex-shrink-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
