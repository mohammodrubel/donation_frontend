'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, Search, MoreVertical, UserCheck, UserX, Mail } from 'lucide-react'

export default function AdminUsersPage() {
  const users = [
    {
      id: 1,
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      role: 'Donor',
      donations: '$5,230',
      joined: '2024-01-15',
      status: 'Active',
      verified: true,
    },
    {
      id: 2,
      name: 'Ahmed Khan',
      email: 'ahmed@example.com',
      role: 'Fundraiser',
      donations: '$0',
      joined: '2024-02-20',
      status: 'Active',
      verified: true,
    },
    {
      id: 3,
      name: 'Fatima Hassan',
      email: 'fatima@example.com',
      role: 'Volunteer',
      donations: '$1,200',
      joined: '2024-03-10',
      status: 'Pending Verification',
      verified: false,
    },
    {
      id: 4,
      name: 'Raj Patel',
      email: 'raj@example.com',
      role: 'Donor',
      donations: '$8,500',
      joined: '2024-03-15',
      status: 'Suspended',
      verified: true,
    },
    {
      id: 5,
      name: 'Maria Santos',
      email: 'maria@example.com',
      role: 'Fundraiser',
      donations: '$15,000',
      joined: '2024-04-01',
      status: 'Active',
      verified: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <p className="text-muted-foreground mt-2">Manage and verify user accounts</p>
      </div>

      {/* User Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Users</p>
          <p className="text-3xl font-bold text-primary">5,890</p>
          <p className="text-xs text-muted-foreground mt-2">Registered</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Active Users</p>
          <p className="text-3xl font-bold text-primary">5,234</p>
          <p className="text-xs text-muted-foreground mt-2">Currently active</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Pending Verification</p>
          <p className="text-3xl font-bold text-accent">456</p>
          <p className="text-xs text-muted-foreground mt-2">Awaiting action</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Suspended</p>
          <p className="text-3xl font-bold text-destructive">200</p>
          <p className="text-xs text-muted-foreground mt-2">Violations</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground">
              <option>All Roles</option>
              <option>Donor</option>
              <option>Fundraiser</option>
              <option>Volunteer</option>
            </select>
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Role</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Donations</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Joined</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-semibold text-foreground">{user.name}</p>
                      {!user.verified && (
                        <p className="text-xs text-yellow-600">Not verified</p>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.email}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.role}</td>
                  <td className="py-4 px-4 text-primary font-semibold">{user.donations}</td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{user.joined}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : user.status === 'Pending Verification'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-primary hover:bg-primary/10">
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-muted-foreground hover:bg-muted">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
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
