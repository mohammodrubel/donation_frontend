'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Heart, Filter, Download, Eye } from 'lucide-react'
import { useState } from 'react'

export default function DonationsPage() {
  const [donations, setDonations] = useState([
    {
      id: 1,
      campaign: 'Emergency Medical Fund - Rashed Ali',
      amount: '$500',
      date: '2024-04-15',
      status: 'Confirmed',
      receipt: 'REC-001234',
      impact: 'Helped cover emergency surgery',
    },
    {
      id: 2,
      campaign: 'Education Support for Rural Children',
      amount: '$250',
      date: '2024-04-10',
      status: 'Confirmed',
      receipt: 'REC-001233',
      impact: 'Provided school supplies for 10 students',
    },
    {
      id: 3,
      campaign: 'Family Relief - Dhaka Flood Victims',
      amount: '$1000',
      date: '2024-03-28',
      status: 'Confirmed',
      receipt: 'REC-001232',
      impact: 'Assisted 5 families with essentials',
    },
    {
      id: 4,
      campaign: 'Medical Emergency Support',
      amount: '$350',
      date: '2024-03-15',
      status: 'Confirmed',
      receipt: 'REC-001231',
      impact: 'Funded medication and treatment',
    },
  ])

  const totalDonated = donations.reduce((sum, d) => sum + parseInt(d.amount.replace('$', '')), 0)
  const totalDonations = donations.length
  const confirmedDonations = donations.filter(d => d.status === 'Confirmed').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Money Donations</h1>
          <p className="text-muted-foreground mt-2">Track all your monetary contributions</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Heart className="w-4 h-4 mr-2" />
          Make a Donation
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Donated</p>
          <p className="text-3xl font-bold text-primary">${totalDonated}</p>
          <p className="text-xs text-muted-foreground mt-2">Across {totalDonations} campaigns</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Donations</p>
          <p className="text-3xl font-bold text-primary">{totalDonations}</p>
          <p className="text-xs text-muted-foreground mt-2">All time contributions</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Confirmed</p>
          <p className="text-3xl font-bold text-primary">{confirmedDonations}</p>
          <p className="text-xs text-muted-foreground mt-2">Ready for impact</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <Input
            placeholder="Search campaigns..."
            className="flex-1 max-w-xs"
          />
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Card>

      {/* Donations Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Campaign</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Receipt</th>
                <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Heart className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{donation.campaign}</p>
                        <p className="text-xs text-muted-foreground">{donation.impact}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-primary">{donation.amount}</p>
                  </td>
                  <td className="py-4 px-4 text-muted-foreground text-sm">{donation.date}</td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {donation.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-foreground text-sm">{donation.receipt}</td>
                  <td className="py-4 px-4">
                    <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Donation Impact */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
        <h2 className="text-xl font-bold text-foreground mb-6">Your Impact</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">50+</p>
            <p className="text-muted-foreground">Lives Touched</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">$2,100</p>
            <p className="text-muted-foreground">Total Impact</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">4</p>
            <p className="text-muted-foreground">Campaigns Supported</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-2">100%</p>
            <p className="text-muted-foreground">Transparent</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
