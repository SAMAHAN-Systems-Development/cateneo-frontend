"use client";

// components/Navbar.jsx
import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <div className="w-full min-h-329 mx-auto text-cateneo-black font-gaegu flex flex-col items-center text-center gap-19 bg-top bg-no-repeat bg-size-[100%_100%] bg-cateneo-white border-cateneo-darkbrown border-3 rounded-t-2xl overflow-hidden">
      <div className="flex flex-col items-center gap-6 mt-auto md:mt-20">
        <Link href="/" className="flex flex-row">
          <Image
            src="/footer-ateneo-logo.svg"
            alt="Footer Ateneo logo"
            width={75}
            height={75}
            className="w-[75px] h-[75px] md:w-[110px] md:h-[110px]"
          />
          <Image
            src="/footer-cateneo-logo.svg"
            alt="Footer Cateneo logo"
            width={75}
            height={75}
            className="w-[75px] h-[75px] md:w-[110px] md:h-[110px]"
          />
        </Link>

        <div className="flex flex-col items-center gap-1">
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
          <p className="text-[20px] md:text-[24px] max-w-x md:max-w-xl">
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
          width={100}
          height={100}
          className="absolute left-0 pointer-events-none select-none md:w-[120px] md:h-[120px]"
        />
        <div className="flex flex-col gap-6 w-auto mx-auto">
          <div className="flex flex-col w-auto">
            <h1 className="text-center text-[20px] md:text-[24px] font-playpen">
              Quick Links
            </h1>
            <p className="text-center text-[20px] md:text-[24px] font-gaegu font-bold text-cateneo-lightbrown">
              About
            </p>
            <p className="text-center text-[20px] md:text-[24px] font-gaegu font-bold text-cateneo-lightbrown">
              Cat Directory
            </p>
            <p className="text-center text-[20px] md:text-[24px] text-cateneo-lightbrown font-gaegu font-bold">
              FAQ
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h1 className="text-center text-[20px] md:text-[24px] font-playpen">
              Address
            </h1>
            <p className="text-center text-[20px] md:text-[24px] font-gaegu font-bold text-cateneo-lightbrown w-55">
              Mezzanine Level, Martin Building Ateneo de Davao University E.
              Jacinto Street, Davao City 8000
            </p>
          </div>

          <div className="flex flex-col ">
            <h1 className="text-center text-[20px] md:text-[24px] font-playpen">
              Email
            </h1>
            <p className="text-center text-[20px] md:text-[24px] font-gaegu font-bold text-cateneo-lightbrown">
              cateneo@addu.edu.ph
            </p>
          </div>

          <div>
            <Image
              src="/footer-paw-2.svg"
              alt=""
              aria-hidden
              width={100}
              height={100}
              className="absolute right-0 pointer-events-none select-none md:w-[120px] md:h-[120px]"
            />
            <div className="flex flex-col">
              <h1 className="text-center text-[20px] md:text-[24px] font-playpen">
                Socials
              </h1>
              <div className="flex flex-row items-center justify-center gap-4 mt-1">
                <Link
                  href="https://www.facebook.com/CATeneoAddu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-cateneo-lightbrown"
                >
                  <FaFacebook size={28} />
                </Link>
                <Link
                  href="https://www.instagram.com/cateneo.addu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-cateneo-lightbrown"
                >
                  <FaInstagram size={28} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@cateneo.addu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="text-cateneo-lightbrown"
                >
                  <FaTiktok size={28} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2 mt-auto">
        <Image
          src="/footer-cat-string.svg"
          alt="Footer Cateneo string"
          width={1000}
          height={80}
          className="w-full h-auto max-w-full"
          sizes="100vw"
        />
        <div className="text-center text-[20px] md:text-[24px] px-4 md:max-w-lg text-cateneo-lightbrown">
          Developed by{" "}
          <b className="font-bold font-playpen">SAMAHAN Systems Development</b>
        </div>

        <div className="w-full flex justify-end">
          <Link href="/">
            <Image
              src="/footer-corner.svg"
              alt="Footer Corner"
              width={200}
              height={50}
              className="max-w-full h-auto"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
