import Image from "next/image";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cateneo-white">
      {/* Top-left camo */}
      <Image
        src="/black-camo.svg"
        alt=""
        width={180}
        height={180}
        priority
        className="pointer-events-none absolute left-0 top-0 z-30 w-30 sm:w-32 md:w-40 lg:w-44"
      />

      {/* Top-right camo */}
      <Image
        src="/orange-camo.svg"
        alt=""
        width={220}
        height={220}
        priority
        className="pointer-events-none absolute right-0 top-0 z-30 w-50 sm:w-36 md:w-44 lg:w-52"
      />

      {/* Page content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
}
