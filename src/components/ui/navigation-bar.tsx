"use client";

// components/Navbar.jsx
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex z-50 items-center justify-between md:justify-center px-4 py-3 text-white lg:mx-4 md:px-8 md:py-4 md:mx-10 ">
      {/* Desktop-only Logo Section */}
      <div className="hidden md:flex shrink-0 text-xl font-gaegu tracking-wide">
        <Link
          href="/home"
          className="hover:opacity-90 transition-opacity duration-200 flex items-center gap-2"
        >
          <Image
            src="/cateneo-navbar-logo.svg"
            alt="Cateneo logo"
            width={55}
            height={55}
            priority
          />
        </Link>
      </div>

      {/* Navigation Links (Dropdown on Mobile) */}
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } absolute left-3 top-2 z-50 flex-col min-w-[200px] gap-4 rounded-br-[50px] border-2 border-cateneo-darkbrown bg-cateneo-white p-3 text-cateneo-black text-xl font-gaegu shadow-lg lg:mx-10 lg:gap-30 lg:px-20 md:static md:mx-10 md:mt-0 md:flex md:flex-row md:items-center md:gap-6 md:rounded-full md:bg-cateneo-white md:px-10 md:py-2 shrink-0`}
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
            href="/home"
            onClick={() => setIsMenuOpen(false)}
            className="hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              src="/cateneo-navbar-logo.svg"
              alt="Cateneo logo"
              width={55}
              height={55}
              priority
            />
          </Link>
        </li>

        <li>
          <Link
            href="/home"
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
      <div className="hidden md:block text-xl font-gaegu tracking-wide bg-cateneo-lightbrown text-cateneo-white px-10 py-2 rounded-full shrink-0">
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
