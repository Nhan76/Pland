'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Work = () => {
  const services = [
    {
      icon: '/images/chooseus/chooseus-icon-1.svg',
      text: 'Bring positions, prices, and portfolio state into one consistent snapshot.',
    },
    {
      icon: '/images/chooseus/chooseus-icon-2.svg',
      text: 'Blend technical, sentiment, and structural signals before making a move.',
    },
    {
      icon: '/images/chooseus/chooseus-icon-3.svg',
      text: 'Understand the reasoning behind every recommendation before you act.',
    },
  ]

  return (
    <section className='' id='work'>
      <div className='container px-4 mx-auto lg:max-w-(--breakpoint-xl)'>
        <div className='grid grid-cols-12 items-center'>
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, amount: 0.3 }}
            className='lg:col-span-7 col-span-12'>
            <div className='flex flex-col gap-3'>
              <p className="text-white font-medium">
                Why choose <span className='text-primary'>PLAND</span>
              </p>
              <h2 className='sm:text-5xl text-3xl text-white lg:w-full md:w-70% font-medium'>
                A portfolio workspace that turns market noise into disciplined action
              </h2>
            </div>
            <div className='grid md:grid-cols-2 gap-7 mt-11'>
              {services.map((service, index) => (
                <div key={index} className='flex items-center gap-5'>
                  <div className='p-3 bg-primary/15 rounded-full'>
                    <Image
                      src={service.icon}
                      alt={`${service.text} icon`}
                      width={25}
                      height={25}
                      loading="lazy"
                    />
                  </div>
                  <p className='text-white font-medium'>{service.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <div className='lg:col-span-5 col-span-12'>
            <div className='2xl:-mr-40 mt-9 flex justify-center'>
              <Image
                src='/images/work/img-work-with-us.png'
                alt='Work with us illustration'
                width={600}
                height={425}
                className='lg:w-full'
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
