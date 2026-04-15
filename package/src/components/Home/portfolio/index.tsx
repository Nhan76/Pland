'use client'
import Image from 'next/image'

const Portfolio = () => {
  return (
    <section className='pt-0 pb-0 md:pt-0 md:pb-0'>
      <div className='container px-4 sm:px-6'>
        <div className='grid lg:grid-cols-2 items-center gap-12 lg:gap-16'>
          <div className='lg:-ml-20'>
            <Image
              src='/images/portfolio/img-portfolio.png'
              alt='Crypto Portfolio'
              width={780}
              height={700}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div
            className='max-w-2xl'
          >
            <p className='text-white font-medium'>
              Core <span className='text-primary'>capabilities</span>
            </p>
            <h2 className='text-white sm:text-[40px] text-3xl mt-4 leading-tight'>
              Everything needed to evaluate the whole portfolio
            </h2>
            <p className='text-muted/60 text-lg mt-6'>
              PLAND brings position syncing, structured analysis, and
              explainable recommendations into one disciplined workspace.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
