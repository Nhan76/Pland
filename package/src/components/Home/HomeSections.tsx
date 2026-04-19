'use client'

import dynamic from 'next/dynamic'

import LazySection from './LazySection'

const Mission = dynamic(() => import('@/components/Home/Mission'))
const Platform = dynamic(() => import('@/components/Home/platform'))
const Portfolio = dynamic(() => import('@/components/Home/portfolio'))
const RiskManagement = dynamic(() => import('@/components/Home/RiskManagement'))
const VIPDashboard = dynamic(() => import('@/components/Home/VIPDashboard'))
const Perks = dynamic(() => import('@/components/Home/perks'))
const Faq = dynamic(() => import('@/components/Home/Faq'))

const SectionDivider = () => {
  return (
    <div className='relative mx-auto my-12 w-full max-w-5xl px-4 md:my-20'>
      <div className='absolute top-0 left-0 h-px w-full bg-linear-to-r from-transparent via-white/40 to-transparent' />
      <div className='absolute top-0 left-1/2 h-1.5 w-3/4 -translate-x-1/2 -translate-y-1/2 bg-linear-to-r from-transparent via-primary to-transparent opacity-80 blur-sm' />
      <div className='absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_30px_rgba(var(--primary),0.8)]' />
    </div>
  )
}

const HomeSections = () => {
  return (
    <>
      <LazySection sectionId='mission' minHeight={920} rootMargin='160px 0px'>
        <Mission />
        <SectionDivider />
      </LazySection>

      <LazySection sectionId='platform' minHeight={500}>
        <Platform />
      </LazySection>

      <LazySection sectionId='portfolio' minHeight={640}>
        <Portfolio />
      </LazySection>

      <LazySection sectionId='alerts' minHeight={520}>
        <RiskManagement />
      </LazySection>

      <LazySection sectionId='guardrails' minHeight={680}>
        <VIPDashboard />
      </LazySection>

      <LazySection sectionId='perks' minHeight={620}>
        <Perks />
      </LazySection>

      <LazySection sectionId='faq' minHeight={520}>
        <Faq />
      </LazySection>
    </>
  )
}

export default HomeSections