import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { MoneyDonationForm } from '@/components/MoneyDonationForm'

export const metadata = {
  title: 'Donate Money - DonateBridge',
  description: 'Make a monetary donation to support verified NGO campaigns for education, health, disaster relief, food security, and water access.',
}

export default function DonateMoneyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Donate Money</h1>
          <p className="text-foreground/70">
            Every donation directly supports verified campaigns making real impact. Choose your cause and donation amount.
          </p>
        </div>
        <MoneyDonationForm />
      </main>
      <Footer />
    </div>
  )
}
