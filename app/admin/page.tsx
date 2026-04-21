'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Gift, DollarSign, Eye, Activity, ArrowUpRight } from 'lucide-react'

export default function AdminOverview() {
  const stats = [
    {
      label: 'Total Revenue',
      value: '$45,230',
      change: '+12.5%',
      icon: DollarSign,
      color: 'primary',
    },
    {
      label: 'Total Donations',
      value: '1,234',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'secondary',
    },
    {
      label: 'Total Users',
      value: '5,890',
      change: '+23.1%',
      icon: Users,
      color: 'accent',
    },
    {
      label: 'Active Campaigns',
      value: '87',
      change: '+5.4%',
      icon: Gift,
      color: 'primary',
    },
  ]

  const recentUsers = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      role: 'Donor',
      joined: '2024-04-15',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      role: 'Fundraiser',
      joined: '2024-04-14',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      role: 'Volunteer',
      joined: '2024-04-13',
      status: 'Pending Verification',
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      user: 'John Doe',
      amount: '$500',
      campaign: 'Medical Emergency Fund',
      date: '2024-04-15',
      status: 'Completed',
    },
    {
      id: 2,
      user: 'Jane Smith',
      amount: '$250',
      campaign: 'Education Support',
      date: '2024-04-15',
      status: 'Completed',
    },
    {
      id: 3,
      user: 'Ali Hassan',
      amount: '$1000',
      campaign: 'Disaster Relief',
      date: '2024-04-14',
      status: 'Pending Verification',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Platform overview and key metrics</p>
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
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Platform Activity</h2>
          <div className="space-y-4">
            {[
              { label: 'New Users', value: 234, trend: '+15%' },
              { label: 'Donations Processed', value: 1234, trend: '+8%' },
              { label: 'Items Collected', value: 567, trend: '+12%' },
              { label: 'Campaigns Created', value: 45, trend: '+5%' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">{item.value}</p>
                  <p className="text-xs text-green-600">{item.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* System Health */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">System Health</h2>
          <div className="space-y-4">
            {[
              { label: 'API Response', value: '98ms', status: 'good' },
              { label: 'Database', value: 'Healthy', status: 'good' },
              { label: 'Server Load', value: '45%', status: 'good' },
              { label: 'Uptime', value: '99.9%', status: 'good' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-sm text-foreground font-semibold">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-primary hover:bg-primary/90">
              <Eye className="w-4 h-4 mr-2" />
              View All Users
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Review Campaigns
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Activity className="w-4 h-4 mr-2" />
              View Reports
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Gift className="w-4 h-4 mr-2" />
              Manage Pickups
            </Button>
          </div>
        </Card>
      </div>

      {/* Recent Users */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Recent Users</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">{user.name}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.email}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.role}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.joined}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-foreground">Recent Transactions</h2>
          <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">User</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Campaign</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((trans) => (
                <tr key={trans.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4 font-semibold text-foreground">{trans.user}</td>
                  <td className="py-4 px-4 text-primary font-bold">{trans.amount}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{trans.campaign}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{trans.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      trans.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {trans.status}
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
