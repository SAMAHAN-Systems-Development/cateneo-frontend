"use client";

import * as React from "react";
import Image from "next/image";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { Popover as PopoverPrimitive } from "radix-ui";
import { Calendar, Plus, Upload } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { CatColorIcon } from "@/components/ui/cat-color-icon";
import { type AddCatFormData } from "@/schemas/add-cat-form-schema";

interface AddCatFormProps {
  form: UseFormReturn<AddCatFormData>;
  onSubmit: (data: AddCatFormData) => void | Promise<void>;
  onCancel?: () => void;
  className?: string;
  submitLabel?: string;
  title?: string;
}

//temporary dropdown values
const typeOptions = [
  "CATenean",
  "KITTENean",
  "Rescued_CATenean",
  "Rescued_KITTENean",
];
const parentOptions = ["Kitteean", "Snowpaw", "Ambertail", "Whisker"];
const statusOptions = [
  "Available",
  "Adoption_Pending",
  "Resident",
  "TooYoung",
  "NotReady",
];
const locationOptions = [
  "MEZZANINE_FLOOR",
  "RODRIGUEZ_HALL",
  "ROXAS_BENCHES",
  "DEL_ROSARIO_GAZEBO",
  "JUBILEE_BUILDING",
  "CENTRAL_CONVENIENCE",
];
const vitaminOptions = ["Nematocide", "LCVit"];
const healthOptions = ["Spayed", "Neutered"];
const vaccineOptions = ["Anti-Rabies"];
const colorOptions = [
  { value: "Black", label: "Black" },
  { value: "White", label: "White" },
  { value: "Gray", label: "Gray" },
  { value: "Orange", label: "Orange" },
  { value: "DarkBrown", label: "Dark Brown" },
  { value: "LightBrown", label: "Light Brown" },
];

const colorFillMap: Record<string, string> = {
  Black: "#1F1F1F",
  White: "#F1EDE2",
  Gray: "#8A8A8A",
  Orange: "#E3981B",
  DarkBrown: "#83491B",
  LightBrown: "#BF7900",
};

const chipClass =
  "inline-flex h-8 min-h-8 items-center justify-center rounded-full border-2 border-cateneo-darkbrown px-2.5 text-sm font-gaegu font-medium text-cateneo-darkbrown transition-colors";

/** Single-line controls: compact height + Gaegu to match form typography */
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

export default function AddCatForm({
  form,
  onSubmit,
  onCancel,
  className,
  submitLabel = "Confirm",
  title = "Add New Cat",
}: AddCatFormProps) {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const imageFile = useWatch({ control: form.control, name: "image" });
  const selectedType = useWatch({ control: form.control, name: "type" });
  const selectedVitamins = useWatch({
    control: form.control,
    name: "vitamins",
  });
  const selectedHealthStatuses = useWatch({
    control: form.control,
    name: "healthStatus",
  });
  const selectedVaccines = useWatch({
    control: form.control,
    name: "vaccines",
  });

  const isRescued = selectedType?.startsWith("Rescued_") ?? false;

  // Clear dateRescued when switching away from a rescued classification
  React.useEffect(() => {
    if (!isRescued) {
      form.setValue("dateRescued", "", { shouldValidate: false });
    }
  }, [isRescued, form]);

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
    field: "vitamins" | "healthStatus" | "vaccines",
    value: string,
  ) => {
    const current = form.getValues(field);
    const nextValues = current.includes(value)
      ? current.filter((item) => item !== value)
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
            className="size-6 sm:size-8 shrink-0 lg:hidden"
            aria-hidden
          />
          {/* TWEAK: Made text slightly smaller on mobile to prevent clipping */}
          <h2 className="text-1xl sm:text-3xl font-bold font-playpen">
            {title}
          </h2>
          <Image
            src="/images/paw.svg"
            alt=""
            width={32}
            height={32}
            className="size-6 sm:size-8 shrink-0"
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
              placeholder="CATenean"
              options={typeOptions}
            />
            <DateOfBirthField form={form} />
            {isRescued && <DateRescuedField form={form} />}
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
              placeholder="Select location"
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
                        const active = selectedHealthStatuses[0] === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              form.setValue("healthStatus", [option], {
                                shouldValidate: true,
                                shouldDirty: true,
                              })
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
              name="vaccines"
              render={({ fieldState }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Vaccines</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap justify-left gap-2 lg:justify-start">
                      {vaccineOptions.map((option) => {
                        const active = selectedVaccines.includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleArrayValue("vaccines", option)}
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
                    {/* TWEAK: Removed flex wrappers on the parent and added `mx-auto` right to the label */}
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

                      {colorOptions.map((option) => {
                        const selected = field.value.includes(option.value);
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              const nextValues = selected
                                ? field.value.filter(
                                    (value) => value !== option.value,
                                  )
                                : [...field.value, option.value];
                              field.onChange(nextValues);
                            }}
                            className={cn(
                              "inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors",
                              selected
                                ? "border-cateneo-orange bg-cateneo-orange/15 text-cateneo-orange"
                                : "border-cateneo-darkbrown text-cateneo-darkbrown hover:bg-cateneo-orange/15",
                            )}
                            aria-label={option.label}
                          >
                            <CatColorIcon
                              fill={colorFillMap[option.value] ?? "#83491B"}
                              className="pointer-events-none size-7 shrink-0 object-contain"
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

            {/* TWEAK: Added `flex-wrap` and adjusted `gap-4 sm:gap-6` in case the buttons run out of horizontal space */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 pt-2">
              {/* Reminder: run `npm run test` before pushing this integration. */}
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="h-10 rounded-full bg-cateneo-orange px-6 text-cateneo-white hover:bg-cateneo-orange/90"
              >
                {submitLabel}
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

function DateOfBirthField({ form }: { form: UseFormReturn<AddCatFormData> }) {
  const selectedDate = form.watch("dateOfBirth");
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="dateOfBirth"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Date of Birth</FormLabel>
          <FormControl>
            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
              <PopoverPrimitive.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    fieldControlClass,
                    "flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden",
                  )}
                >
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
                    value={field.value}
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

function DateRescuedField({ form }: { form: UseFormReturn<AddCatFormData> }) {
  const selectedDate = form.watch("dateRescued");
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={form.control}
      name="dateRescued"
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>Date Rescued</FormLabel>
          <FormControl>
            <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
              <PopoverPrimitive.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    fieldControlClass,
                    "flex min-w-0 max-w-full items-center justify-between gap-2 overflow-hidden",
                  )}
                >
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
                    value={field.value}
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
  form: UseFormReturn<AddCatFormData>;
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
