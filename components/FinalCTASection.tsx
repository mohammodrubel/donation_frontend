import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Gift, Smile } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary/95 to-secondary">
      <div className="max-w-4xl mx-auto text-center text-white space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Start Your Journey to Impact
          </h2>
          <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
            Whether you have money or items to give, every contribution changes lives. Choose your way to donate
            and join thousands of compassionate supporters.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-primary hover:bg-white/90 rounded-lg font-semibold h-12 px-8"
          >
            <Link href="/donate-money" className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Donate Money
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 rounded-lg font-semibold h-12 px-8"
          >
            <Link href="/donate-items" className="flex items-center gap-2">
              <Gift className="w-5 h-5" />
              Donate Items
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 rounded-lg font-semibold h-12 px-8"
          >
            <Link href="/fundraiser" className="flex items-center gap-2">
              <Smile className="w-5 h-5" />
              Start Fundraiser
            </Link>
          </Button>
        </div>

        <p className="text-sm opacity-75">
          100% transparent • Verified campaigns • Secure payments • Real impact
        </p>
      </div>
    </section>
  );
}