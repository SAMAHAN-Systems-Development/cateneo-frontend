"use client";

import * as React from "react";
import Image from "next/image";

import ChangePasswordForm from "@/components/ui/change-password-form";
import EditProfileForm from "@/components/ui/edit-profile-form";
import { cn } from "@/lib/utils";

type ActiveTab = "account" | "security";

export default function EditProfileSection() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("account");

  const isAccountTab = activeTab === "account";

  return (
    <section className="w-full bg-cateneo-white px-3 pb-8 md:px-5 md:pb-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex items-center gap-2 border-b-2 border-cateneo-darkbrown pb-2">
          <h1 className="font-playpen text-xl font-bold text-cateneo-black md:text-2xl">
            Edit Profile
          </h1>
          <Image src="/cat-paw.svg" alt="Paw icon" width={20} height={20} />
        </div>

        <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-8">
          <aside className="space-y-3">
            <button
              type="button"
              aria-pressed={isAccountTab}
              className={cn(
                "w-full rounded-2xl px-4 py-3 text-left font-gaegu text-xl text-cateneo-white transition-all duration-150",
                isAccountTab
                  ? "bg-cateneo-darkbrown ring-4 ring-cateneo-darkbrown/15"
                  : "bg-cateneo-darkbrown/75 hover:bg-cateneo-darkbrown",
              )}
              onClick={() => setActiveTab("account")}
            >
              Account Setting
            </button>

            <button
              type="button"
              aria-pressed={!isAccountTab}
              className={cn(
                "w-full rounded-2xl px-4 py-3 text-left font-gaegu text-xl text-cateneo-white transition-all duration-150",
                !isAccountTab
                  ? "bg-cateneo-orange ring-4 ring-cateneo-orange/20"
                  : "bg-cateneo-orange/85 hover:bg-cateneo-orange",
              )}
              onClick={() => setActiveTab("security")}
            >
              Password & Security
            </button>
          </aside>

          <div>
            <h2 className="font-playpen text-2xl font-bold text-cateneo-black">
              {isAccountTab ? "Edit Profile" : "Change Password"}
            </h2>

            <div className="mt-3">
              {isAccountTab ? (
                <EditProfileForm />
              ) : (
                <ChangePasswordForm onCancel={() => setActiveTab("account")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
