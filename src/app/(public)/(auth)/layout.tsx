export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-amber-50 overflow-hidden">
      {/* Decorative top-left SVGs */}
      <img
        src="/auth-page/tl-black.svg"
        alt="decoration"
        className="absolute -top-14 -left-5 w-48 h-48 sm:-top-20 sm:w-64 sm:h-64 md:-top-25 md:w-80 md:h-80 z-1 pointer-events-none"
      />
      <img
        src="/auth-page/tl-brown.svg"
        alt="decoration"
        className="absolute top-0 -left-15 w-56 h-56 sm:-left-16 sm:w-64 sm:h-64 md:-left-22 md:w-80 md:h-80 pointer-events-none"
      />

      {/* Decorative top-right SVGs */}
      <img
        src="/auth-page/tr-orange.svg"
        alt="decoration"
        className="absolute top-0 -right-10 w-40 sm:-right-16 sm:w-56 md:-right-25 md:w-72 h-auto pointer-events-none"
      />
      <img
        src="/auth-page/tr-brown.svg"
        alt="decoration"
        className="absolute top-8 -right-10 w-28 sm:top-12 sm:-right-16 sm:w-40 md:top-14 md:-right-25 md:w-56 h-auto pointer-events-none"
      />

      {/* Decorative bottom-right SVGs */}
      <img
        src="/auth-page/br-orange.svg"
        alt="decoration"
        className="absolute bottom-0 -right-10 w-56 sm:-right-16 sm:w-64 md:-right-24 md:w-md h-auto pointer-events-none"
      />
      <img
        src="/auth-page/br-black.svg"
        alt="decoration"
        className="absolute -bottom-6 right-14 w-24 sm:-bottom-8 sm:right-24 sm:w-32 md:-bottom-10 md:right-44 md:w-52 h-auto pointer-events-none"
      />

      {/* Decorative bottom-left SVGs */}
      <img
        src="/auth-page/bl-orange.svg"
        alt="decoration"
        className="absolute bottom-0 -left-10 w-56 sm:-left-16 sm:w-64 md:-left-24 md:w-md h-auto pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-dvh px-4 py-4 md:py-8">
        <div className="flex items-center justify-center gap-20 w-full max-w-6xl">
          {/* Cat Box Image */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <img
              src="/cat-box.png"
              alt="cat-box"
              className="w-full h-auto max-w-sm"
            />
          </div>

          {/* Form */}
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
