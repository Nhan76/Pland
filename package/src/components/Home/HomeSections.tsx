'use client'

import { lazy, useEffect } from 'react'

import LazySection from './LazySection'

/** Single source of truth for the below-the-fold section chunks. */
const sectionModules = {
  mission: () => import('@/components/Home/Mission'),
  platform: () => import('@/components/Home/platform'),
  portfolio: () => import('@/components/Home/portfolio'),
  riskManagement: () => import('@/components/Home/RiskManagement'),
  vipDashboard: () => import('@/components/Home/VIPDashboard'),
  perks: () => import('@/components/Home/perks'),
  faq: () => import('@/components/Home/Faq'),
}

const Mission = lazy(sectionModules.mission)
const Platform = lazy(sectionModules.platform)
const Portfolio = lazy(sectionModules.portfolio)
const RiskManagement = lazy(sectionModules.riskManagement)
const VIPDashboard = lazy(sectionModules.vipDashboard)
const Perks = lazy(sectionModules.perks)
const Faq = lazy(sectionModules.faq)

const whenIdle = () =>
  new Promise<void>((resolve) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => resolve(), { timeout: 2000 })
    } else {
      setTimeout(resolve, 200)
    }
  })

/** First signs of a visitor engaging with the page. */
const INTENT_EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'wheel', 'keydown', 'scroll'] as const

/**
 * On the visitor's first interaction (usually a mouse move or touch, well
 * before they scroll past the tall hero), download and evaluate the section
 * chunks one by one during idle time. Sections then only have to render when
 * they come into view, while a page-load audit — which never interacts — pays
 * nothing for them.
 */
const usePrefetchSections = () => {
  useEffect(() => {
    let isCancelled = false

    const prefetch = async () => {
      for (const load of Object.values(sectionModules)) {
        await whenIdle()

        if (isCancelled) {
          return
        }

        await load().catch(() => undefined)
      }
    }

    const startPrefetch = () => {
      removeListeners()
      void prefetch()
    }

    const removeListeners = () =>
      INTENT_EVENTS.forEach((type) => window.removeEventListener(type, startPrefetch))

    INTENT_EVENTS.forEach((type) =>
      window.addEventListener(type, startPrefetch, { passive: true }),
    )

    return () => {
      isCancelled = true
      removeListeners()
    }
  }, [])
}

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
  usePrefetchSections()

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
