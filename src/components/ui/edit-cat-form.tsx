"use client";

import * as React from "react";
import Image from "next/image";
import { Calendar, Plus, Upload } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  editCatFormDefaultValues,
  editCatFormSchema,
  type EditCatFormData,
} from "../../schemas/edit-cat-form-schema";

export type EditCatInitialData = {
  id?: number;
  name?: string;
  sex?: string;
  classification?: string;
  dob?: string;
  dod?: string;
  dateOfDeath?: string;
  status?: string;
  currentLocation?: string;
  vitamins?: string[];
  healthStatus?: string[];
  personality?: string;
  colors?: string[];
  imageUrl?: string;
};

interface EditCatFormProps {
  cat: EditCatInitialData;
  onSubmit: (data: EditCatFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
}

const typeOptions = ["Kittenean", "Persian", "Siamese", "Maine Coon"];
const parentOptions = ["Kitteean", "Snowpaw", "Ambertail", "Whisker"];
const statusOptions = ["Lorem Ipsum", "Available", "Pending", "Adopted"];
const locationOptions = ["Lorem Ipsum", "Manila", "Cebu", "Davao"];
const vitaminOptions = ["Nematocide", "LC Vit"];
const healthOptions = ["Anti-Rabies", "Spayed", "Neutered"];
const colorOptions = [
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Brown" },
  { value: "white", label: "White" },
  { value: "gray", label: "Gray" },
  { value: "mixed", label: "Mixed" },
];

const chipClass =
  "inline-flex h-8 min-h-8 items-center justify-center rounded-full border-2 border-cateneo-darkbrown px-2.5 text-sm font-gaegu font-medium text-cateneo-darkbrown transition-colors";

const fieldControlClass =
  "box-border h-8 min-h-8 w-full min-w-0 max-w-full rounded-lg border-2 border-cateneo-darkbrown bg-white px-2.5 text-sm font-gaegu text-cateneo-darkbrown outline-none placeholder:text-cateneo-darkbrown/70 focus-visible:ring-3 focus-visible:ring-ring/50";

const selectTriggerClass = cn(
  fieldControlClass,
  "flex w-full min-w-0 max-w-full items-center justify-between gap-1 overflow-hidden py-0 shadow-none focus-visible:border-cateneo-darkbrown data-[size=default]:h-8 [&_svg:not([class*='size-'])]:size-3.5",
  "data-placeholder:text-cateneo-darkbrown/70 *:data-[slot=select-value]:min-w-0 *:data-[slot=select-value]:truncate *:data-[slot=select-value]:text-left *:data-[slot=select-value]:font-gaegu *:data-[slot=select-value]:text-sm *:data-[slot=select-value]:text-cateneo-darkbrown",
);

const selectContentClass =
  "max-h-[min(18rem,var(--radix-select-content-available-height))] rounded-lg border-2 border-cateneo-darkbrown bg-white p-1 font-gaegu shadow-md";

const selectItemClass =
  "rounded-md py-2 pr-8 pl-2 text-sm font-gaegu text-cateneo-darkbrown outline-none focus:bg-cateneo-orange/15 focus:text-cateneo-darkbrown data-[highlighted]:bg-cateneo-orange/15 data-[highlighted]:text-cateneo-darkbrown [&_svg]:text-cateneo-darkbrown";

const dateButtonClass = cn(
  fieldControlClass,
  "flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden",
);

const toDateInput = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const toSexValue = (value?: string): "Male" | "Female" =>
  value?.toLowerCase() === "female" ? "Female" : "Male";

const toTypeValue = (classification?: string) => {
  if (!classification) return "";

  if (classification.includes("KITTENean")) return "Kittenean";
  if (classification.includes("CATenean")) return "Catenean";

  return classification;
};

const mapInitialCatToFormValues = (
  cat: EditCatInitialData,
): EditCatFormData => {
  return {
    ...editCatFormDefaultValues,
    name: cat.name ?? "",
    sex: toSexValue(cat.sex),
    type: toTypeValue(cat.classification),
    dateOfBirth: toDateInput(cat.dob),
    dateOfDeath: toDateInput(cat.dateOfDeath ?? cat.dod),
    motherCat: "",
    fatherCat: "",
    adoptionStatus: cat.status ?? "",
    location: cat.currentLocation ?? "",
    vitamins: Array.isArray(cat.vitamins) ? cat.vitamins : [],
    healthStatus: Array.isArray(cat.healthStatus) ? cat.healthStatus : [],
    personality: cat.personality ?? "",
    color: cat.colors?.[0]?.toLowerCase() ?? "",
    image: null,
  };
};

export default function EditCatForm({
  cat,
  onSubmit,
  onCancel,
  className,
}: EditCatFormProps) {
  const form = useForm<EditCatFormData>({
    resolver: zodResolver(editCatFormSchema),
    defaultValues: mapInitialCatToFormValues(cat),
  });

  React.useEffect(() => {
    form.reset(mapInitialCatToFormValues(cat));
  }, [cat, form]);

  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const imageFile = useWatch({ control: form.control, name: "image" });
  const selectedVitamins = useWatch({
    control: form.control,
    name: "vitamins",
  });
  const selectedHealthStatuses = useWatch({
    control: form.control,
    name: "healthStatus",
  });

  React.useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(nextUrl);

    return () => URL.revokeObjectURL(nextUrl);
  }, [imageFile]);

  const toggleArrayValue = (
    field: "vitamins" | "healthStatus",
    value: string,
  ) => {
    const current = form.getValues(field);
    const nextValues = current.includes(value)
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    form.setValue(field, nextValues, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "mx-auto box-border w-full max-w-[70%] overflow-x-hidden rounded-3xl bg-cateneo-white p-4 text-center font-gaegu text-cateneo-darkbrown sm:max-w-md md:max-w-xl md:p-6 lg:max-w-none lg:text-left",
          className,
        )}
      >
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2 border-b-2 border-cateneo-lightbrown pb-2 lg:justify-start">
          <Image
            src="/images/paw.svg"
            alt=""
            width={32}
            height={32}
            className="size-6 shrink-0 sm:size-8 lg:hidden"
            aria-hidden
          />
          <h2 className="text-1xl font-playpen font-bold sm:text-3xl">
            Edit Cat
          </h2>
          <Image
            src="/images/paw.svg"
            alt=""
            width={32}
            height={32}
            className="size-6 shrink-0 sm:size-8"
            aria-hidden
          />
        </div>

        <div className="grid min-w-0 max-w-full gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="grid min-w-0 max-w-full gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Miming"
                      className={fieldControlClass}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sex"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Sex</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue placeholder="Male" />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        <SelectItem className={selectItemClass} value="Male">
                          Male
                        </SelectItem>
                        <SelectItem className={selectItemClass} value="Female">
                          Female
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <SelectField
              form={form}
              name="type"
              label="Type"
              placeholder="Kittenean"
              options={typeOptions}
            />

            <DatePickerField
              form={form}
              name="dateOfBirth"
              label="Date of Birth"
            />
            <DatePickerField
              form={form}
              name="dateOfDeath"
              label="Date of Death"
            />

            <SelectField
              form={form}
              name="motherCat"
              label="Mother Cat"
              placeholder="Kitteean"
              options={parentOptions}
            />
            <SelectField
              form={form}
              name="fatherCat"
              label="Father Cat"
              placeholder="Kitteean"
              options={parentOptions}
            />
            <SelectField
              form={form}
              name="adoptionStatus"
              label="Adoption Status"
              placeholder="Lorem Ipsum"
              options={statusOptions}
            />
            <SelectField
              form={form}
              name="location"
              label="Location"
              placeholder="Lorem Ipsum"
              options={locationOptions}
            />

            <FormField
              control={form.control}
              name="vitamins"
              render={({ fieldState }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Vitamins</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {vitaminOptions.map((option) => {
                        const active = selectedVitamins.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleArrayValue("vitamins", option)}
                            className={cn(
                              chipClass,
                              active
                                ? "bg-cateneo-orange text-cateneo-white"
                                : "text-cateneo-darkbrown hover:bg-cateneo-orange/20",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="healthStatus"
              render={({ fieldState }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Health Status</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap justify-left gap-2 lg:justify-start">
                      {healthOptions.map((option) => {
                        const active = selectedHealthStatuses.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              toggleArrayValue("healthStatus", option)
                            }
                            className={cn(
                              chipClass,
                              active
                                ? "bg-cateneo-orange text-cateneo-white"
                                : "bg-cateneo-white text-cateneo-darkbrown hover:bg-cateneo-orange/20",
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="personality"
              render={({ field, fieldState }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Personality</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Lorem Ipsum"
                      rows={3}
                      className={cn(
                        fieldControlClass,
                        "h-auto min-h-16 resize-y overflow-y-auto py-2 leading-snug wrap-anywhere",
                      )}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className="flex min-w-0 max-w-full flex-col items-center space-y-4 lg:items-stretch">
            <FormField
              control={form.control}
              name="image"
              render={({ fieldState }) => (
                <FormItem>
                  <FormControl>
                    <label
                      htmlFor="cat-image-upload"
                      className="mx-auto relative flex aspect-square w-full max-w-80 cursor-pointer items-center justify-center rounded-xl border-2 border-cateneo-darkbrown bg-white lg:mx-0"
                    >
                      <span className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-cateneo-black text-cateneo-white ">
                        <Plus className="size-4" />
                      </span>
                      {previewUrl ? (
                        <div className="relative h-full w-full overflow-hidden rounded-lg">
                          <Image
                            src={previewUrl}
                            alt="Cat preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center p-4 text-center">
                          <Upload className="size-8" />
                          <span className="text-sm">
                            Click to upload cat image
                          </span>
                        </div>
                      )}
                    </label>
                  </FormControl>
                  <input
                    id="cat-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0] ?? null;
                      form.setValue("image", file, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });
                    }}
                  />
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex w-full max-w-full min-w-0 flex-wrap items-center justify-center gap-2 lg:justify-start">
                      <FormLabel className="w-full text-cateneo-black lg:w-auto">
                        Color:
                      </FormLabel>

                      {colorOptions.map((option, colorIndex) => {
                        const selected = field.value === option.value;
                        const isAddColorSlot =
                          colorIndex === colorOptions.length - 1;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={cn(
                              "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
                              selected
                                ? "border-cateneo-orange bg-cateneo-orange/15 text-cateneo-orange"
                                : "border-cateneo-darkbrown text-cateneo-darkbrown hover:bg-cateneo-orange/15",
                            )}
                            aria-label={option.label}
                          >
                            <Image
                              src={
                                isAddColorSlot
                                  ? "/images/addcathead.svg"
                                  : "/images/cathead.svg"
                              }
                              alt=""
                              width={28}
                              height={23}
                              className="pointer-events-none size-7 object-contain"
                              aria-hidden
                            />
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="flex flex-wrap justify-center gap-4 pt-2 sm:gap-6">
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 rounded-full bg-cateneo-orange px-6 text-cateneo-white hover:bg-cateneo-orange/90"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={onCancel}
                className="h-10 rounded-full border border-cateneo-darkbrown bg-cateneo-black px-6 text-cateneo-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

function DatePickerField({
  form,
  name,
  label,
}: {
  form: UseFormReturn<EditCatFormData>;
  name: "dateOfBirth" | "dateOfDeath";
  label: string;
}) {
  const selectedDate = form.watch(name) as string;
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
              <PopoverPrimitive.Trigger asChild>
                <button type="button" className={dateButtonClass}>
                  <span className="min-w-0 flex-1 truncate text-left">
                    {selectedDate || "mm/dd/yyyy"}
                  </span>
                  <Calendar className="size-4 shrink-0" />
                </button>
              </PopoverPrimitive.Trigger>
              <PopoverPrimitive.Portal>
                <PopoverPrimitive.Content
                  sideOffset={8}
                  className="z-50 w-64 rounded-xl border-2 border-cateneo-darkbrown bg-cateneo-white p-3 shadow-md"
                >
                  <input
                    type="date"
                    value={(field.value ?? "") as string}
                    onChange={(event) => {
                      field.onChange(event.target.value);
                      setOpen(false);
                    }}
                    className={fieldControlClass}
                  />
                </PopoverPrimitive.Content>
              </PopoverPrimitive.Portal>
            </PopoverPrimitive.Root>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

function SelectField({
  form,
  name,
  label,
  placeholder,
  options,
}: {
  form: UseFormReturn<EditCatFormData>;
  name: "type" | "motherCat" | "fatherCat" | "adoptionStatus" | "location";
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {options.map((option) => (
                  <SelectItem
                    className={selectItemClass}
                    key={option}
                    value={option}
                  >
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
