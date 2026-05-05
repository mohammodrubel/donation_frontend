"use client";

import { useEffect, useState } from "react";
import {
  useGetInquiriesQuery,
  useUpdateInquiryStatusMutation,
  useDeleteInquiryMutation,
} from "@/lib/reudx/fetchers/charityInquiry/charityInquiryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Search, Trash2, Eye } from "lucide-react";
import { PaginationBar } from "@/components/share/PaginationBar";

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-amber-100 text-amber-700" },
  responded: { label: "Responded", className: "bg-blue-100 text-blue-700" },
  resolved: { label: "Resolved", className: "bg-green-100 text-green-700" },
  archived: { label: "Archived", className: "bg-gray-100 text-gray-700" },
};

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  charity?: { id: string; name: string; logo: string };
};

export default function InquiriesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useGetInquiriesQuery({
    page,
    limit,
    search,
    status: statusFilter !== "all" ? (statusFilter as any) : undefined,
  });

  const [updateStatus, { isLoading: isUpdating }] = useUpdateInquiryStatusMutation();
  const [deleteInquiry, { isLoading: isDeleting }] = useDeleteInquiryMutation();

  const inquiries: Inquiry[] = data?.data || [];
  const meta = data?.meta;

  // debounce search input → search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  // reset to page 1 when status filter changes
  useEffect(() => {
    setPage(1);
  }, [statusFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch {
      alert("Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInquiry(deleteId).unwrap();
      setDeleteId(null);
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Card className="border shadow-sm">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold">Charity Inquiries</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Messages submitted by users from charity pages.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, subject…"
                  className="pl-8 w-full sm:w-72"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : inquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No inquiries found.
            </div>
          ) : (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Name</TableHead>
                    <TableHead>Charity</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="w-[140px]">Status</TableHead>
                    <TableHead className="w-[140px]">Received</TableHead>
                    <TableHead className="w-[140px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell>
                        <p className="font-medium">{inq.name}</p>
                        <p className="text-xs text-muted-foreground">{inq.email}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{inq.charity?.name || "—"}</p>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="line-clamp-1">{inq.subject}</p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={inq.status}
                          onValueChange={(v) => handleStatusChange(inq.id, v)}
                          disabled={isUpdating}
                        >
                          <SelectTrigger className="h-8 w-32">
                            <SelectValue>
                              <Badge
                                variant="outline"
                                className={STATUS_LABELS[inq.status]?.className}
                              >
                                {STATUS_LABELS[inq.status]?.label || inq.status}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="responded">Responded</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs text-muted-foreground">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </p>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setSelected(inq)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(inq.id)}
                            disabled={isDeleting}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {meta && (
            <PaginationBar
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          )}

          {isFetching && !isLoading && (
            <p className="text-xs text-muted-foreground mt-2">Updating…</p>
          )}
        </CardContent>
      </Card>

      {/* View modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Inquiry from {selected?.name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">FROM</p>
                <p>{selected.name}</p>
                <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                  {selected.email}
                </a>
                {selected.phone && <p className="text-muted-foreground">{selected.phone}</p>}
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">CHARITY</p>
                <p>{selected.charity?.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">SUBJECT</p>
                <p className="font-medium">{selected.subject}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">MESSAGE</p>
                <p className="whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground">RECEIVED</p>
                <p>{new Date(selected.createdAt).toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      {deleteId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setDeleteId(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold mb-2">Delete this inquiry?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteId(null)} disabled={isDeleting}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
