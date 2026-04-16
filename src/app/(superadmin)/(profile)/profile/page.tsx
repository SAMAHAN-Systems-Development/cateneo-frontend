"use client";

import { useGetMyProfile } from "@/client/queries/user-queries";
import UserProfileSection from "@/components/sections/user-profile-section";
import { useRouter } from "next/navigation";

const toRoleLabel = (role?: string) => {
  if (!role) return "-";
  if (role === "SUPERADMIN") return "Superadmin";
  if (role === "ADMIN") return "Admin";
  if (role === "VOLUNTEER") return "Volunteer";
  return role;
};

const toMemberSinceLabel = (createdAt?: string) => {
  if (!createdAt) return "Member since -";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "Member since -";
  return `Member since ${date.getFullYear()}`;
};

const Page = () => {
  const router = useRouter();
  const { data: profile } = useGetMyProfile();

  const fullName = [profile?.firstName, profile?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  return (
    <div className="pt-8 md:pt-22">
      <UserProfileSection
        userName={fullName || "-"}
        roleLabel={toRoleLabel(profile?.role)}
        memberSinceLabel={toMemberSinceLabel(profile?.createdAt)}
        onEditProfile={handleEditProfile}
      />
    </div>
  );
};

export default Page;
