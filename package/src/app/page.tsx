
import { Metadata } from 'next'
import Hero from '@/components/Home/Hero'
import HomeSections from '@/components/Home/HomeSections'

export const metadata: Metadata = {
  title: 'PLAND | AI Portfolio Discipline',
  description:
    'PLAND helps crypto investors evaluate portfolios with explainable AI, market context, and disciplined risk guardrails.',
}

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeSections />
    </main>
  )
}
