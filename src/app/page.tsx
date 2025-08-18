import { Suspense } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Templates from '@/components/Templates'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200" />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100" />}>
          <Features />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200" />}>
          <Templates />
        </Suspense>
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-100" />}>
          <CTASection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
