'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Truck, CheckCircle, Award, Navigation, Phone } from 'lucide-react'

export default function VolunteerDashboard() {
  const nearbyPickups = [
    {
      id: 1,
      donor: 'John Doe',
      items: 'Clothing Bundle (15 items)',
      location: '123 Main St, Dhaka',
      distance: '2.5 km away',
      scheduled: '2024-04-20, 2:00 PM',
      contact: '+880 1234 567890',
      priority: 'Normal',
      status: 'Available',
    },
    {
      id: 2,
      donor: 'Sarah Ahmed',
      items: 'Books & Educational Materials (8 items)',
      location: '456 Oak Ave, Dhaka',
      distance: '4.2 km away',
      scheduled: '2024-04-20, 3:30 PM',
      contact: '+880 9876 543210',
      priority: 'High',
      status: 'Available',
    },
    {
      id: 3,
      donor: 'Ahmed Khan',
      items: 'Kitchen Items (12 items)',
      location: '789 Pine Rd, Dhaka',
      distance: '1.8 km away',
      scheduled: '2024-04-20, 1:00 PM',
      contact: '+880 5555 555555',
      priority: 'Normal',
      status: 'Assigned',
    },
  ]

  const stats = [
    { label: 'Tasks This Week', value: '12', icon: Truck },
    { label: 'Completed', value: '9', icon: CheckCircle },
    { label: 'Rating', value: '⭐ 4.8', icon: Award },
    { label: 'Hours Volunteered', value: '48', icon: Clock },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Nearby Pickups</h1>
        <p className="text-muted-foreground mt-2">Available donation pickups near you</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const StatIcon = stat.icon
          return (
            <Card key={idx} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <StatIcon className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <h3 className="text-sm text-muted-foreground mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </Card>
          )
        })}
      </div>

      {/* Filter and Sort */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex gap-2">
            {['All', 'Nearby', 'Assigned', 'High Priority'].map((filter) => (
              <Button
                key={filter}
                variant={filter === 'All' ? 'default' : 'outline'}
                size="sm"
                className={filter === 'All' ? 'bg-secondary hover:bg-secondary/90' : ''}
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="ml-auto">
            <select className="px-3 py-2 border border-border rounded-lg bg-background text-sm text-foreground">
              <option>Sort by Distance</option>
              <option>Sort by Time</option>
              <option>Sort by Priority</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Pickup Cards */}
      <div className="space-y-6">
        {nearbyPickups.map((pickup) => (
          <Card key={pickup.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-6 items-start">
              {/* Left Section */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{pickup.donor}</h3>
                    <p className="text-sm text-muted-foreground">{pickup.items}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      pickup.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {pickup.priority} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      pickup.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pickup.status}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-semibold text-foreground">{pickup.location}</p>
                      <p className="text-xs text-muted-foreground">{pickup.distance}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <div>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                      <p className="text-sm font-semibold text-foreground">{pickup.scheduled}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="w-full lg:w-48 flex flex-col gap-3">
                <Button className="w-full bg-secondary hover:bg-secondary/90 gap-2">
                  <Navigation className="w-4 h-4" />
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Phone className="w-4 h-4" />
                  Call Donor
                </Button>
                {pickup.status === 'Available' && (
                  <Button variant="outline" className="w-full">
                    Assign to Me
                  </Button>
                )}
                {pickup.status === 'Assigned' && (
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Mark Collected
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Impact Stats */}
      <Card className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5">
        <h2 className="text-lg font-bold text-foreground mb-4">Your Impact This Month</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary mb-2">120</p>
            <p className="text-muted-foreground">Items Collected</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary mb-2">850+</p>
            <p className="text-muted-foreground">Beneficiaries</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary mb-2">48</p>
            <p className="text-muted-foreground">Hours Served</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary mb-2">⭐ 4.8</p>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
