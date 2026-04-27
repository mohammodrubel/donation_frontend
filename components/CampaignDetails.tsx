'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Heart, Share2, Flag, ArrowLeft, Users, Calendar,
  TrendingUp, CheckCircle, Plus, Package, Truck, Camera, X
} from 'lucide-react';
import { campaignCategories } from '@/lib/mockData'; // only for category badge styling
import { useGetSingleCampaignQuery } from '@/lib/reudx/fetchers/campain/campainApi';

interface CampaignDetailsProps {
  id: string;
}

// Helper: strip HTML tags for plain text preview
function stripHtml(html: string) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

// Format date (if date string exists)
function formatDate(dateString?: string) {
  if (!dateString) return 'TBD';
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}

// Calculate days left
function getDaysLeft(endDate?: string) {
  if (!endDate) return 0;
  const end = new Date(endDate);
  const today = new Date();
  if (end < today) return 0;
  const diffTime = end.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Category badge style
const categoryStyles: Record<string, string> = {
  emergency: 'bg-red-100 text-red-800',
  education: 'bg-blue-100 text-blue-800',
  health: 'bg-green-100 text-green-800',
  food: 'bg-amber-100 text-amber-800',
  environment: 'bg-emerald-100 text-emerald-800',
  animal: 'bg-purple-100 text-purple-800',
};

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const { data, isLoading, error } = useGetSingleCampaignQuery(id);
  const campaign = data?.data; // adjust if your API response shape differs

  // State for user‑submitted item donations (separate from API)
  const [itemDonations, setItemDonations] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    selectedItem: '', // store the item string (from acceptedItems)
    quantity: 1,
    condition: 'new',
    description: '',
    pickupAddress: '',
    preferredDate: '',
    preferredTime: '',
    contactPhone: '',
  });
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Loading state
  if (isLoading) {
    return <CampaignDetailsSkeleton />;
  }

  // Error or not found
  if (error || !campaign) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-12 text-center">
        <p className="text-lg text-gray-600 mb-6">
          {error ? 'Failed to load campaign. Please try again later.' : 'Campaign not found.'}
        </p>
        <Button asChild>
          <Link href="/campaigns">Back to Campaigns</Link>
        </Button>
      </main>
    );
  }

  const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100;
  const daysLeft = getDaysLeft(campaign.endDate);
  const categoryKey = campaign.category?.toLowerCase() || 'other';
  const categoryLabel = campaignCategories.find(c => c.id === campaign.category)?.name || campaign.category || 'Other';
  const plainDescription = stripHtml(campaign.description || '');
  const plainStory = stripHtml(campaign.story || '');

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos: string[] = [];
    const newFiles: File[] = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newPhotos.push(ev.target.result as string);
          if (newPhotos.length === files.length) {
            setPhotos(prev => [...prev, ...newPhotos]);
            setPhotoFiles(prev => [...prev, ...newFiles]);
          }
        }
      };
      reader.readAsDataURL(file);
      newFiles.push(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Submit item donation (pure frontend, not connected to backend)
  const handleSubmitItemDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedItem) {
      alert('Please select an item you wish to donate');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newDonation = {
        id: `user_${Date.now()}`,
        campaignId: campaign.id,
        donorName: formData.donorName || 'Anonymous Donor',
        donorEmail: formData.donorEmail,
        itemName: formData.selectedItem,
        quantity: formData.quantity,
        condition: formData.condition,
        description: formData.description,
        pickupAddress: formData.pickupAddress,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        photos: photos,
        status: 'pending',
        contactPhone: formData.contactPhone,
        submittedAt: new Date().toISOString(),
      };
      setItemDonations(prev => [newDonation, ...prev]);
      // Reset form
      setShowForm(false);
      setFormData({
        donorName: '', donorEmail: '', selectedItem: '', quantity: 1,
        condition: 'new', description: '', pickupAddress: '',
        preferredDate: '', preferredTime: '', contactPhone: '',
      });
      setPhotos([]);
      setPhotoFiles([]);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <main className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/campaigns" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Campaigns
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content (left side) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100">
              <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-sm ${categoryStyles[categoryKey] || 'bg-gray-100 text-gray-800'}`}>
                  {categoryLabel}
                </span>
              </div>
              {/* Status badge (optional) */}
              {campaign.status && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-sm">
                    {campaign.status === 'pending' ? 'Pending Review' : campaign.status}
                  </span>
                </div>
              )}
            </div>

            {/* Title & Meta */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">{campaign.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Creator</p>
                    <p className="font-semibold text-gray-900">{campaign.creatorId || 'Anonymous'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(campaign.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="font-semibold text-gray-900">{formatDate(campaign.endDate)}</p>
                  </div>
                </div>
              </div>
              {/* Tags */}
              {campaign.tags && campaign.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {campaign.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">#{tag}</span>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-gray-200" />

            {/* Story & Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">The Story</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: campaign.story || '' }} />
              <h2 className="text-2xl font-bold text-gray-900 mt-8">How You Can Help</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: campaign.description || '' }} />
            </div>

            {/* User‑submitted Item Donations Gallery */}
            {itemDonations.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">💝 Item Donations from Supporters</h3>
                  <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">{itemDonations.length} contributions</span>
                </div>
                <div className="space-y-5">
                  {itemDonations.map(donation => (
                    <div key={donation.id} className="rounded-xl border border-gray-200 p-5 bg-white shadow-sm">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-3">
                        <div>
                          <p className="font-bold text-lg text-gray-900">{donation.donorName}</p>
                          <p className="text-sm text-gray-600">
                            Donated: <span className="font-medium text-primary">{donation.itemName}</span> × {donation.quantity}
                          </p>
                          <p className="text-sm text-gray-600">Condition: {donation.condition} • Status: <span className="capitalize">{donation.status}</span></p>
                          {donation.description && <p className="text-sm text-gray-700 mt-1">{donation.description}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">{new Date(donation.submittedAt).toLocaleDateString()}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <Truck className="w-3 h-3" />
                            <span>Pickup: {donation.preferredDate}</span>
                          </div>
                        </div>
                      </div>
                      {donation.photos.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                          {donation.photos.map((photo: string, idx: number) => (
                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                              <img src={photo} alt={`Donation item ${idx+1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (right side) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Donation Progress Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-gray-200">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Amount Collected</p>
                    <p className="text-4xl font-bold text-primary">
                      ${(campaign.collectedAmount / 1000).toFixed(1)}K
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      of ${(campaign.goalAmount / 1000).toFixed(1)}K goal
                    </p>
                  </div>
                  <div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(progressPercent, 100)}%` }}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{Math.round(progressPercent)}% funded</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">0</p>
                      <p className="text-xs text-gray-600">Supporters</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{daysLeft}</p>
                      <p className="text-xs text-gray-600">Days left</p>
                    </div>
                  </div>
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-12">
                    <Link href={`/donate-money?campaign=${campaign.id}`}>
                      <Heart className="w-5 h-5 mr-2" /> Donate Money
                    </Link>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg"><Share2 className="w-4 h-4 mr-2" />Share</Button>
                    <Button variant="outline" size="sm" className="rounded-lg"><Flag className="w-4 h-4 mr-2" />Report</Button>
                  </div>
                </div>
              </div>

              {/* Items Needed Card (using API acceptedItems) */}
              {campaign.acceptedItems && campaign.acceptedItems.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" /> Items you can donate
                  </h3>
                  <div className="space-y-3 mb-5">
                    {campaign.acceptedItems.map((item: string, idx: number) => (
                      <div key={idx} className="border-l-4 border-primary/40 pl-3 py-1">
                        <p className="font-medium text-gray-900">{item}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-4 h-4 mr-2" /> Donate Items
                  </Button>
                </div>
              )}

              {/* Item Donation Form */}
              {showForm && campaign.acceptedItems && (
                <div className="bg-white p-6 rounded-2xl border border-primary/30 shadow-lg">
                  <h3 className="font-bold text-gray-900 mb-4">📦 Donate Physical Items</h3>
                  <form onSubmit={handleSubmitItemDonation} className="space-y-4">
                    <input
                      type="text" placeholder="Your Full Name *" value={formData.donorName}
                      onChange={e => setFormData({...formData, donorName: e.target.value})}
                      className="w-full p-2 border rounded-md" required
                    />
                    <input
                      type="email" placeholder="Email (optional)" value={formData.donorEmail}
                      onChange={e => setFormData({...formData, donorEmail: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    />
                    <select
                      value={formData.selectedItem}
                      onChange={e => setFormData({...formData, selectedItem: e.target.value})}
                      className="w-full p-2 border rounded-md" required
                    >
                      <option value="">Select an item to donate *</option>
                      {campaign.acceptedItems.map((item: string, idx: number) => (
                        <option key={idx} value={item}>{item}</option>
                      ))}
                    </select>
                    <input
                      type="number" min="1" placeholder="Quantity *" value={formData.quantity}
                      onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                      className="w-full p-2 border rounded-md" required
                    />
                    <select
                      value={formData.condition}
                      onChange={e => setFormData({...formData, condition: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="new">New</option>
                      <option value="excellent">Excellent (lightly used)</option>
                      <option value="fair">Fair</option>
                    </select>
                    <textarea
                      placeholder="Additional description (optional)" value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full p-2 border rounded-md" rows={2}
                    />
                    <input
                      type="text" placeholder="Pickup Address *" value={formData.pickupAddress}
                      onChange={e => setFormData({...formData, pickupAddress: e.target.value})}
                      className="w-full p-2 border rounded-md" required
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date" placeholder="Preferred Date" value={formData.preferredDate}
                        onChange={e => setFormData({...formData, preferredDate: e.target.value})}
                        className="p-2 border rounded-md" required
                      />
                      <input
                        type="text" placeholder="Time (e.g., 10am-2pm)" value={formData.preferredTime}
                        onChange={e => setFormData({...formData, preferredTime: e.target.value})}
                        className="p-2 border rounded-md" required
                      />
                    </div>
                    <input
                      type="tel" placeholder="Contact Phone *" value={formData.contactPhone}
                      onChange={e => setFormData({...formData, contactPhone: e.target.value})}
                      className="w-full p-2 border rounded-md" required
                    />

                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload photos (up to 5)</label>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {photos.map((photo, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border">
                            <img src={photo} alt="preview" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => removePhoto(idx)}
                              className="absolute top-0 right-0 bg-black/50 text-white rounded-full p-0.5">
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        <button type="button" onClick={() => fileInputRef.current?.click()}
                          className="w-16 h-16 border-2 border-dashed rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50">
                          <Camera className="w-5 h-5" />
                        </button>
                        <input type="file" ref={fileInputRef} multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? 'Submitting...' : 'Submit Donation'}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Campaign verified by DonateBridge</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">100% transparent fund management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Skeleton loader for the entire page
function CampaignDetailsSkeleton() {
  return (
    <main className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Skeleton className="h-6 w-32" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column skeleton */}
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="h-96 rounded-2xl" />
            <Skeleton className="h-10 w-3/4" />
            <div className="flex gap-6">
              <Skeleton className="h-16 w-28" />
              <Skeleton className="h-16 w-28" />
              <Skeleton className="h-16 w-28" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          {/* Right column skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-80 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}