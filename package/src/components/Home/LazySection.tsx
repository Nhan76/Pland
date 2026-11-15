'use client'

import { useInView } from 'framer-motion'
import {
  Suspense,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'

import { cn } from '@/lib/utils'

type LazySectionProps = {
  children: ReactNode
  sectionId?: string
  minHeight?: number
  /** How far ahead of the viewport the section starts rendering. */
  rootMargin?: `${number}px ${number}px`
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

const useIsHashTarget = (sectionId?: string) => {
  const [isTarget, setIsTarget] = useState(false)

  useEffect(() => {
    if (!sectionId) {
      return
    }

    const syncHash = () => {
      if (window.location.hash === `#${sectionId}`) {
        setIsTarget(true)
      }
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => window.removeEventListener('hashchange', syncHash)
  }, [sectionId])

  return isTarget
}

/**
 * Renders its children only once they approach the viewport (or are the URL
 * hash target), then keeps them mounted.
 *
 * - The first render is deferred (`useDeferredValue`), so React renders the
 *   section in the background and yields to scrolling and input instead of
 *   blocking the main thread with one long task.
 * - While mounted but scrolled out of view the wrapper carries
 *   `data-offscreen`, which pauses the section's CSS animations (globals.css).
 */
const LazySection = ({
  children,
  sectionId,
  minHeight = 520,
  rootMargin = '320px 0px',
  className,
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const isNearViewport = useInView(ref, { once: true, margin: rootMargin })
  const isOnScreen = useInView(ref)
  const isHashTarget = useIsHashTarget(sectionId)
  const shouldRender = useDeferredValue(isNearViewport || isHashTarget)
  const placeholder = <SectionPlaceholder minHeight={minHeight} />

  return (
    <div
      id={sectionId}
      ref={ref}
      data-offscreen={shouldRender && !isOnScreen ? '' : undefined}
      className={cn('scroll-mt-24', className)}>
      {shouldRender ? <Suspense fallback={placeholder}>{children}</Suspense> : placeholder}
    </div>
  )
}

export default LazySection
