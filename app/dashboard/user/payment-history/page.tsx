"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyDonationsQuery } from "@/lib/reudx/fetchers/donation/donationApi";
import { useSelector } from "react-redux";

export default function Page() {
  const user = useSelector((state: any) => state?.auth?.user);

  const { data, isLoading } = useGetMyDonationsQuery(user?.id, {
    skip: !user?.id,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  const donations = data?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">My Donations</h2>

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
          {donations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            donations.map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
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
    </div>
  );
}