import Image from 'next/image';

export default function Component() {
  return (
    <header className="flex justify-center bg-primary w-full h-20 items-center px-4 md:px-6 pb-4">
      <Image
        alt="Ripae Logo"
        height="60"
        src="/logo.webp"
        width="150"
      />
    </header>
  );
}
