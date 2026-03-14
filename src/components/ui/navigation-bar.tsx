'use client';

// components/Navbar.jsx
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between md:justify-center px-4 py-3 text-white lg:mx-4 md:px-8 md:py-4 md:mx-10">
      
      {/* Desktop-only Logo Section */}
      <div className="hidden md:flex shrink-0 text-xl font-gaegu tracking-wide">
        <Link href="/" className="hover:opacity-90 transition-opacity duration-200 flex items-center gap-2">
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
          isMenuOpen ? 'flex' : 'hidden'
        } absolute left-4 top-full mt-3 flex-col min-w-[200px] gap-4 rounded-br-[50px] border-2 border-cateneo-darkbrown bg-cateneo-white p-10 text-cateneo-black text-xl font-gaegu shadow-lg lg:mx-10 lg:gap-30 lg:px-20 md:static md:mx-10 md:mt-0 md:flex md:flex-row md:items-center md:gap-6 md:rounded-full md:bg-cateneo-white md:px-10 md:py-2 shrink-0`}
      >
        {/* Mobile-only Logo inside the menu */}
        <li className="md:hidden flex mb-2">
          <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:opacity-90 transition-opacity duration-200">
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
            href="/"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="hover:text-cateneo-orange transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Cat Directory
          </Link>
        </li>
        <li>
          <Link
            href="/"
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
        <Link href="/" className="hover:opacity-90 transition-opacity duration-200">
          Adopt a Cat
        </Link>
      </div>

      {/* Mobile Burger Button */}
      <button
        type="button"
        className="inline-flex items-center justify-left p-2 rounded-md md:hidden mr-auto"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Image
          src={isMenuOpen ? '/Property 1=Closed.svg' : '/Property 1=Closed.svg'}
          alt={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          width={32}
          height={32}
          priority
        />
      </button>
    </nav>
  );
}