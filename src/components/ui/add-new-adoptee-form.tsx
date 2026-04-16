"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  addNewAdopteeFormSchema,
  AddNewAdopteeFormValues,
} from "@/schemas/create-an-account-form-schema";
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
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { RoundedButton } from "@/components/ui/rounded-button";

const CAT_OPTIONS = [
  { value: "miming", label: "Miming" },
  { value: "kittenean", label: "Kittenean" },
];

const inputClass =
  "rounded-lg h-10 border-2 border-cateneo-black !bg-white font-gaegu text-base w-full focus-visible:ring-0 focus-visible:border-cateneo-black";
const labelClass = "font-playpen text-cateneo-darkbrown font-semibold text-lg";

type Field = {
  name: string;
  label: string;
  desktopLabel?: string;
  placeholder: string;
};

const FIELDS: Field[] = [
  { name: "name", label: "Name", placeholder: "Miming" },
  { name: "age", label: "Age", placeholder: "e.g. 25" },
  {
    name: "contactNumber",
    label: "Contact #",
    desktopLabel: "Contact Number",
    placeholder: "e.g. 09123456789",
  },
  { name: "email", label: "Email", placeholder: "you@example.com" },
  { name: "address", label: "Address", placeholder: "Street, City" },
];

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

  return (
    <div className="min-h-screen w-full bg-cateneo-white p-6 relative overflow-hidden">
      {/* Full width header */}
      <div className="w-full mb-4 md:mb-10">
        <div className="flex pb-3">
          {/* Mobile header */}
          <div className="flex items-center gap-2 md:hidden justify-center w-full">
            <Image src="/cat-paw.svg" alt="" width={24} height={24} />
            <span className="font-playpen text-cateneo-black text-2xl font-bold">
              Add New Cat
            </span>
            <Image src="/cat-paw.svg" alt="" width={24} height={24} />
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex items-center gap-2">
            <span className="font-playpen text-cateneo-black text-2xl font-bold whitespace-nowrap">
              Add New Adoptee
            </span>
            <Image src="/cat-paw.svg" alt="Paw icon" width={28} height={28} />
          </div>
        </div>
        <hr className="border-t-2 border-cateneo-darkbrown w-full" />
      </div>

      {/* Form centered */}
      <Card className="bg-cateneo-white border-none shadow-none w-full max-w-2xl mx-auto">
        <CardContent className="pt-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((v) => onConfirm?.(v))}
              className="flex flex-col gap-4"
            >
              {FIELDS.map(({ name, label, desktopLabel, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof AddNewAdopteeFormValues}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>
                        <span className="md:hidden">{label}</span>
                        <span className="hidden md:inline">
                          {desktopLabel ?? label}
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholder}
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="font-gaegu" />
                    </FormItem>
                  )}
                />
              ))}

              {/* Adopted Cat */}
              <FormField
                control={form.control}
                name="adoptedCat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Adopted Cat</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={`${inputClass} [&_svg]:w-5! [&_svg]:h-5!`}
                        >
                          <SelectValue placeholder="Select a cat" />
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
                    <FormMessage className="font-gaegu" />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-4">
                <RoundedButton
                  type="button"
                  className="order-1 md:order-2 bg-cateneo-black text-white"
                  onClick={onCancel}
                >
                  Cancel
                </RoundedButton>
                <RoundedButton
                  type="submit"
                  className="order-2 md:order-1 bg-cateneo-orange"
                >
                  Confirm
                </RoundedButton>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Desktop only flair */}
      <div className="hidden md:block">
        <Image
          src="/yarn.svg"
          alt=""
          width={400}
          height={400}
          className="absolute bottom-0 right-0"
        />
        <Image
          src="/cat-arm.svg"
          alt=""
          width={190}
          height={190}
          className="absolute bottom-0 right-[275px]"
        />
        <Image
          src="/cat-hand.svg"
          alt=""
          width={170}
          height={170}
          className="absolute bottom-5 right-[214px]"
        />
      </div>
    </div>
  );
};

export default AddNewAdopteeForm;
