"use client";

// components/Navbar.jsx
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="w-full min-h-auto mx-auto text-cateneo-black font-gaegu flex flex-col items-center text-center gap-19 lg:gap-1 bg-cateneo-white border-cateneo-darkbrown border-3 rounded-t-2xl overflow-hidden">
      <div className="lg:flex lg:flex-row gap-6">
        <div className="flex flex-col lg:gap-10">
          {" "}
          <div className="flex flex-col items-center lg:items-start lg:text-left gap-6 lg:gap-2 md:mt-20">
            <div className="flex flex-row gap-2 sm:mt-20 md:mt-0 lg:mt-0">
              <Image
                src="/footer-ateneo-logo.svg"
                alt="Footer Ateneo logo"
                width={75}
                height={75}
                className="w-[75px] h-[75px] lg:w-[50px] lg:h-[50px] "
              />
              <Image
                src="/footer-cateneo-logo.svg"
                alt="Footer Cateneo logo"
                width={75}
                height={75}
                className="w-[75px] h-[75px] lg:w-[50px] lg:h-[50px]"
              />

              {/* LG,XL VIEW */}
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
            <p className="hidden lg:block text-[18px] lg:text-left text-cateneo-darkbrown">
              A socio-civic organization under the Council of Organizations of
              Ateneo de Davao University
            </p>

            {/* TABLET AND MOBILE VIEW */}
            <div className="lg:hidden flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-[44px] font-playpen font-black">CATeneo</h1>
                <Image
                  src="/footer-paw-1.svg"
                  alt="Footer Cateneo paw"
                  width={40}
                  height={40}
                  className="md:w-[60px] md:h-[60px]"
                />
              </div>
              <p className="text-[20px] md:text-[24px] max-w-xs md:max-w-xl">
                A socio-civic organization under the Council of Organizations of
                Ateneo de Davao University
              </p>
            </div>
          </div>
          <div className="relative w-full">
            <Image
              src="/footer-paw-3.svg"
              alt=""
              aria-hidden
              width={175}
              height={175}
              className="absolute -left-13 pointer-events-none select-none md:w-[175px] md:h-[175px] lg:hidden"
            />
            <div className="flex flex-col sm:gap-8 md:gap-10 w-auto mx-auto lg:flex-row lg:items-start md:mt-10 sm:mt-10 lg:mt-0">
              <div className="flex flex-col items-center w-auto text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] md:text-[24px] lg:text-[16px] font-playpen">
                  Quick Links
                </h1>
                <p className="text-[20px] md:text-[24px] lg:text-[16px] font-gaegu font-bold text-cateneo-lightbrown">
                  About
                </p>
                <p className="text-[20px] md:text-[24px] lg:text-[16px] font-gaegu font-bold text-cateneo-lightbrown">
                  Cat Directory
                </p>
                <p className="text-[20px] md:text-[24px] lg:text-[16px] text-cateneo-lightbrown font-gaegu font-bold">
                  FAQ
                </p>
              </div>

              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] md:text-[24px] lg:text-[16px] font-playpen">
                  Address
                </h1>
                <p className="text-[20px] md:text-[24px] lg:text-[16px] font-gaegu font-bold text-cateneo-lightbrown w-55">
                  Mezzanine Level, Martin Building Ateneo de Davao University E.
                  Jacinto Street, Davao City 8000
                </p>
              </div>

              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <h1 className="text-[20px] md:text-[24px] lg:text-[16px] font-playpen">
                  Email
                </h1>
                <p className="text-[20px] md:text-[24px] lg:text-[16px] font-gaegu font-bold text-cateneo-lightbrown">
                  cateneo@addu.edu.ph
                </p>
              </div>

              <div>
                <Image
                  src="/footer-paw-2.svg"
                  alt=""
                  aria-hidden
                  width={120}
                  height={120}
                  className="absolute -right-10 pointer-events-none select-none md:w-[120px] md:h-[120px] lg:hidden"
                />
                <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                  <h1 className="text-[20px] md:text-[24px] lg:text-[16px] font-playpen">
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
                      <span className="block text-[28px] lg:text-[18px]">
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
                      <span className="block text-[28px] lg:text-[18px]">
                        <FaInstagram />
                      </span>
                    </Link>
                    <Link
                      href="tiktok.com/@addu_cateneo"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-cateneo-lightbrown"
                    >
                      <span className="block text-[28px] lg:text-[18px]">
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
          <div className="w-full text-center text-[20px] md:text-[24px] lg:text-[16px] text-cateneo-lightbrown md:max-w-lg md:mx-auto lg:max-w-none lg:mx-0 lg:flex lg:justify-end lg:text-right lg:px-0 lg:mr-10 lg:mt-15">
            <span className="whitespace-nowrap">
              Developed by{" "}
              <b className="font-bold font-playpen">
                SAMAHAN Systems Development
              </b>
            </span>
          </div>
        </div>

        <div className="hidden lg:flex flex-col items-center gap-2 mt-8">
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

      <div className="w-full flex justify-end">
        <Link href="/">
          <Image
            src="/footer-corner.svg"
            alt="Footer Corner"
            width={200}
            height={50}
            className="max-w-full h-auto lg:hidden"
          />
          <Image
            src="/footer-string-lg.svg"
            alt="Footer String Large"
            width={200}
            height={50}
            className="hidden lg:block lg:w-full lg:h-full"
          />
        </Link>
      </div>
    </div>
  );
}
