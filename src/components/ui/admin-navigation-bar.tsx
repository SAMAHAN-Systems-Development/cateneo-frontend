"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type DropdownKey = "management" | "adoptions";

type DropdownItem = {
  label: string;
  href: string;
};

const managementItems: DropdownItem[] = [
  { label: "Add Cat", href: "/add-new-cat" },
  { label: "List of Users", href: "/list-of-users" },
];

const adoptionItems: DropdownItem[] = [
  { label: "List of Adoptees", href: "/list-of-adoptees" },
];

const ChevronDown = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 20 20"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function DesktopDropdown({
  label,
  menuKey,
  items,
  openDropdown,
  onToggle,
  onClose,
}: {
  label: string;
  menuKey: DropdownKey;
  items: DropdownItem[];
  openDropdown: DropdownKey | null;
  onToggle: (key: DropdownKey) => void;
  onClose: () => void;
}) {
  const isOpen = openDropdown === menuKey;

  return (
    <li className="relative">
      <button
        type="button"
        className="inline-flex items-center gap-1 font-gaegu text-2xl text-cateneo-black transition-colors hover:text-cateneo-orange"
        onClick={() => onToggle(menuKey)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 top-full mt-2 w-56 rounded-2xl border-2 border-cateneo-darkbrown bg-cateneo-white p-2 shadow-lg"
          role="menu"
        >
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              role="menuitem"
              className="block rounded-xl px-3 py-2 font-gaegu text-xl text-cateneo-black transition-colors hover:bg-cateneo-orange/10 hover:text-cateneo-orange"
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}

export default function AdminNavigationBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const closeMenus = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="relative z-50 w-full bg-cateneo-white px-3 pt-4 pb-2 md:px-5 md:pt-5 md:pb-2">
      <nav className="mx-auto flex w-full max-w-7xl items-center gap-2">
        <Link
          href="/superadmin/dashboard"
          className="shrink-0"
          aria-label="Go to admin dashboard"
          onClick={closeMenus}
        >
          <Image
            src="/cateneo-navbar-icon.png"
            alt="Cateneo logo"
            width={44}
            height={44}
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center rounded-full border-2 border-cateneo-darkbrown bg-cateneo-white px-6 py-1.5 md:flex">
          <ul className="flex w-full items-center justify-between gap-6">
            <li>
              <Link
                href="/dashboard"
                className="font-gaegu text-2xl text-cateneo-orange transition-colors hover:text-cateneo-orange"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/superadmin/profile"
                className="font-gaegu text-2xl text-cateneo-black transition-colors hover:text-cateneo-orange"
              >
                Profile
              </Link>
            </li>

            <DesktopDropdown
              label="Management"
              menuKey="management"
              items={managementItems}
              openDropdown={openDropdown}
              onToggle={toggleDropdown}
              onClose={() => setOpenDropdown(null)}
            />

            <DesktopDropdown
              label="Adoptions"
              menuKey="adoptions"
              items={adoptionItems}
              openDropdown={openDropdown}
              onToggle={toggleDropdown}
              onClose={() => setOpenDropdown(null)}
            />
          </ul>
        </div>

        <Link
          href="/superadmin/create-account"
          className="ml-auto hidden rounded-full bg-cateneo-lightbrown px-6 py-2 font-gaegu text-2xl text-cateneo-white transition-opacity hover:opacity-90 md:inline-flex"
        >
          Create Account
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex size-9 items-center justify-center rounded-full border-2 border-cateneo-darkbrown text-cateneo-darkbrown md:hidden"
          aria-label="Toggle admin navigation"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen((current) => !current)}
        >
          <span className="sr-only">Menu</span>
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {isMobileOpen && (
        <div className="mx-auto mt-2 w-full max-w-7xl rounded-3xl border-2 border-cateneo-darkbrown bg-cateneo-white p-4 md:hidden">
          <div className="flex flex-col gap-2.5 font-gaegu text-2xl text-cateneo-black">
            <Link
              href="/dashboard"
              className="text-cateneo-orange"
              onClick={closeMenus}
            >
              Home
            </Link>
            <Link href="/superadmin/profile" onClick={closeMenus}>
              Profile
            </Link>

            <button
              type="button"
              className="flex items-center justify-between"
              onClick={() => toggleDropdown("management")}
            >
              Management
              <ChevronDown
                className={`size-4 transition-transform ${openDropdown === "management" ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === "management" && (
              <div className="ml-2 flex flex-col gap-2">
                {managementItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xl"
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <button
              type="button"
              className="flex items-center justify-between"
              onClick={() => toggleDropdown("adoptions")}
            >
              Adoptions
              <ChevronDown
                className={`size-4 transition-transform ${openDropdown === "adoptions" ? "rotate-180" : ""}`}
              />
            </button>
            {openDropdown === "adoptions" && (
              <div className="ml-2 flex flex-col gap-2">
                {adoptionItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-xl"
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/superadmin/create-account"
              className="mt-2 inline-flex w-fit rounded-full bg-cateneo-lightbrown px-6 py-2 text-cateneo-white"
              onClick={closeMenus}
            >
              Create Account
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
