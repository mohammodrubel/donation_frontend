'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDeleteItemDonationMutation, useGetMyDonationsQuery } from '@/lib/reudx/fetchers/itemDonation.tsx/itemDonationApi';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, ImageIcon, X, Trash2, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function MyDonationsPage() {
  const { data, isLoading, refetch } = useGetMyDonationsQuery(undefined);
  const donations = data?.data || [];
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteMyDonations] = useDeleteItemDonationMutation(undefined)
  const [selectedPhotos, setSelectedPhotos] = useState<string[] | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openPhotoGallery = (photos: string[]) => {
    setSelectedPhotos(photos);
    setCurrentPhotoIndex(0);
    setIsPhotoModalOpen(true);
  };

  const nextPhoto = () => {
    if (selectedPhotos) {
      setCurrentPhotoIndex((prev) => (prev + 1) % selectedPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotos) {
      setCurrentPhotoIndex((prev) => (prev - 1 + selectedPhotos.length) % selectedPhotos.length);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donation?')) return;
    setDeletingId(id);
    try{
      const response = await deleteMyDonations(id).unwrap()
      if(response.success){
        toast.success(response.message)
      }
    }catch(error){
      console.log(error)
    }
  };

  const getStatusConfig = (status: string) => {
    const config: Record<string, { label: string; className: string }> = {
      pending: { label: 'Pending', className: 'bg-amber-100 text-amber-700 border-amber-200' },
      assigned: { label: 'Assigned', className: 'bg-blue-100 text-blue-700 border-blue-200' },
      picked_up: { label: 'Picked Up', className: 'bg-purple-100 text-purple-700 border-purple-200' },
      delivered: { label: 'Delivered', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
      cancelled: { label: 'Cancelled', className: 'bg-rose-100 text-rose-700 border-rose-200' },
    };
    return config[status] || { label: status, className: 'bg-gray-100 text-gray-700' };
  };

  if (isLoading) return <TableSkeleton />;

  if (!donations.length) {
    return (
      <div className="border rounded-2xl bg-white p-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <Package className="w-12 h-12 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900">You haven't donated any items yet</h3>
          <p className="text-sm text-gray-500">Your donations will appear here once you contribute.</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="border rounded-2xl bg-white shadow-sm overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-gray-50/50">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-gray-900">My Item Donations</h2>
            <Badge variant="secondary" className="ml-2">{donations.length} total</Badge>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => refetch()} className="h-8 w-8">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh list</TooltipContent>
          </Tooltip>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-gray-50/80">
                <TableHead className="font-semibold">Item / Category</TableHead>
                <TableHead className="font-semibold">Quantity</TableHead>
                <TableHead className="font-semibold">Photos</TableHead>
                <TableHead className="font-semibold">Preferred Date & Time</TableHead>
                <TableHead className="font-semibold">Campaign</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {donations.map((item: any) => {
                const statusConfig = getStatusConfig(item.status);
                const photos = item.photos || [];
                const hasPhotos = photos.length > 0;

                return (
                  <TableRow key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                    {/* Item / Category */}
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.itemName || item.category || '—'}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">{item.category}</p>
                        {item.condition && (
                          <p className="text-xs text-gray-400 mt-0.5">Condition: {item.condition}</p>
                        )}
                      </div>
                    </TableCell>

                    {/* Quantity */}
                    <TableCell className="font-mono text-sm">{item.quantity || 1}</TableCell>

                    {/* Photos */}
                    <TableCell>
                      {hasPhotos ? (
                        <div
                          className="relative w-14 h-14 rounded-lg overflow-hidden cursor-pointer border border-gray-200 hover:border-primary transition-all shadow-sm hover:shadow-md"
                          onClick={() => openPhotoGallery(photos)}
                        >
                          <img
                            src={photos[0]}
                            alt="Donation item"
                            className="w-full h-full object-cover"
                          />
                          {photos.length > 1 && (
                            <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-tl-md">
                              +{photos.length}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-gray-400">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm">—</span>
                        </div>
                      )}
                    </TableCell>

                    {/* Preferred Date & Time */}
                    <TableCell>
                      <div className="text-sm">
                        <p>{format(new Date(item.preferredDate), 'PPP')}</p>
                        <p className="text-xs text-gray-500">{item.preferredTime}</p>
                      </div>
                    </TableCell>

                    {/* Campaign */}
                    <TableCell>
                      <div>
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {item.campaign?.title || 'General Donation'}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                          {item.campaign?.category}
                        </p>
                      </div>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Badge variant="outline" className={statusConfig.className}>
                        {statusConfig.label}
                      </Badge>
                    </TableCell>

                    {/* Actions: Delete Button */}
                    <TableCell className="text-center">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(item.id)}
                            disabled={deletingId === item.id}
                            className="text-gray-500 hover:text-rose-600 hover:bg-rose-50"
                          >
                            {deletingId === item.id ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Delete donation</TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      <Dialog open={isPhotoModalOpen} onOpenChange={setIsPhotoModalOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/95 border-none sm:rounded-2xl overflow-hidden">
          <DialogTitle className="sr-only">Donation Photos</DialogTitle>
          <div className="relative flex items-center justify-center min-h-[500px]">
            {selectedPhotos && selectedPhotos.length > 0 && (
              <>
                <img
                  src={selectedPhotos[currentPhotoIndex]}
                  alt={`Donation photo ${currentPhotoIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain"
                />
                {selectedPhotos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      onClick={prevPhoto}
                    >
                      ❮
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      onClick={nextPhoto}
                    >
                      ❯
                    </Button>
                  </>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  onClick={() => setIsPhotoModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {selectedPhotos.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
}

function TableSkeleton() {
  return (
    <div className="border rounded-2xl bg-white p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-36" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-14 w-14 rounded-lg" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-40 flex-1" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}