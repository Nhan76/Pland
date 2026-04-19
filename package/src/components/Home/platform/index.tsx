import dynamic from 'next/dynamic';

const CrossModuleIntelligenceIllustration = dynamic(
  () => import('./CrossModuleIntelligenceIllustration'),
  {
    ssr: false,
    loading: () => (
      <div className="w-[700px] h-[550px] bg-background/5 rounded-lg animate-pulse" />
    ),
  }
);

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
            <CrossModuleIntelligenceIllustration />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Platform;
