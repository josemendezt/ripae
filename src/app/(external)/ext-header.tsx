import Image from 'next/image';

export default function ExtHeader() {
  return (
    <header className="flex justify-center bg-primary w-full h-20 items-center px-4 md:px-6 pb-4">
      <Image
        alt="Ripae Logo"
        height="50"
        src="/RIVENFI_white.svg"
        width="100"
      />
    </header>
  );
}
