"use client";

// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 flex w-full items-center justify-between px-4 py-3 text-white md:justify-center md:gap-4 md:px-6 md:py-4 lg:mx-auto lg:max-w-[calc(100vw-2rem)] lg:px-4 xl:gap-10">
      {/* Desktop-only Logo Section */}
      <div className="hidden md:flex shrink-0 text-xl font-gaegu tracking-wide">
        <Link
          href="/"
          className="hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
        >
          <Image
            src="/cateneo-navbar-icon.png"
            alt="Cateneo icon"
            width={55}
            height={55}
            priority
            className="h-12 w-12 xl:h-[55px] xl:w-[55px]"
          />
        </Link>
      </div>

      {/* Navigation Links (Dropdown on Mobile) */}
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute left-3 top-2 z-50 flex-col min-w-[200px] gap-4 rounded-br-[50px] border-2 border-cateneo-darkbrown bg-cateneo-white p-3 text-cateneo-black text-xl font-gaegu shadow-lg md:static md:mx-0 md:mt-0 md:flex md:flex-row md:items-center md:gap-5 md:rounded-full md:bg-cateneo-white md:px-6 md:py-2 lg:gap-6 lg:px-8 xl:mx-10 xl:gap-30 xl:px-20 shrink-0`}
      >
        {/* Mobile-only Hamburger/Close Button inside the menu */}
        <li className="md:hidden flex mb-4">
          <button
            type="button"
            className="inline-flex items-center justify-left"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/Property 1=Closed.svg"
              alt="Close navigation menu"
              width={32}
              height={32}
              priority
            />
          </button>
        </li>

        {/* Mobile-only Logo inside the menu */}
        <li className="md:hidden flex mb-2">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              src="/cateneo-navbar-icon.png"
              alt="Cateneo logo"
              width={55}
              height={55}
              priority
            />
          </Link>
        </li>

        <li>
          <Link
            href="/"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/adopt-a-cat"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/cat-directory"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Cat Directory
          </Link>
        </li>
        <li>
          <Link
            href="/faq"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
        </li>
        {/* Mobile-only Adopt a Cat link */}
        <li className="md:hidden flex justify-center mt-2">
          <Link
            href="/"
            className="font-gaegu text-cateneo-white bg-cateneo-lightbrown px-6 py-2 rounded-full inline-block hover:opacity-90 transition-opacity duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Adopt a Cat
          </Link>
        </li>
      </ul>

      {/* Desktop Adopt Button */}
      <div className="hidden shrink-0 rounded-full bg-cateneo-lightbrown px-6 py-2 font-gaegu text-lg tracking-wide text-cateneo-white md:block lg:px-8 xl:px-10 xl:text-xl">
        <Link
          href="/"
          className="hover:opacity-90 transition-opacity duration-200"
        >
          Adopt a Cat
        </Link>
      </div>

      {/* Mobile Burger Button (Always in the DOM, lower z-index than the menu) */}
      <button
        type="button"
        className="inline-flex items-center justify-left p-2 rounded-md md:hidden mr-auto relative z-40"
        aria-label="Open navigation menu"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen(true)}
      >
        <Image
          src="/Property 1=Closed.svg"
          alt="Open navigation menu"
          width={32}
          height={32}
          priority
        />
      </button>
    </nav>
  );
}
