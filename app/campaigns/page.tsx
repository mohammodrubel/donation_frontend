import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CampaignListing } from '@/components/CampaignListing'

export const metadata = {
  title: 'Campaigns - DonateBridge',
  description: 'Browse all verified NGO campaigns and find causes you want to support.',
}

export default function CampaignsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <CampaignListing />
      </main>
      <Footer />
    </div>
  )
}
