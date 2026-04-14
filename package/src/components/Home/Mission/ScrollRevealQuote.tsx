'use client'

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import { missionContent } from './data'

type RevealWordProps = {
  word: string
  progress: MotionValue<number>
  start: number
  end: number
  reduceMotion: boolean
}

const RevealWord = ({
  word,
  progress,
  start,
  end,
  reduceMotion,
}: RevealWordProps) => {
  const opacity = useTransform(progress, [start, end], [0.14, 1])
  const blur = useTransform(progress, [start, end], [6, 0])
  const filter = useTransform(blur, (value) => `blur(${value}px)`)
  const y = useTransform(progress, [start, end], [18, 0])

  if (reduceMotion) {
    return <span>{word}&nbsp;</span>
  }

  return (
    <motion.span
      className='inline-block will-change-transform'
      style={{
        opacity,
        filter,
        y,
      }}>
      {word}&nbsp;
    </motion.span>
  )
}

const ScrollRevealQuote = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduceMotion = useReducedMotion()
  const words = missionContent.quote.split(' ')
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 82%', 'end 45%'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [4, 0])

  return (
    <div ref={ref} className='relative'>
      <motion.blockquote
        style={{ rotate: reduceMotion ? 0 : rotate }}
        className='relative text-white'>
        <p className='text-xl font-medium leading-tight sm:text-3xl lg:text-[3rem] lg:leading-[1.14]'>
          {words.map((word, index) => {
            const start = (index / words.length) * 0.72
            const end = Math.min(start + 0.22, 1)

            return (
              <RevealWord
                key={`${word}-${index}`}
                word={word}
                progress={scrollYProgress}
                start={start}
                end={end}
                reduceMotion={Boolean(reduceMotion)}
              />
            )
          })}
        </p>
      </motion.blockquote>
    </div>
  )
}

export default ScrollRevealQuote