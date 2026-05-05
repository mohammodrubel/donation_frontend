"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { PaginationBar } from "@/components/share/PaginationBar";
import { useGetCharitiesQuery } from "@/lib/reudx/fetchers/charity/charityApi";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  ExternalLink,
  Search,
  Loader2,
} from "lucide-react";

export default function CharitiesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading } = useGetCharitiesQuery({ page, limit, search });
  const charities = (data?.data || []).filter((c: any) => c.active);
  const meta = data?.meta;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-12">
          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Making a Difference Together
            </h1>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover and support verified charities working tirelessly to create positive change in communities worldwide.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search charities..."
              className="pl-10 rounded-full bg-white shadow-sm border-gray-200"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : charities.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-600">
                {search ? `No matches for "${search}"` : "No active charities at the moment"}
              </h2>
              <p className="text-gray-500 mt-2">Please check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {charities.map((charity: any) => (
                <div
                  key={charity.id}
                  className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={charity.banner || charity.logo}
                      alt={charity.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {charity.verified && (
                      <div className="absolute top-4 right-4 bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}

                    <div className="absolute -bottom-8 left-4">
                      <div className="w-16 h-16 rounded-xl bg-white shadow-lg p-1 ring-4 ring-white">
                        <img
                          src={charity.logo}
                          alt={`${charity.name} logo`}
                          className="w-full h-full object-contain rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-10">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {charity.name}
                      </h2>
                    </div>

                    {charity.mission && (
                      <div
                        className="text-sm text-emerald-700 font-medium mb-3 italic line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: `"${charity.mission}"` }}
                      />
                    )}

                    <div
                      className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: charity.description || "" }}
                    />

                    <div className="space-y-2 mb-4 text-xs text-gray-500">
                      {charity.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                          <span className="truncate">{charity.address}</span>
                        </div>
                      )}
                      {charity.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                          <a
                            href={`mailto:${charity.email}`}
                            className="hover:text-emerald-600 transition truncate"
                          >
                            {charity.email}
                          </a>
                        </div>
                      )}
                      {charity.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                          <a href={`tel:${charity.phone}`} className="hover:text-emerald-600 transition">
                            {charity.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                      <Link
                        href={`/charity/${charity.id}`}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors flex-1"
                      >
                        Learn More
                        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                      </Link>

                      {charity.website && (
                        <a
                          href={charity.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Visit
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-2 ring-emerald-400/50 ring-offset-0" />
                </div>
              ))}
            </div>
          )}

          {meta && (
            <PaginationBar
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={(p) => {
                setPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
