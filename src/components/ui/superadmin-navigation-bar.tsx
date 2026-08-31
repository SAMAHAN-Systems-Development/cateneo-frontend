"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { IoMdClose } from "react-icons/io";
const CreateAnAccountForm = dynamic(() => import("./create-an-account-form"), {
  ssr: false,
});
import { useForm } from "react-hook-form";
import {
  signUpSchema,
  type signUpFormData,
} from "@/schemas/create-an-account-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateUser } from "@/client/mutations/auth-mutations";
import { AccountCreationResultModal } from "./account-creation-result-modal";
// Simple Modal implementation
function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-2xl shadow-xl max-w-full w-[95vw] sm:w-105 p-0">
        <button
          className="absolute top-2 right-2 z-10 p-2 rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close"
        >
          <IoMdClose className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
}
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/client/mutations/auth-mutations";
import { useGetMyProfile } from "@/client/queries/user-queries";

type DropdownKey = "management" | "adoptions";

type DropdownItem = {
  label: string;
  href: string;
};

const managementItems: DropdownItem[] = [
  { label: "Add Cat", href: "/management/add-new-cat" },
  { label: "List of Users", href: "/management/list-of-users" },
];

const adoptionItems: DropdownItem[] = [
  { label: "List of Adoptees", href: "/list-of-adoptees" },
];

const normalizeRole = (value?: string) => {
  if (!value) return "";
  return value
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s_-]/g, "")
    .toUpperCase();
};

const normalizePath = (path: string) => {
  if (!path) return "/";
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
};

const isPathActive = (pathname: string, href: string) => {
  const current = normalizePath(pathname);
  const target = normalizePath(href);
  return current === target || current.startsWith(`${target}/`);
};

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
  pathname,
  openDropdown,
  onToggle,
  onClose,
}: {
  label: string;
  menuKey: DropdownKey;
  items: DropdownItem[];
  pathname: string;
  openDropdown: DropdownKey | null;
  onToggle: (key: DropdownKey) => void;
  onClose: () => void;
}) {
  const isOpen = openDropdown === menuKey;
  const isActive = items.some((item) => isPathActive(pathname, item.href));

  return (
    <li className="relative">
      <button
        type="button"
        className={`inline-flex items-center gap-1 font-gaegu text-2xl transition-colors ${isActive ? "text-cateneo-orange" : "text-cateneo-black hover:text-cateneo-orange"}`}
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
              className={`block rounded-xl px-3 py-2 font-gaegu text-xl transition-colors hover:bg-cateneo-orange/10 hover:text-cateneo-orange ${isPathActive(pathname, item.href) ? "text-cateneo-orange" : "text-cateneo-black"}`}
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

export default function SuperAdminNavigationBar() {
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [accountCreationResult, setAccountCreationResult] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);
  // Form logic for create account
  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
    },
  });
  const createUserMutation = useCreateUser();

  async function handleCreateAccountSubmit(data: signUpFormData) {
    try {
      console.log(data);
      await createUserMutation.mutateAsync(data);
      setIsCreateAccountOpen(false);
      form.reset();
      setAccountCreationResult({
        status: "success",
        message: `${data.firstName.trim()} ${data.lastName.trim()}'s account was created successfully.`,
      });
    } catch (error) {
      setIsCreateAccountOpen(false);
      setAccountCreationResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while creating the account.",
      });
    }
  }
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { data: profile } = useGetMyProfile();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  const isSuperAdmin = normalizeRole(profile?.role) === "SUPERADMIN";

  const isHomeActive = isPathActive(pathname, "/dashboard/cateneans");
  const isProfileActive = isPathActive(pathname, "/profile");

  const toggleDropdown = (key: DropdownKey) => {
    setOpenDropdown((current) => (current === key ? null : key));
  };

  const closeMenus = () => {
    setIsMobileOpen(false);
    setOpenDropdown(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      closeMenus();
      router.replace("/login");
    }
  };

  return (
    <header className="relative z-50 w-full bg-cateneo-white px-3 pt-4 pb-2 md:px-5 md:pt-5 md:pb-2">
      <nav className="mx-auto flex w-full max-w-7xl items-center gap-2">
        <Link
          href="/dashboard/cateneans"
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
                href="/dashboard/cateneans"
                className={`font-gaegu text-2xl transition-colors hover:text-cateneo-orange ${isHomeActive ? "text-cateneo-orange" : "text-cateneo-black"}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/profile"
                className={`font-gaegu text-2xl transition-colors hover:text-cateneo-orange ${isProfileActive ? "text-cateneo-orange" : "text-cateneo-black"}`}
              >
                Profile
              </Link>
            </li>

            {isSuperAdmin && (
              <DesktopDropdown
                label="Management"
                menuKey="management"
                items={managementItems}
                pathname={pathname}
                openDropdown={openDropdown}
                onToggle={toggleDropdown}
                onClose={() => setOpenDropdown(null)}
              />
            )}

            <DesktopDropdown
              label="Adoptions"
              menuKey="adoptions"
              items={adoptionItems}
              pathname={pathname}
              openDropdown={openDropdown}
              onToggle={toggleDropdown}
              onClose={() => setOpenDropdown(null)}
            />
          </ul>
        </div>

        {isSuperAdmin && (
          <button
            type="button"
            className={`ml-auto hidden rounded-full pl-8 pr-6 py-2 font-gaegu text-2xl text-cateneo-white transition-opacity hover:opacity-90 md:inline-flex bg-cateneo-lightbrown`}
            onClick={() => setIsCreateAccountOpen(true)}
          >
            Create Account
          </button>
        )}
        <Modal
          open={isCreateAccountOpen}
          onClose={() => setIsCreateAccountOpen(false)}
        >
          <CreateAnAccountForm
            form={form}
            onSubmit={handleCreateAccountSubmit}
          />
        </Modal>
        <AccountCreationResultModal
          open={accountCreationResult !== null}
          status={accountCreationResult?.status ?? "error"}
          message={accountCreationResult?.message ?? ""}
          onClose={() => setAccountCreationResult(null)}
        />

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="hidden rounded-full border-2 border-cateneo-darkbrown px-5 py-2 font-gaegu text-2xl text-cateneo-darkbrown transition-colors hover:bg-cateneo-darkbrown hover:text-cateneo-white disabled:cursor-not-allowed disabled:opacity-60 md:inline-flex"
        >
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>

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
              href="/dashboard/cateneans"
              className={isHomeActive ? "text-cateneo-orange" : undefined}
              onClick={closeMenus}
            >
              Home
            </Link>
            <Link
              href="/profile"
              className={isProfileActive ? "text-cateneo-orange" : undefined}
              onClick={closeMenus}
            >
              Profile
            </Link>

            {isSuperAdmin && (
              <>
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
                        className={`text-xl ${isPathActive(pathname, item.href) ? "text-cateneo-orange" : "text-cateneo-black"}`}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
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
                    className={`text-xl ${isPathActive(pathname, item.href) ? "text-cateneo-orange" : "text-cateneo-black"}`}
                    onClick={closeMenus}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {isSuperAdmin && (
              <button
                type="button"
                className={`mt-2 inline-flex w-fit rounded-full pl-8 pr-6 py-2 text-cateneo-white bg-cateneo-orange`}
                onClick={() => {
                  setIsCreateAccountOpen(true);
                  closeMenus();
                }}
              >
                Create Account
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="mt-1 inline-flex w-fit rounded-full border-2 border-cateneo-darkbrown px-5 py-2 text-cateneo-darkbrown disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
