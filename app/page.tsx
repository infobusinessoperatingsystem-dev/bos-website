'use client'

import Header from '@/components/header'
import HeroSection from '@/components/hero'
import ServicesSection from '@/components/services'
import FeaturesSection from '@/components/features'
import CTASection from '@/components/cta'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </>
  )
}
