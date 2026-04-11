"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addNewAdopteeFormSchema,
  AddNewAdopteeFormValues,
} from "@/schemas/sign-up-form-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RoundedButton } from "@/components/ui/rounded-button";

// Replace with actual cat names from your data source
const CAT_OPTIONS = [
  { value: "miming", label: "Miming" },
  { value: "kittenean", label: "Kittenean" },
];

/** Shared text fields: pill + black border; no theme ring / lighter focus border from shadcn Input */
const adopteeInputClassName = cn(
  "rounded-full border-2 border-cateneo-black bg-white font-gaegu text-cateneo-darkbrown",
  "focus-visible:border-cateneo-black focus-visible:bg-white focus:ring-0 focus-visible:ring-0",
  "aria-invalid:border-destructive aria-invalid:ring-0 aria-invalid:bg-white",
  "dark:bg-white",
);

const adopteeSelectTriggerClassName = cn(
  adopteeInputClassName,
  "flex h-auto min-h-9 w-full min-w-0 items-center justify-between shadow-none",
);

type AddNewAdopteeFormProps = {
  onConfirm?: (values: AddNewAdopteeFormValues) => void;
  onCancel?: () => void;
};

const AddNewAdopteeForm = ({ onConfirm, onCancel }: AddNewAdopteeFormProps) => {
  const form = useForm<AddNewAdopteeFormValues>({
    resolver: zodResolver(addNewAdopteeFormSchema),
    defaultValues: {
      name: "",
      age: "",
      contactNumber: "",
      email: "",
      address: "",
      adoptedCat: "",
    },
  });

  const onSubmit = (values: AddNewAdopteeFormValues) => {
    onConfirm?.(values);
  };

  return (
    <div className="min-h-screen w-full bg-cateneo-white p-4 md:p-8">
      <Card className="mx-auto w-full max-w-2xl border-none bg-cateneo-white shadow-none">
        <CardHeader className="pb-2">
          <div className="flex flex-col items-center justify-center gap-1 border-b-2 border-cateneo-darkbrown pb-3 text-center md:flex-row md:justify-start md:text-left">
            <CardTitle className="font-playpen text-2xl font-bold text-cateneo-black">
              <span className="md:hidden">Add New Adoptee </span>
              <span className="hidden items-center gap-2 md:inline-flex">
                Add New Adoptee <span aria-hidden="true">paw</span>
              </span>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen text-cateneo-darkbrown font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Miming"
                        className={adopteeInputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen text-cateneo-darkbrown font-semibold">
                      Age
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kittenean"
                        className={adopteeInputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Contact Number */}
              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen font-semibold text-cateneo-darkbrown">
                      <span className="sm:hidden">Contact #</span>
                      <span className="hidden sm:inline">Contact Number</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Kittenean"
                        className={adopteeInputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen text-cateneo-darkbrown font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={adopteeInputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen text-cateneo-darkbrown font-semibold">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lorem Ipsum"
                        className={adopteeInputClassName}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Adopted Cat */}
              <FormField
                control={form.control}
                name="adoptedCat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-playpen text-cateneo-darkbrown font-semibold">
                      Adopted Cat
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger className={adopteeSelectTriggerClassName}>
                          <SelectValue placeholder="Kittenean" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-gaegu">
                        {CAT_OPTIONS.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="font-gaegu text-red-500" />
                  </FormItem>
                )}
              />

              {/* Mobile: Cancel | Confirm · Desktop: Confirm | Cancel */}
              <div className="flex justify-center gap-4 pt-4">
                <RoundedButton
                  type="submit"
                  className="order-2 bg-cateneo-orange md:order-1"
                >
                  Confirm
                </RoundedButton>
                <RoundedButton
                  type="button"
                  variant="default"
                  className="order-1 md:order-2"
                  onClick={onCancel}
                >
                  Cancel
                </RoundedButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNewAdopteeForm;
