// app/donation/cancel/page.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function DonationCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-12 text-center shadow-lg">
        <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Donation Cancelled</h1>
        <p className="text-gray-600 mb-2">
          You cancelled the payment. No charges were made.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          You can try again whenever you're ready.
        </p>
        <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
          <Link href="/campaigns">Try Again</Link>
        </Button>
      </div>
    </div>
  );
}