"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { demoCharities } from "../data";
import { Charity } from "../charity_type";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Globe,
  ArrowLeft,
  Heart,
} from "lucide-react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CharityForm } from "@/components/form/charityForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Header } from "@/components/Header";

export default function CharityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const charityId = params.id as string;
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const charity = useMemo(() => {
    return demoCharities.find((c: Charity) => c.id === charityId && c.active);
  }, [charityId]);

  const relatedCharities = useMemo(() => {
    if (!charity) return [];
    return demoCharities
      .filter((c: Charity) => c.id !== charity.id && c.active)
      .slice(0, 8);
  }, [charity]);

  if (!charity) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Charity Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The charity you're looking for doesn't exist or is no longer active.
            </p>
            <button
              onClick={() => router.push("/charities")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Charities
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Banner */}
        <div className="relative h-64 md:h-96 w-full overflow-hidden">
          <img
            src={charity.banner || charity.logo}
            alt={charity.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute -bottom-10 left-4 md:left-8 z-10">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-xl p-1 ring-4 ring-white">
              <img
                src={charity.logo}
                alt={charity.name}
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {charity.name}
                  </h1>
                  {charity.verified && (
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-sm font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  )}
                </div>
                {charity.mission && (
                  <p className="text-emerald-700 text-lg italic mt-2">
                    “{charity.mission}”
                  </p>
                )}
              </div>
              <div className="flex gap-3">
                {charity.website && (
                  <a
                    href={charity.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                  >
                    <Globe className="w-4 h-4" />
                    Website
                  </a>
                )}
                <button
                  onClick={() => setIsSupportModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
                >
                  <Heart className="w-4 h-4" />
                  Support
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                About Us
              </h2>
              <p className="text-gray-700 leading-relaxed">{charity.description}</p>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {charity.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Address</p>
                      <p className="text-gray-800">{charity.address}</p>
                    </div>
                  </div>
                )}
                {charity.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <a
                        href={`mailto:${charity.email}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {charity.email}
                      </a>
                    </div>
                  </div>
                )}
                {charity.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <a
                        href={`tel:${charity.phone}`}
                        className="text-emerald-600 hover:underline"
                      >
                        {charity.phone}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Charities Carousel */}
            {relatedCharities.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    You might also like
                  </h2>
                  <Link
                    href="/charities"
                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-1"
                  >
                    View all
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>

                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {relatedCharities.map((related: Charity) => (
                      <CarouselItem
                        key={related.id}
                        className="pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <Link
                          href={`/charities/${related.id}`}
                          className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full"
                        >
                          <div className="relative h-40 overflow-hidden">
                            <img
                              src={related.logo}
                              alt={related.name}
                              className="w-full h-full object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-gray-800 line-clamp-1">
                                {related.name}
                              </h3>
                              {related.verified && (
                                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-gray-600 text-sm line-clamp-2">
                              {related.description}
                            </p>
                            <div className="mt-3 text-emerald-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                              Learn more
                              <ArrowLeft className="w-3 h-3 rotate-180" />
                            </div>
                          </div>
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-3" />
                  <CarouselNext className="hidden md:flex -right-3" />
                </Carousel>
              </div>
            )}
          </div>
        </div>

        {/* Support Modal - Full width */}
        <Dialog open={isSupportModalOpen} onOpenChange={setIsSupportModalOpen}>
          <DialogContent className="w-[95vw] max-w-[70vw] md:w-[90vw] md:max-w-[90vw] lg:w-[85vw] lg:max-w-[85vw] xl:w-[80vw] xl:max-w-[80vw] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Support {charity.name}</DialogTitle>
              <DialogDescription>
                Fill out the form below to submit your support request or donation.
              </DialogDescription>
            </DialogHeader>
            <CharityForm onSuccess={() => setIsSupportModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}