import Image from 'next/image';

const Platform = () => {
  return (
    <section className="pt-16 pb-0 md:pt-24 md:pb-0 relative z-1">
      <div className="container px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-2xl">
            <p className="text-white font-medium">
              AI <span className="text-primary">feature</span>
            </p>
            <h2 className="mt-4 text-white text-2xl sm:text-[40px]">
              Cross-module intelligence for every portfolio review
            </h2>
            <p className="mt-6 text-sm sm:text-lg text-muted/60">
              PLAND connects positions, signals, and history into one
              explainable AI view for consistent portfolio decisions.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/*
              Served as a static, cacheable SVG (its flow animations live in the
              file). As an image it stays out of the JS bundle, reserves its
              space via width/height, and is not animated while off screen.
            */}
            <Image
              src="/images/platform/cross-module-intelligence.svg"
              alt="Cross-module intelligence illustration"
              width={700}
              height={550}
              className="h-auto w-full max-w-160"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
