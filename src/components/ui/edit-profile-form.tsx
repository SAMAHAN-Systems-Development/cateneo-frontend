"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMyProfile } from "@/client/queries/user-queries";
import { useUpdateMyProfile } from "@/client/mutations/user-mutations";
import * as React from "react";
import { useForm } from "react-hook-form";

import type { EditProfileFormData } from "@/schemas/edit-profile-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoundedButton } from "@/components/ui/rounded-button";
import { editProfileFormSchema } from "@/schemas/edit-profile-form-schema";

type EditProfileFormProps = {
  onSubmit?: (values: EditProfileFormData) => void | Promise<void>;
  onCancel?: () => void;
};

const inputClass =
  "h-9 rounded-lg border-2 border-cateneo-darkbrown bg-cateneo-white font-gaegu text-sm text-cateneo-black placeholder:text-cateneo-black/50 focus-visible:border-cateneo-darkbrown focus-visible:ring-0";

const getRoleLabel = (role?: string) => {
  if (!role) return "Admin";
  if (role === "SUPERADMIN") return "Superadmin";
  if (role === "ADMIN") return "Admin";
  if (role === "VOLUNTEER") return "Volunteer";
  return role;
};

const getMemberSince = (createdAt?: string) => {
  if (!createdAt) return "";
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return String(date.getFullYear());
};

export default function EditProfileForm({
  onSubmit,
  onCancel,
}: EditProfileFormProps) {
  const { data: profile } = useGetMyProfile();
  const { mutateAsync: updateProfile, isPending } = useUpdateMyProfile();

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const initialValues = React.useMemo<EditProfileFormData>(() => {
    return {
      firstName: profile?.firstName ?? "",
      lastName: profile?.lastName ?? "",
    };
  }, [profile]);

  const roleLabel = React.useMemo(() => getRoleLabel(profile?.role), [profile]);
  const memberSinceLabel = React.useMemo(
    () => getMemberSince(profile?.createdAt),
    [profile],
  );

  React.useEffect(() => {
    if (!profile) return;
    form.reset(initialValues);
  }, [form, initialValues, profile]);

  const handleSubmit = async (values: EditProfileFormData) => {
    if (onSubmit) {
      await onSubmit(values);
    } else {
      await updateProfile({
        firstName: values.firstName,
        lastName: values.lastName,
      });
    }

    form.reset(values);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    form.reset(initialValues);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-2xl space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Andrew"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-gaegu text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Lomanta"
                    className={inputClass}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="font-gaegu text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
              Role
            </label>
            <div>
              <Input
                className={`${inputClass} cursor-not-allowed bg-cateneo-white/80`}
                readOnly
                aria-readonly="true"
                value={roleLabel}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
              Member Since
            </label>
            <div>
              <Input
                placeholder="2024"
                className={`${inputClass} cursor-not-allowed bg-cateneo-white/80`}
                readOnly
                aria-readonly="true"
                value={memberSinceLabel}
              />
            </div>
          </div>
        </div>

        {form.formState.isDirty ? (
          <div className="flex items-center gap-3 pt-2">
            <RoundedButton
              type="submit"
              variant="accent"
              className="px-6 py-1.5 font-gaegu text-lg hover:scale-100"
              disabled={form.formState.isSubmitting || isPending}
            >
              {form.formState.isSubmitting || isPending
                ? "Saving..."
                : "Confirm"}
            </RoundedButton>
            <RoundedButton
              type="button"
              variant="default"
              className="px-6 py-1.5 font-gaegu text-lg hover:scale-100"
              onClick={handleCancel}
            >
              Cancel
            </RoundedButton>
          </div>
        ) : null}
      </form>
    </Form>
  );
}
