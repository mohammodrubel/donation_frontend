'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { campaigns, campaignCategories } from '@/lib/mockData'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Heart, Search, X, ArrowRight, Star, Filter, ChevronDown } from 'lucide-react'

export function CampaignListing() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'recent' | 'trending' | 'urgent'>('recent')

  const filteredCampaigns = useMemo(() => {
    let filtered = campaigns.filter(campaign => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || campaign.category === selectedCategory
      const matchesTag = !selectedTag || campaign.tags.includes(selectedTag)

      return matchesSearch && matchesCategory && matchesTag
    })

    // Sort
    if (sortBy === 'trending') {
      filtered.sort((a, b) => b.donors - a.donors)
    } else if (sortBy === 'urgent') {
      filtered.sort((a, b) => (b.goalAmount - b.collectedAmount) - (a.goalAmount - a.collectedAmount))
    } else {
      // recent - by createdAt
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedTag, sortBy])

  const popularTags = ['urgent', 'trending', 'medical', 'emergency', 'education']

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 py-12 sm:py-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Browse Campaigns</h1>
            <p className="text-lg text-foreground/70">
              Discover verified campaigns creating real impact. Find causes that matter to you and make a difference.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-foreground/50" />
            <Input
              type="text"
              placeholder="Search campaigns by title or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-base rounded-xl border-border/50 shadow-sm focus:shadow-md transition-all bg-white"
            />
          </div>

          {/* Quick Filters */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                    selectedCategory === null
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-foreground border-border/50 hover:border-primary/30'
                  }`}
                >
                  All Categories
                </button>
                {campaignCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                      selectedCategory === category.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-foreground border-border/50 hover:border-primary/30'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Filter */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Quick Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                      selectedTag === tag
                        ? 'bg-secondary text-white border-secondary'
                        : 'bg-white text-foreground border-border/50 hover:border-secondary/30'
                    }`}
                  >
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold text-foreground mb-3">Sort By</h3>
              <div className="flex gap-2">
                {[
                  { id: 'recent', label: 'Most Recent' },
                  { id: 'trending', label: 'Most Trending' },
                  { id: 'urgent', label: 'Most Urgent' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSortBy(option.id as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all border ${
                      sortBy === option.id
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-foreground border-border/50 hover:border-primary/30'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedCategory || selectedTag) && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-foreground">Active Filters ({[searchQuery, selectedCategory, selectedTag].filter(Boolean).length})</span>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory(null)
                    setSelectedTag(null)
                  }}
                  className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
                >
                  Clear all <X className="w-3 h-3" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchQuery && (
                  <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-blue-200">
                    <span>Search: {searchQuery}</span>
                    <button onClick={() => setSearchQuery('')} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedCategory && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-green-200">
                    <span>{campaignCategories.find(c => c.id === selectedCategory)?.name}</span>
                    <button onClick={() => setSelectedCategory(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                {selectedTag && (
                  <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-purple-200">
                    <span>{selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1)}</span>
                    <button onClick={() => setSelectedTag(null)} className="hover:opacity-70">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="mb-8">
            <p className="text-lg font-semibold text-foreground">
              {filteredCampaigns.length} Campaign{filteredCampaigns.length !== 1 ? 's' : ''} Found
            </p>
          </div>

          {filteredCampaigns.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-muted/50 to-muted/25 rounded-2xl border border-border/50">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
              <p className="text-lg text-foreground/70 mb-4">No campaigns match your filters</p>
              <p className="text-sm text-foreground/50 mb-6">Try adjusting your search or filters</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                  setSelectedTag(null)
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCampaigns.map(campaign => {
                const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100
                const categoryInfo = campaignCategories.find(c => c.id === campaign.category)

                return (
                  <Link
                    key={campaign.id}
                    href={`/campaigns/${campaign.id}`}
                    className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
                  >
                    {/* Image Section */}
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 flex items-center justify-center overflow-hidden">
                      <img 
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {campaign.tags.includes('urgent') && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          URGENT
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Category Badge & Stats */}
                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryInfo?.color} ${categoryInfo?.textColor}`}>
                          {categoryInfo?.name}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-xs font-bold text-foreground">{campaign.donors}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-foreground line-clamp-2 text-lg group-hover:text-primary transition-colors">
                        {campaign.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-foreground/70 line-clamp-2">{campaign.description}</p>

                      {/* Progress */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-semibold text-foreground">
                            ৳{(campaign.collectedAmount / 100000).toFixed(1)}L of ৳{(campaign.goalAmount / 100000).toFixed(1)}L
                          </span>
                          <span className="text-foreground/60 font-medium">{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(progressPercent, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between text-sm pt-3 border-t border-border/50">
                        <span className="text-foreground/60">{campaign.donors.toLocaleString()} donors</span>
                        <span className="text-primary font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                          View Details <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
