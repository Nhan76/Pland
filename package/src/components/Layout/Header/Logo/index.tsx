import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      aria-label="Pland home"
      className="inline-flex items-center gap-3"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10">
        <span className="relative h-5 w-5">
          <span className="absolute left-0 top-0 h-3.5 w-3.5 rotate-45 rounded-[4px] bg-primary" />
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rotate-45 rounded-[4px] bg-white/85" />
        </span>
      </span>
      <span className="text-2xl font-semibold uppercase tracking-[0.16em] text-white">
        Pland
      </span>
    </Link>
  );
};

export default Logo;
