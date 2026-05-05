"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { PaginationBar } from "@/components/share/PaginationBar";
import { useGetMyDonationsQuery } from "@/lib/reudx/fetchers/donation/donationApi";

export default function Page() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isLoading } = useGetMyDonationsQuery({ page, limit, search });

  const donations = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h2 className="text-lg font-semibold">My Donations</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by campaign or transaction…"
            className="pl-8 w-full sm:w-72"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Campaign</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                Loading…
              </TableCell>
            </TableRow>
          ) : donations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No donations found
              </TableCell>
            </TableRow>
          ) : (
            donations.map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                <TableCell>{item?.campaign?.title}</TableCell>
                <TableCell>৳ {item.amount}</TableCell>
                <TableCell>৳ {item?.payment?.amount}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {meta && (
        <PaginationBar
          page={meta.page}
          totalPages={meta.totalPages}
          total={meta.total}
          limit={meta.limit}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
