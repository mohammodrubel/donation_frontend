'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useConfirmPaymentMutation } from '@/lib/reudx/fetchers/payment/paymentAPi';

export default function DonationSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  const [confirmPayment, { isLoading, isError, isSuccess, error }] = useConfirmPaymentMutation();

  useEffect(() => {
    if (!sessionId) {
      // session_id না থাকলে হোমে রিডাইরেক্ট করুন
      router.push('/');
      return;
    }

    // মিউটেশন কল করুন
    confirmPayment(sessionId);
  }, [sessionId, confirmPayment, router]);

  // লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-700">Confirming your donation...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we verify your payment.</p>
        </div>
      </div>
    );
  }

  // এরর স্টেট
  if (isError) {
    console.error('Confirmation error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-rose-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center shadow-lg">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h1>
          <p className="text-gray-600 mb-2">We couldn't confirm your donation at this time.</p>
          <p className="text-sm text-gray-500 mb-6">
            If the amount was deducted, please contact support with your session ID:<br />
            <span className="font-mono text-xs break-all">{sessionId}</span>
          </p>
          <Button asChild className="w-full">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    );
  }

  // সাকসেস স্টেট
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 sm:p-12 text-center shadow-lg">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Thank You! 🎉</h1>
          <p className="text-lg text-gray-700 mb-2">Your donation has been successfully recorded.</p>
          <p className="text-gray-500 mb-8">A confirmation email has been sent to your inbox.</p>
          <div className="space-y-3">
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <Link href="/campaigns">Explore More Campaigns</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback (should not reach here)
  return null;
}