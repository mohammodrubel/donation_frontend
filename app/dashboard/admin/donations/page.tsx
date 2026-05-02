"use client";

import { useGetDonationsQuery } from "@/lib/reudx/fetchers/donation/donationApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const { data, isLoading, isError } = useGetDonationsQuery(undefined);

  if (isError) {
    return <div className="p-6 text-red-500">Something went wrong</div>;
  }

  const donations = data?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Donations</h2>

      <div className="rounded-xl border p-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Donor</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              // Skeleton rows
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                  <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
              ))
            ) : donations.length > 0 ? (
              donations.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.campaign?.title}</TableCell>
                  <TableCell>
                    <img
                      src={item.campaign?.image || "/placeholder.png"}
                      alt="campaign"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>{item.donorName}</TableCell>
                  <TableCell>{item.donorEmail}</TableCell>
                  <TableCell>${item.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === "paid"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6">
                  No Donations Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;