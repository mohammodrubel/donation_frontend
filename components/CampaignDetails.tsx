'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Share2, Flag, ArrowLeft, Users, Calendar, TrendingUp, CheckCircle, Upload, X, Plus, Package, Truck, Camera } from 'lucide-react';
import { campaignCategories, campaigns, ItemDonation, mockItemDonations } from '@/lib/mockData';

interface CampaignDetailsProps {
  id: string;
}

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const campaign = campaigns.find(c => c.id === id);
  const [donatedMoney, setDonatedMoney] = useState(false);
  
  // State for item donations (mock + user added)
  const [itemDonations, setItemDonations] = useState<ItemDonation[]>(
    mockItemDonations.filter(d => d.campaignId === id)
  );
  
  // Item donation form state
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    selectedItemId: '',
    quantity: 1,
    condition: 'new' as const,
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

  if (!campaign) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="text-lg text-foreground/70 mb-6">Campaign not found</p>
        <Button asChild size="lg"><Link href="/campaigns">Back to Campaigns</Link></Button>
      </main>
    );
  }

  const progressPercent = (campaign.collectedAmount / campaign.goalAmount) * 100;
  const categoryInfo = campaignCategories.find(c => c.id === campaign.category);
  const daysLeft = Math.floor(Math.random() * 30) + 10;

  // Handle image upload (multiple) – convert to base64 for demo
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

  const handleSubmitItemDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedItemId) {
      alert('Please select an item to donate');
      return;
    }
    const selectedItem = campaign.acceptedItems?.find(item => item.id === formData.selectedItemId);
    if (!selectedItem) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newDonation: ItemDonation = {
        id: `user_${Date.now()}`,
        campaignId: campaign.id,
        donorName: formData.donorName || 'Anonymous Donor',
        donorEmail: formData.donorEmail,
        itemName: selectedItem.name,
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
        donorName: '', donorEmail: '', selectedItemId: '', quantity: 1, condition: 'new',
        description: '', pickupAddress: '', preferredDate: '', preferredTime: '', contactPhone: '',
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img src={campaign.image} alt={campaign.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4">
                {categoryInfo && (
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${categoryInfo.color} ${categoryInfo.textColor}`}>
                    {categoryInfo.name}
                  </span>
                )}
              </div>
            </div>

            {/* Title & Meta */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">{campaign.title}</h1>
              <div className="flex flex-wrap gap-6 text-foreground/70">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div><p className="text-sm text-foreground/60">By</p><p className="font-semibold text-foreground">{campaign.creatorName}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div><p className="text-sm text-foreground/60">Started</p><p className="font-semibold text-foreground">{new Date(campaign.createdAt).toLocaleDateString()}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div><p className="text-sm text-foreground/60">Donors</p><p className="font-semibold text-foreground">{campaign.donors.toLocaleString()}</p></div>
                </div>
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Story & Description */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">The Story</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">{campaign.story}</p>
              <p className="text-foreground/60 leading-relaxed">{campaign.description}</p>
            </div>

            {/* Campaign Updates */}
            {campaign.updates.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Updates</h3>
                <div className="space-y-4">
                  {campaign.updates.map((update, idx) => (
                    <div key={idx} className="p-6 rounded-xl border border-border/50">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-foreground/60 mb-2">{new Date(update.date).toLocaleDateString()}</p>
                          <p className="text-foreground font-medium">{update.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Money Donors */}
            {campaign.recentDonors.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">Recent Financial Supporters</h3>
                <div className="space-y-3">
                  {campaign.recentDonors.slice(0, 5).map((donor, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <img src={donor.avatar} alt={donor.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-semibold text-foreground">{donor.name}</p>
                          <p className="text-sm text-foreground/60">{new Date(donor.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="font-bold text-primary">৳{donor.amount.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Item Donations Gallery */}
            {itemDonations.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">💝 Item Donations & Photos</h3>
                  <span className="text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">{itemDonations.length} contributions</span>
                </div>
                <div className="space-y-6">
                  {itemDonations.map(donation => (
                    <div key={donation.id} className="rounded-xl border border-border/50 p-5 bg-white shadow-sm">
                      <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                        <div>
                          <p className="font-bold text-lg text-foreground">{donation.donorName}</p>
                          <p className="text-sm text-foreground/60">Donated: <span className="font-medium text-primary">{donation.itemName}</span> × {donation.quantity}</p>
                          <p className="text-sm text-foreground/60">Condition: {donation.condition} • Status: <span className="capitalize">{donation.status}</span></p>
                          {donation.description && <p className="text-sm text-foreground/70 mt-1">{donation.description}</p>}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-foreground/50">{new Date(donation.submittedAt).toLocaleDateString()}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs">
                            <Truck className="w-3 h-3" />
                            <span>Pickup: {donation.preferredDate}</span>
                          </div>
                        </div>
                      </div>
                      {/* Photos grid */}
                      {donation.photos.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                          {donation.photos.map((photo, idx) => (
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Money Donation Progress Card */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl border border-border/50">
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-foreground/60 mb-2">Amount Collected</p>
                    <p className="text-4xl font-bold text-primary">৳{(campaign.collectedAmount / 100000).toFixed(1)}L</p>
                    <p className="text-sm text-foreground/60 mt-2">of ৳{(campaign.goalAmount / 100000).toFixed(1)}L goal</p>
                  </div>
                  <div>
                    <div className="w-full bg-muted rounded-full h-4 overflow-hidden mb-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500" style={{ width: `${Math.min(progressPercent, 100)}%` }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{Math.round(progressPercent)}% funded</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div><p className="text-2xl font-bold text-foreground">{campaign.donors.toLocaleString()}</p><p className="text-xs text-foreground/60">Supporters</p></div>
                    <div><p className="text-2xl font-bold text-foreground">{daysLeft}</p><p className="text-xs text-foreground/60">Days left</p></div>
                  </div>
                  <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg h-12">
                    <Link href={`/donate-money?campaign=${campaign.id}`} className="flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5" /> Donate Money
                    </Link>
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="rounded-lg"><Share2 className="w-4 h-4 mr-2" />Share</Button>
                    <Button variant="outline" size="sm" className="rounded-lg"><Flag className="w-4 h-4 mr-2" />Report</Button>
                  </div>
                </div>
              </div>

              {/* Items Needed Card */}
              {campaign.acceptedItems && campaign.acceptedItems.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-border/50">
                  <h3 className="font-bold text-foreground mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Items you can donate</h3>
                  <div className="space-y-3 mb-5">
                    {campaign.acceptedItems.map(item => (
                      <div key={item.id} className="border-l-4 border-primary/40 pl-3 py-1">
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-xs text-foreground/60">{item.description}</p>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => setShowForm(!showForm)}>
                    <Plus className="w-4 h-4 mr-2" /> Donate Items
                  </Button>
                </div>
              )}

              {/* Item Donation Form (collapsible) */}
              {showForm && campaign.acceptedItems && (
                <div className="bg-white p-6 rounded-2xl border border-primary/30 shadow-lg">
                  <h3 className="font-bold text-foreground mb-4">📦 Donate Physical Items</h3>
                  <form onSubmit={handleSubmitItemDonation} className="space-y-4">
                    <input type="text" placeholder="Your Full Name" value={formData.donorName} onChange={e=>setFormData({...formData, donorName: e.target.value})} className="w-full p-2 border rounded-md" required />
                    <input type="email" placeholder="Email (optional)" value={formData.donorEmail} onChange={e=>setFormData({...formData, donorEmail: e.target.value})} className="w-full p-2 border rounded-md" />
                    <select value={formData.selectedItemId} onChange={e=>setFormData({...formData, selectedItemId: e.target.value})} className="w-full p-2 border rounded-md" required>
                      <option value="">Select item you want to donate</option>
                      {campaign.acceptedItems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                    </select>
                    <input type="number" min="1" placeholder="Quantity" value={formData.quantity} onChange={e=>setFormData({...formData, quantity: parseInt(e.target.value)})} className="w-full p-2 border rounded-md" required />
                    <select value={formData.condition} onChange={e=>setFormData({...formData, condition: e.target.value as any})} className="w-full p-2 border rounded-md">
                      <option value="new">New</option>
                      <option value="excellent">Excellent (used)</option>
                      <option value="fair">Fair</option>
                    </select>
                    <textarea placeholder="Additional description (optional)" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-md" rows={2} />
                    <input type="text" placeholder="Pickup Address" value={formData.pickupAddress} onChange={e=>setFormData({...formData, pickupAddress: e.target.value})} className="w-full p-2 border rounded-md" required />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" placeholder="Preferred Date" value={formData.preferredDate} onChange={e=>setFormData({...formData, preferredDate: e.target.value})} className="p-2 border rounded-md" required />
                      <input type="text" placeholder="Time (e.g., 10am-2pm)" value={formData.preferredTime} onChange={e=>setFormData({...formData, preferredTime: e.target.value})} className="p-2 border rounded-md" required />
                    </div>
                    <input type="tel" placeholder="Contact Phone" value={formData.contactPhone} onChange={e=>setFormData({...formData, contactPhone: e.target.value})} className="w-full p-2 border rounded-md" required />
                    
                    {/* Photo Upload */}
                    <div>
                      <label className="block text-sm font-medium mb-2">Upload photos of your donation (up to 5)</label>
                      <div className="flex flex-wrap gap-3 mb-3">
                        {photos.map((photo, idx) => (
                          <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden border">
                            <img src={photo} alt="preview" className="w-full h-full object-cover" />
                            <button type="button" onClick={()=>removePhoto(idx)} className="absolute top-0 right-0 bg-black/50 text-white rounded-full p-0.5"><X className="w-3 h-3" /></button>
                          </div>
                        ))}
                        <button type="button" onClick={()=>fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-md flex items-center justify-center text-gray-500 hover:bg-gray-50">
                          <Camera className="w-5 h-5" />
                        </button>
                        <input type="file" ref={fileInputRef} multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button type="submit" disabled={isSubmitting} className="flex-1">{isSubmitting ? 'Submitting...' : 'Submit Donation'}</Button>
                      <Button type="button" variant="outline" onClick={()=>setShowForm(false)}>Cancel</Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Creator & Trust */}
              <div className="bg-white p-6 rounded-2xl border border-border/50">
                <p className="text-sm text-foreground/60 mb-4">Campaign Creator</p>
                <div className="flex items-center gap-4 mb-4">
                  <img src={campaign.creatorAvatar} alt={campaign.creatorName} className="w-12 h-12 rounded-full" />
                  <div><p className="font-bold text-foreground">{campaign.creatorName}</p><p className="text-sm text-foreground/60">Verified Creator</p></div>
                </div>
                <Button variant="outline" size="sm" className="w-full rounded-lg">Contact Creator</Button>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-foreground/70">Campaign verified by DonateBridge</span></div>
                <div className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" /><span className="text-foreground/70">Transparent fund & item management</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

