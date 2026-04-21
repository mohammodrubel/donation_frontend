import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ItemDonationForm } from '@/components/ItemDonationForm'

export const metadata = {
  title: 'Donate Items - DonateBridge',
  description: 'Donate physical items like clothing, books, medical supplies, and more to verified NGO campaigns.',
}

export default function DonateItemsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Donate Items</h1>
          <p className="text-foreground/70">
            Share physical items that can directly help those in need. From clothing to educational materials, your donations make a real difference.
          </p>
        </div>
        <ItemDonationForm />
      </main>
      <Footer />
    </div>
  )
}
