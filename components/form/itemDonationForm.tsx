'use client';

import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Camera, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useCreateItemDonationMutation } from '@/lib/reudx/fetchers/itemDonation.tsx/itemDonationApi';

interface ItemDonationFormProps {
  campaignId: string;
  acceptedItems: string[];
  onSuccess?: () => void;
}

function ItemDonationForm({
  campaignId,
  acceptedItems,
  onSuccess,
}: ItemDonationFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const user = useSelector((state: any) => state?.auth?.user);

  const [createItemDonation, { isLoading }] =
    useCreateItemDonationMutation();

  const [photos, setPhotos] = useState<string[]>([]);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    contactName: user?.name || '',
    contactEmail: user?.email || '',
    contactPhone: '',
    itemName: '',
    category: 'other',
    quantity: 1,
    condition: 'new',
    description: '',
    pickupAddress: '',
    preferredDate: '',
    preferredTime: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value,
    }));
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const remain = 5 - photoFiles.length;
    const selectedFiles = files.slice(0, remain);

    selectedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPhotos((prev) => [
          ...prev,
          reader.result as string,
        ]);
      };

      reader.readAsDataURL(file);
    });

    setPhotoFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setPhotoFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const resetForm = () => {
    setFormData({
      contactName: user?.name || '',
      contactEmail: user?.email || '',
      contactPhone: '',
      itemName: '',
      category: 'other',
      quantity: 1,
      condition: 'new',
      description: '',
      pickupAddress: '',
      preferredDate: '',
      preferredTime: '',
    });

    setPhotos([]);
    setPhotoFiles([]);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) return;

    try {
      const payload = new FormData();

      payload.append('campaignId', campaignId);
      payload.append(
        'contactName',
        formData.contactName
      );
      payload.append(
        'contactEmail',
        formData.contactEmail
      );
      payload.append(
        'contactPhone',
        formData.contactPhone
      );
      payload.append('itemName', formData.itemName);
      payload.append('category', formData.category);
      payload.append(
        'quantity',
        String(formData.quantity)
      );
      payload.append(
        'condition',
        formData.condition
      );
      payload.append(
        'description',
        formData.description
      );
      payload.append(
        'pickupAddress',
        formData.pickupAddress
      );
      payload.append(
        'preferredDate',
        formData.preferredDate
      );
      payload.append(
        'preferredTime',
        formData.preferredTime
      );

      photoFiles.forEach((file) => {
        payload.append('photos', file);
      });

      await createItemDonation(payload).unwrap();

      resetForm();

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold mb-5">
        Donate Physical Items
      </h3>

      {!user ? (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please login first to donate items.
          </p>

          <Button asChild className="w-full">
            <Link href="/auth">
              Login to Donate
            </Link>
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="contactName"
            value={formData.contactName}
            disabled={!!user?.name}
            onChange={handleChange}
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            required
          />

          <input
            name="contactEmail"
            value={formData.contactEmail}
            disabled={!!user?.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            required
          />

          <input
            name="contactPhone"
            value={formData.contactPhone}
            onChange={handleChange}
            type="text"
            placeholder="Phone Number *"
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">
              Select Item *
            </option>

            {acceptedItems?.map(
              (
                item: string,
                index: number
              ) => (
                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="clothes">
              Clothes
            </option>
            <option value="food">
              Food
            </option>
            <option value="books">
              Books
            </option>
            <option value="furniture">
              Furniture
            </option>
            <option value="medicine">
              Medicine
            </option>
            <option value="electronics">
              Electronics
            </option>
            <option value="other">
              Other
            </option>
          </select>

          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            min="1"
            className="w-full border rounded-lg p-3"
            required
          />

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="new">
              New
            </option>
            <option value="used">
              Used
            </option>
            <option value="excellent">
              Excellent
            </option>
            <option value="fair">
              Fair
            </option>
          </select>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Description"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            type="text"
            placeholder="Pickup Address *"
            className="w-full border rounded-lg p-3"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <input
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              type="date"
              className="border rounded-lg p-3"
              required
            />

            <input
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              type="text"
              placeholder="10am - 2pm"
              className="border rounded-lg p-3"
              required
            />
          </div>

          {/* Photos */}
          <div>
            <p className="text-sm font-medium mb-2">
              Upload Photos (Max 5)
            </p>

            <div className="flex flex-wrap gap-3">
              {photos.map(
                (
                  photo,
                  index
                ) => (
                  <div
                    key={index}
                    className="relative w-16 h-16 rounded-lg overflow-hidden border"
                  >
                    <img
                      src={photo}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removePhoto(
                          index
                        )
                      }
                      className="absolute top-0 right-0 bg-black/60 text-white p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )
              )}

              {photos.length < 5 && (
                <button
                  type="button"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center"
                >
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading
              ? 'Submitting...'
              : 'Donate Item'}
          </Button>
        </form>
      )}
    </div>
  );
}

export default ItemDonationForm;