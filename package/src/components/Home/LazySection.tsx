'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type LazySectionProps = {
  children: ReactNode
  sectionId?: string
  minHeight?: number
  rootMargin?: string
  className?: string
}

const SectionPlaceholder = ({ minHeight }: { minHeight: number }) => {
  return (
    <section aria-hidden='true' className='bg-background'>
      <div className='container px-4 py-16 md:py-24'>
        <div
          className='relative overflow-hidden rounded-[32px] border border-white/8 bg-white/[0.03]'
          style={{ minHeight }}>
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(22,199,132,0.16),transparent_55%)]' />
          <div className='absolute inset-x-8 top-8 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent' />
          <div className='absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent' />
        </div>
      </div>
    </section>
  )
}

const LazySection = ({
  children,
  sectionId,
  minHeight = 520,
  rootMargin = '320px 0px',
  className,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const matchesHash = () => {
      if (!sectionId) {
        return false
      }

      return window.location.hash.replace(/^#/, '') === sectionId
    }

    if (matchesHash()) {
      setShouldRender(true)
      return
    }

    const node = ref.current

    if (!node || !(window as Window & typeof globalThis).IntersectionObserver) {
      setShouldRender(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold: 0.01,
      },
    )

    const handleHashChange = () => {
      if (matchesHash()) {
        setShouldRender(true)
      }
    }

    observer.observe(node)
    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [rootMargin, sectionId])

  return (
    <div
      id={sectionId}
      ref={ref}
      className={['scroll-mt-24', className].filter(Boolean).join(' ')}>
      {shouldRender ? children : <SectionPlaceholder minHeight={minHeight} />}
    </div>
  )
}

export default LazySection