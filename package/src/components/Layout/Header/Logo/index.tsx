import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/" aria-label="Pland home" className="inline-flex items-center">
      <Image
        src="/logo.svg"
        alt="Pland"
        width={1334}
        height={486}
        priority
        className="h-auto w-20 sm:w-24"
      />
    </Link>
  );
};

export default Logo;
