'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Gift, Plus, MapPin, Calendar, Truck, CheckCircle } from 'lucide-react'

export default function ItemsPage() {
  const itemDonations = [
    {
      id: 1,
      title: 'Clothing Bundle - Winter Collection',
      category: 'Clothes',
      items: 15,
      status: 'Pending Pickup',
      statusColor: 'bg-yellow-100 text-yellow-800',
      location: '123 Main St, Dhaka',
      scheduledDate: '2024-04-20',
      image: '👕',
      timeline: [
        { step: 'Pending', completed: true },
        { step: 'Accepted', completed: false },
        { step: 'Scheduled', completed: false },
        { step: 'Collected', completed: false },
        { step: 'Delivered', completed: false },
      ],
    },
    {
      id: 2,
      title: 'Educational Books Collection',
      category: 'Books',
      items: 8,
      status: 'Scheduled',
      statusColor: 'bg-blue-100 text-blue-800',
      location: '456 Oak Ave, Dhaka',
      scheduledDate: '2024-04-18',
      image: '📚',
      timeline: [
        { step: 'Pending', completed: true },
        { step: 'Accepted', completed: true },
        { step: 'Scheduled', completed: true },
        { step: 'Collected', completed: false },
        { step: 'Delivered', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Kitchen & Dining Items',
      category: 'Kitchen',
      items: 12,
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800',
      location: '789 Pine Rd, Dhaka',
      scheduledDate: '2024-04-01',
      image: '🍴',
      timeline: [
        { step: 'Pending', completed: true },
        { step: 'Accepted', completed: true },
        { step: 'Scheduled', completed: true },
        { step: 'Collected', completed: true },
        { step: 'Delivered', completed: true },
      ],
    },
    {
      id: 4,
      title: 'Furniture - Office Desk & Chair',
      category: 'Furniture',
      items: 2,
      status: 'Collected',
      statusColor: 'bg-purple-100 text-purple-800',
      location: '321 Elm St, Dhaka',
      scheduledDate: '2024-04-10',
      image: '🪑',
      timeline: [
        { step: 'Pending', completed: true },
        { step: 'Accepted', completed: true },
        { step: 'Scheduled', completed: true },
        { step: 'Collected', completed: true },
        { step: 'Delivered', completed: false },
      ],
    },
  ]

  const totalItems = itemDonations.reduce((sum, d) => sum + d.items, 0)
  const deliveredItems = itemDonations.filter(d => d.status === 'Delivered').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Item Donations</h1>
          <p className="text-muted-foreground mt-2">Track your donations from submission to delivery</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Donate Items
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Total Items</p>
          <p className="text-3xl font-bold text-primary">{totalItems}</p>
          <p className="text-xs text-muted-foreground mt-2">All donations combined</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Active Donations</p>
          <p className="text-3xl font-bold text-primary">{itemDonations.filter(d => d.status !== 'Delivered').length}</p>
          <p className="text-xs text-muted-foreground mt-2">In progress</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Delivered</p>
          <p className="text-3xl font-bold text-primary">{deliveredItems}</p>
          <p className="text-xs text-muted-foreground mt-2">Successfully delivered</p>
        </Card>
        <Card className="p-6">
          <p className="text-muted-foreground text-sm mb-2">Impact Score</p>
          <p className="text-3xl font-bold text-primary">⭐ 4.8</p>
          <p className="text-xs text-muted-foreground mt-2">Donor rating</p>
        </Card>
      </div>

      {/* Item Donations List */}
      <div className="space-y-6">
        {itemDonations.map((donation) => (
          <Card key={donation.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Section - Basic Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{donation.image}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{donation.title}</h3>
                        <p className="text-sm text-muted-foreground">{donation.items} items • {donation.category}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${donation.statusColor}`}>
                        {donation.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {donation.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {donation.scheduledDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase">Delivery Timeline</p>
                  <div className="flex gap-2">
                    {donation.timeline.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold transition-colors ${
                            step.completed
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {step.completed ? '✓' : idx + 1}
                        </div>
                        <span className="text-xs text-muted-foreground hidden sm:inline">{step.step}</span>
                        {idx < donation.timeline.length - 1 && (
                          <div className={`w-8 h-0.5 ${step.completed ? 'bg-primary' : 'bg-border'}`}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="md:w-48 flex flex-col gap-3">
                {donation.status === 'Pending Pickup' && (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Truck className="w-4 h-4 mr-2" />
                      Reschedule Pickup
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </>
                )}
                {donation.status === 'Scheduled' && (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Truck className="w-4 h-4 mr-2" />
                      Track Pickup
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </>
                )}
                {donation.status === 'Collected' && (
                  <>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Truck className="w-4 h-4 mr-2" />
                      Track Delivery
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </>
                )}
                {donation.status === 'Delivered' && (
                  <>
                    <Button className="w-full bg-green-600 hover:bg-green-700" disabled>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Delivered
                    </Button>
                    <Button variant="outline" className="w-full">
                      View Impact
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
