"use client"

import ScrollRevealQuote from './ScrollRevealQuote'
import BentoGrid from '../BentoGrid'

const Mission = () => {
  return (
    <section className='relative py-16 md:py-24'>
      <div className='container'>
        <div className='mx-auto max-w-6xl'>
          <ScrollRevealQuote />
          <BentoGrid />
        </div>
      </div>
    </section>
  )
}

export default Mission