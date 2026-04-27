import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CampaignDetails } from '@/components/CampaignDetails'
import { campaigns } from '@/lib/mockData'

export const metadata = {
  title: 'Campaign Details - DonateBridge',
  description: 'View detailed information about a campaign and make a donation.',
}

export default function CampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = React.use(params)
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <CampaignDetails id={id} />
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return campaigns.map((campaign) => ({
    id: campaign.id,
  }))
}
