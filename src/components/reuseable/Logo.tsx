// components/ui/Logo.tsx
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="w-20 ">
      <Image
        src="/assets/images/main/logo.png"
        alt="Logo"
        width={80}
        height={40}
        className="object-contain w-12 md:w-16"
      />
    </Link>
  );
};

export default Logo;