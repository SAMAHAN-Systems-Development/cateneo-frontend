"use client";

import EditProfileSection from "@/components/sections/edit-profile-section";
import { useChangeUserPassword } from "@/client/mutations/user-mutations";
import type { ChangePasswordSubmitData } from "@/schemas/change-password-form-schema";

const Page = () => {
  const { mutateAsync: changePassword } = useChangeUserPassword();

  const handleChangePasswordSubmit = async (
    values: ChangePasswordSubmitData,
  ) => {
    await changePassword({
      currentPassword: values.currentPassword,
      newPassword: values.confirmNewPassword,
    });
  };

  return (
    <div className="pt-8 md:pt-12">
      <EditProfileSection onChangePasswordSubmit={handleChangePasswordSubmit} />
    </div>
  );
};

export default Page;
