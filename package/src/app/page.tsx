
import { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import Mission from '@/components/Home/Mission'
import Work from '@/components/Home/work'
import Platform from '@/components/Home/platform'
import Portfolio from '@/components/Home/portfolio'
import Upgrade from '@/components/Home/upgrade'
import Perks from '@/components/Home/perks'
import GlobalReach from '@/components/Home/GlobalReach'
import Faq from '@/components/Home/Faq'

export const metadata: Metadata = {
  title: 'PLAND | AI Portfolio Discipline',
  description:
    'PLAND helps crypto investors evaluate portfolios with explainable AI, market context, and disciplined risk guardrails.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Mission />
      <Work />
      <GlobalReach/>
      <Platform />
      <Portfolio />
      <Upgrade />
      <Perks />
      <Faq/>
    </main>
  )
}
