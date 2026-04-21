import { Header } from '@/components/Header'
import { HomePage } from '@/components/HomePage'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}
