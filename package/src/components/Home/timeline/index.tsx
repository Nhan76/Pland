'use client'
import Image from 'next/image'
import { timelineData } from '@/app/api/data'
import { motion } from 'framer-motion'

const TimeLine = () => {
  return (
    <section className='md:pt-40 pt-9' id='development'>
      <div className='container lg:px-16 px-4'>
        <div className='text-center'>
          <motion.div
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.6 }}>
            <div className='flex flex-col gap-4'>
              <p className='text-white font-medium'>
                From signal to <span className='text-primary'>decision</span>
              </p>
              <h2 className='text-white sm:text-5xl text-3xl font-medium lg:w-80% mx-auto mb-20'>
                A disciplined workflow for evaluating the whole portfolio
              </h2>
            </div>
          </motion.div>
          <div>
            <div className='md:block hidden relative'>
              <div>
                <Image
                  src='/images/timeline/img-timeline.png'
                  alt='Timeline workflow diagram'
                  width={1220}
                  height={1000}
                  className='w-80% mx-auto'
                  loading="lazy"
                  sizes="(max-width: 768px) 0vw, 80vw"
                />
              </div>
              <div className='absolute lg::top-40 top-36 lg:left-0 -left-20 w-72 flex items-center gap-6'>
                <div className='text-right'>
                  <h3 className='text-muted text-2xl mb-3'>Sync and snapshot</h3>
                  <p className='text-lg text-muted/60'>
                    Lock holdings and price context into one consistent review state
                  </p>
                </div>
                <div className='bg-primary/15 backdrop-blur-xs px-6 py-2 h-fit rounded-full'>
                  <Image
                    src='/images/solution/solution-icon-1.svg'
                    alt='Planning'
                    width={44}
                    height={44}
                    className='w-16 h-16 '
                    loading="lazy"
                  />
                </div>
              </div>
              <div className='absolute lg:top-40 top-36 lg:right-0 -right-20 w-72 flex items-center gap-6'>
                <div className='bg-primary/15 backdrop-blur-xs p-6 h-fit rounded-full'>
                  <Image
                    src='/images/solution/solution-icon-2.svg'
                    alt='Analyze context'
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                </div>
                <div className='text-left'>
                  <h3 className='text-muted text-2xl mb-3'>Analyze context</h3>
                  <p className='text-lg text-muted/60'>
                    Combine technical, sentiment, and portfolio structure signals
                  </p>
                </div>
              </div>
              <div className='absolute lg:bottom-48 bottom-36 lg:left-0 -left-20 w-72 flex items-center gap-6'>
                <div className='text-right'>
                  <h3 className='text-muted text-2xl mb-3'>Debate the trade</h3>
                  <p className='text-lg text-muted/60'>
                    Bull and bear agents challenge the case before a manager responds
                  </p>
                </div>
                <div className='bg-primary/15 backdrop-blur-xs px-6 py-2 h-fit rounded-full'>
                  <Image
                    src='/images/solution/solution-icon-3.svg'
                    alt='Debate the trade'
                    width={44}
                    height={44}
                    className='w-16 h-16 '
                    loading="lazy"
                  />
                </div>
              </div>
              <div className='absolute lg:bottom-48 bottom-36 lg:right-0 -right-20 w-72 flex items-center gap-6'>
                <div className='bg-primary/15 backdrop-blur-xs px-6 py-2 h-fit rounded-full'>
                  <Image
                    src='/images/solution/solution-icon-4.svg'
                    alt='Apply guardrails'
                    width={44}
                    height={44}
                    className='w-16 h-16'
                    loading="lazy"
                  />
                </div>
                <div className='text-left'>
                  <h3 className='text-muted text-nowrap text-2xl mb-3'>
                    Apply guardrails
                  </h3>
                  <p className='text-lg text-muted/60'>
                    Risk rules test exposure, cash, and concentration before any action
                  </p>
                </div>
              </div>
            </div>
            <div className='grid sm:grid-cols-2 gap-8 md:hidden'>
              {timelineData.map((item, index) => (
                <div key={index} className='flex items-center gap-6'>
                  <div className='bg-primary/15 p-6 rounded-full'>
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={44}
                      height={44}
                      loading="lazy"
                    />
                  </div>
                  <div className='text-start'>
                    <h4 className='text-2xl text-muted mb-2'>{item.title}</h4>
                    <p className='text-muted/60 text-lg'>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TimeLine
