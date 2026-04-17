import { brandList } from './data';
import Image from 'next/image';
import type { CSSProperties } from 'react';

const marqueeStyle = {
  '--brand-marquee-duration': `${brandList.length * 3}s`,
} as CSSProperties;

function BrandLogo() {
    return (
        <section>
            <div className="2xl:py-20 py-11">
                <div className="container">
                    <div className="gap-4">
                        <div className="flex justify-center text-center py-4 relative">
                            <p className="text-white font-medium">
                                Built around <span className='text-primary'>familiar product workflows</span>
                            </p>
                        </div>

                        <div className="py-3 Xsm:py-7">
                            <div className="relative overflow-hidden">
                                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-background to-transparent sm:w-20" />
                                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-background to-transparent sm:w-20" />

                                <div
                                    className="flex w-max animate-market-marquee will-change-transform motion-reduce:animate-none hover:paused"
                                    style={marqueeStyle}
                                >
                                    {[0, 1].map((groupIndex) => (
                                        <div
                                            key={groupIndex}
                                            aria-hidden={groupIndex === 1}
                                            className="flex shrink-0 gap-10 pr-10"
                                        >
                                            {brandList.map((item, index) => (
                                                <div
                                                    key={`${groupIndex}-${index}`}
                                                    className="flex items-center w-[135px]"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt="logo"
                                                        width={135}
                                                        height={35}
                                                        className="w-full h-auto"
                                                        sizes="(max-width: 640px) 120px, 135px"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BrandLogo;
