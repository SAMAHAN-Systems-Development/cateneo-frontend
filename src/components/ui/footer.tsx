import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="relative w-full min-h-auto mx-auto pt-14 sm:pt-16 md:pt-20 lg:pt-10 text-cateneo-black font-gaegu flex flex-col items-center text-center gap-19 lg:gap-1 bg-cateneo-white overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full">
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="block w-full h-12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,40 
           C60,20 120,55 180,35
           C240,15 300,50 360,38
           C420,25 480,52 540,40
           C600,28 660,55 720,36
           C780,18 840,48 900,34
           C960,22 1020,50 1080,38
           C1140,30 1170,45 1200,35"
            fill="none"
            stroke="#924f1d"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Main content wrapper — full width with horizontal padding */}
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 lg:flex lg:flex-row lg:justify-center">
        <div className="flex flex-col lg:gap-6 w-full">
          {/* Brand block */}
          <div className="flex flex-col items-center lg:items-start lg:text-left gap-6 lg:gap-2 md:mt-20 lg:pl-10">
            <div className="flex flex-row gap-2 sm:mt-20 md:mt-0 lg:mt-0">
              <Image
                src="/footer-ateneo-logo.svg"
                alt="Footer Ateneo logo"
                width={75}
                height={75}
                className="w-[75px] h-[75px] lg:w-[60px] lg:h-[60px]"
              />
              <Image
                src="/footer-cateneo-logo.svg"
                alt="Footer Cateneo logo"
                width={75}
                height={75}
                className="w-[75px] h-[75px] lg:w-[60px] lg:h-[60px]"
              />

              {/* TITLE & SUBHEADING — LG TO 2XL */}
              <div className="hidden lg:flex flex-row items-center gap-2">
                <h1 className="lg:text-[40px] font-playpen font-black lg:text-left lg:self-end lg:text-cateneo-darkbrown">
                  CATeneo
                </h1>
                <Image
                  src="/footer-paw-1.svg"
                  alt="Footer Cateneo paw"
                  width={30}
                  height={30}
                />
              </div>
            </div>
            <p className="hidden lg:block lg:text-[14px] xl:text-[16px] lg:text-left text-cateneo-darkbrown">
              A socio-civic organization under the Council of Organizations of
              Ateneo de Davao University
            </p>

            {/* TITLE & SUBHEADING — SM TO MD */}
            <div className="lg:hidden flex flex-col items-center">
              <div className="flex items-center gap-2">
                <h1 className="text-[44px] font-playpen font-black mb-2">
                  CATeneo
                </h1>
                <Image
                  src="/footer-paw-1.svg"
                  alt="Footer Cateneo paw"
                  width={40}
                  height={40}
                  className="w-6 sm:w-8 md:w-[60px] h-6 sm:h-8 md:h-[60px]"
                />
              </div>
              <p className="text-[20px] lg:text-[16px] xl:text-[18px] leading-[1.4] max-w-xs md:max-w-xl mb-15">
                A socio-civic organization under the Council of Organizations of
                Ateneo de Davao University
              </p>
            </div>
          </div>

          {/* Links / Address / Email / Socials row */}
          <div className="relative w-full pl-16 sm:pl-20 md:pl-24 pr-16 sm:pr-20 md:pr-24 ">
            <Image
              src="/footer-paw-3.svg"
              alt=""
              aria-hidden
              width={175}
              height={175}
              className="absolute -left-8 sm:-left-12 md:-left-16 pointer-events-none select-none w-20 sm:w-24 md:w-[175px] h-20 sm:h-24 md:h-[175px] lg:hidden"
            />

            {/* Spread columns across the full width on lg+ */}
            <div className="flex flex-col gap-10 sm:gap-15 md:gap-10 lg:gap-16 w-full mx-auto lg:flex-row lg:items-start lg:justify-start md:mt-10 sm:mt-10 lg:mt-0">
              {/* Quick Links */}
              <div className="flex flex-col items-center w-auto text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] lg:text-[16px] xl:text-[18px] font-playpen mb-2">
                  Quick Links
                </h1>
                <Link
                  href="/about"
                  className="text-[20px] lg:text-[16px] xl:text-[18px] font-gaegu font-bold text-cateneo-lightbrown hover:text-cateneo-darkbrown transition-colors block"
                >
                  About
                </Link>
                <Link
                  href="/cat-directory"
                  className="text-[20px] lg:text-[16px] xl:text-[18px] font-gaegu font-bold text-cateneo-lightbrown hover:text-cateneo-darkbrown transition-colors block"
                >
                  Cat Directory
                </Link>
                <Link
                  href="/faq"
                  className="text-[20px] lg:text-[16px] xl:text-[18px] text-cateneo-lightbrown font-gaegu font-bold hover:text-cateneo-darkbrown transition-colors block"
                >
                  FAQ
                </Link>
              </div>

              {/* Address */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] lg:text-[16px] xl:text-[18px] font-playpen  mb-2">
                  Address
                </h1>
                <p className="text-[20px] lg:text-[16px] xl:text-[18px]  font-gaegu font-bold text-cateneo-lightbrown w-55">
                  Mezzanine Level, Martin Building Ateneo de Davao University E.
                  Jacinto Street, Davao City 8000
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] lg:text-[16px] xl:text-[18px] font-playpen  mb-2">
                  Email
                </h1>
                <a
                  href="mailto:cateneo@addu.edu.ph"
                  className="text-[20px] lg:text-[16px] xl:text-[18px] font-gaegu font-bold text-cateneo-lightbrown hover:text-cateneo-darkbrown transition-colors"
                >
                  cateneo@addu.edu.ph
                </a>
              </div>

              {/* Socials */}
              <div>
                <Image
                  src="/footer-paw-2.svg"
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="absolute -right-8 sm:-right-12 md:-right-16 pointer-events-none select-none w-16 sm:w-20 md:w-[120px] h-16 sm:h-20 md:h-[120px] lg:hidden"
                />
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <h1 className="text-[20px] lg:text-[16px] xl:text-[18px] font-playpen  mb-2">
                    Socials
                  </h1>
                  <div className="flex flex-row items-center justify-center gap-4 mt-1 lg:justify-start">
                    <Link
                      href="https://www.facebook.com/AdDUCATeneo/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="text-cateneo-lightbrown"
                    >
                      <span className="block text-[32px] lg:text-[24px] xl:text-[24px]">
                        <FaFacebook />
                      </span>
                    </Link>
                    <Link
                      href="https://www.instagram.com/addu_cateneo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-cateneo-lightbrown"
                    >
                      <span className="block text-[32px] lg:text-[24px] xl:text-[24px]">
                        <FaInstagram />
                      </span>
                    </Link>
                    <Link
                      href="https://tiktok.com/@addu_cateneo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-cateneo-lightbrown"
                    >
                      <span className="block text-[32px] lg:text-[24px] xl:text-[24px]">
                        <FaTiktok />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Image
            src="/footer-cat-string.svg"
            alt="Footer Cateneo string"
            width={1000}
            height={80}
            className="mt-30 absolute-full h-auto max-w-full lg:hidden"
            sizes="100vw"
          />

          {/* Credit line */}
          <div className="w-full text-center text-[14px] sm:text-[16px] md:text-[18px] lg:text-[16px] text-cateneo-lightbrown md:max-w-lg md:mx-auto lg:max-w-none lg:mx-0 lg:flex lg:justify-end lg:text-right lg:px-0 lg:mr-0 mt-4 md:mt-8 lg:mt-15 lg:-translate-x-40 lg:translate-y-28">
            <span className="whitespace-nowrap">
              Developed by{" "}
              <b className="font-bold font-playpen">
                SAMAHAN Systems Development
              </b>
            </span>
          </div>
        </div>

        {/* Decorative paws — LG TO 2XL */}
        <div className="hidden lg:flex flex-col items-center gap-2 mt-8 flex-shrink-0">
          <Image
            src="/footer-paw-3.svg"
            alt="Footer Cateneo string"
            width={80}
            height={80}
            className="w-[80px] h-[80px] self-end"
            sizes="100vw"
          />
          <Image
            src="/footer-paw-1.svg"
            alt="Footer Cateneo string"
            width={75}
            height={75}
            className="w-[75px] h-[75px] self-start"
            sizes="100vw"
          />
          <Image
            src="/footer-paw-4.svg"
            alt="Footer Cateneo string"
            width={150}
            height={150}
            className="w-[150px] h-[150px]"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Corner / string — SM TO MD */}
      <div className="w-screen flex justify-end overflow-x-hidden">
        <Link href="/">
          <Image
            src="/footer-corner.svg"
            alt="Footer Corner"
            width={200}
            height={50}
            className="w-full h-auto lg:hidden"
          />
          <Image
            src="/footer-string-lg.svg"
            alt="Footer String Large"
            width={200}
            height={50}
            className="hidden lg:block lg:w-full lg:h-auto"
          />
        </Link>
      </div>
    </div>
  );
}
