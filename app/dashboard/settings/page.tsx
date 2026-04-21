'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { User, Bell, Lock, Shield, Download, LogOut } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'account', label: 'Account', icon: Lock },
  ]

  const [notificationSettings, setNotificationSettings] = useState({
    donationReceipts: true,
    campaignUpdates: true,
    pickupReminders: true,
    communityNews: false,
    monthlyReport: true,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-2">
              {settingsTabs.map((tab) => {
                const TabIcon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    <TabIcon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Profile Settings</h2>
              </div>

              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-2xl font-bold">
                  JD
                </div>
                <div>
                  <Button className="bg-primary hover:bg-primary/90">Change Photo</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG max 5MB</p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4 border-t border-border pt-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                  <Input defaultValue="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <Input type="email" defaultValue="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                  <Input type="tel" defaultValue="+880 1234 567890" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                  <Input defaultValue="123 Main Street, Dhaka, Bangladesh" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                    rows={4}
                    defaultValue="Passionate about helping others and making a difference in the community."
                  ></textarea>
                </div>
              </div>

              <Button className="bg-primary hover:bg-primary/90">Save Changes</Button>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Notification Preferences</h2>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                {[
                  {
                    key: 'donationReceipts',
                    label: 'Donation Receipts',
                    desc: 'Get notified when you make a donation',
                  },
                  {
                    key: 'campaignUpdates',
                    label: 'Campaign Updates',
                    desc: 'Updates on campaigns you support',
                  },
                  {
                    key: 'pickupReminders',
                    label: 'Pickup Reminders',
                    desc: 'Reminders for scheduled item pickups',
                  },
                  {
                    key: 'communityNews',
                    label: 'Community News',
                    desc: 'Latest news and stories from the community',
                  },
                  {
                    key: 'monthlyReport',
                    label: 'Monthly Impact Report',
                    desc: 'Your monthly donation summary',
                  },
                ].map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">{setting.label}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                    <Switch
                      checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          [setting.key]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button className="bg-primary hover:bg-primary/90">Save Preferences</Button>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Privacy & Security</h2>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Make your profile public or private</p>
                    </div>
                    <select className="px-3 py-1 border border-border rounded-lg bg-background text-foreground">
                      <option>Public</option>
                      <option>Private</option>
                    </select>
                  </div>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold text-foreground mb-3">Active Sessions</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Chrome on Windows • Last active now</span>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Safari on iPhone • Last active 2 hours ago</span>
                      <Button variant="ghost" size="sm">Revoke</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'account' && (
            <Card className="p-8 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Account Settings</h2>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Change Password</p>
                  <Button variant="outline" size="sm">Update Password</Button>
                </div>

                <div className="p-4 border border-border rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Download Your Data</p>
                  <p className="text-sm text-muted-foreground mb-3">Get a copy of all your data</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>

                <div className="p-4 border border-border rounded-lg bg-destructive/5">
                  <p className="font-semibold text-destructive mb-2">Danger Zone</p>
                  <p className="text-sm text-muted-foreground mb-3">Delete your account permanently</p>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <Button variant="outline" className="gap-2 text-destructive hover:bg-destructive/10">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
