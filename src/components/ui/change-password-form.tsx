"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  changePasswordFormSchema,
  type ChangePasswordFormData,
} from "@/schemas/change-password-form-schema";
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

type ChangePasswordFormProps = {
  onSubmit?: (values: ChangePasswordFormData) => void | Promise<void>;
  onCancel?: () => void;
};

const inputClass =
  "h-9 rounded-lg border-2 border-cateneo-darkbrown bg-cateneo-white font-gaegu text-sm text-cateneo-black placeholder:text-cateneo-black/50 focus-visible:border-cateneo-darkbrown focus-visible:ring-0";

export default function ChangePasswordForm({
  onSubmit,
  onCancel,
}: ChangePasswordFormProps) {
  const form = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (values: ChangePasswordFormData) => {
    await onSubmit?.(values);
    form.reset();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md space-y-4"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Lorem Ipsum"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-playpen text-sm font-semibold text-cateneo-darkbrown">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Lorem Ipsum"
                  className={inputClass}
                  {...field}
                />
              </FormControl>
              <FormMessage className="font-gaegu text-sm" />
            </FormItem>
          )}
        />

        <div className="flex items-center gap-3 pt-2">
          <RoundedButton
            type="submit"
            variant="accent"
            className="px-6 py-1.5 font-gaegu text-lg hover:scale-100"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving..." : "Confirm"}
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
      </form>
    </Form>
  );
}
