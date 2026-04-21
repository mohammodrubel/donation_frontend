'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, Plus, Edit, Eye, Share2, MoreVertical, TrendingUp } from 'lucide-react'

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      title: 'Emergency Medical Fund - Father&apos;s Surgery',
      category: 'Medical',
      description: 'Help my father recover from emergency surgery',
      raised: 45000,
      goal: 100000,
      donors: 234,
      days: 15,
      status: 'Active',
      image: '🏥',
    },
    {
      id: 2,
      title: 'Education Support for 5 Students',
      category: 'Education',
      description: 'Provide school supplies and tuition assistance',
      raised: 28500,
      goal: 50000,
      donors: 156,
      days: 32,
      status: 'Active',
      image: '📚',
    },
    {
      id: 3,
      title: 'Family Relief Fund',
      category: 'Family Support',
      description: 'Support a struggling family with rent and food',
      raised: 12300,
      goal: 30000,
      donors: 89,
      days: 45,
      status: 'Active',
      image: '👨‍👩‍👧‍👦',
    },
  ]

  const totalRaised = campaigns.reduce((sum, c) => sum + c.raised, 0)
  const totalDonors = campaigns.reduce((sum, c) => sum + c.donors, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Campaigns</h1>
          <p className="text-muted-foreground mt-2">Manage and track your fundraising campaigns</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Raised</p>
          <p className="text-3xl font-bold text-primary">${(totalRaised / 1000).toFixed(1)}K</p>
          <p className="text-xs text-muted-foreground mt-2">From all campaigns</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Donors</p>
          <p className="text-3xl font-bold text-primary">{totalDonors}</p>
          <p className="text-xs text-muted-foreground mt-2">People supported you</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Active Campaigns</p>
          <p className="text-3xl font-bold text-primary">{campaigns.length}</p>
          <p className="text-xs text-muted-foreground mt-2">Currently running</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Success Rate</p>
          <p className="text-3xl font-bold text-primary">67%</p>
          <p className="text-xs text-muted-foreground mt-2">Fully funded goals</p>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-6">
        {campaigns.map((campaign) => {
          const progress = (campaign.raised / campaign.goal) * 100
          return (
            <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Left Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{campaign.image}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <h3 className="text-lg font-bold text-foreground line-clamp-2">{campaign.title}</h3>
                          <p className="text-sm text-muted-foreground">{campaign.description}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold whitespace-nowrap">
                          {campaign.status}
                        </span>
                      </div>
                      <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
                        {campaign.category}
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-foreground">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2.5">
                          <div
                            className="bg-primary h-2.5 rounded-full transition-all"
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">Raised</p>
                          <p className="font-bold text-primary">${campaign.raised.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Goal</p>
                          <p className="font-bold text-foreground">${campaign.goal.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Donors</p>
                          <p className="font-bold text-primary">{campaign.donors}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="w-full lg:w-40 flex flex-col gap-2">
                  <Button variant="outline" className="gap-2">
                    <Eye className="w-4 h-4" />
                    View Campaign
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Create New Campaign */}
      <Card className="p-8 border-2 border-dashed border-border text-center hover:border-primary transition-colors cursor-pointer">
        <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Start a New Campaign?</h3>
        <p className="text-muted-foreground mb-6">Share your story and help your community respond</p>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </Card>
    </div>
  )
}
