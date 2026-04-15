"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AddCatForm from "@/components/ui/add-cat-form";
import {
  addCatFormDefaultValues,
  addCatFormSchema,
  type AddCatFormData,
} from "@/schemas/add-cat-form-schema";

const Page = () => {
  const form = useForm<AddCatFormData>({
    resolver: zodResolver(addCatFormSchema),
    defaultValues: addCatFormDefaultValues,
  });

  const handleSubmit = async (_data: AddCatFormData) => {
    // Submission wiring to API mutation can be added next.
  };

  const handleCancel = () => {
    form.reset(addCatFormDefaultValues);
  };

  return (
    <main className="px-3 py-6 md:px-5">
      <div className="mx-auto w-full max-w-7xl">
        <AddCatForm
          form={form}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          className="w-full max-w-none sm:max-w-none md:max-w-none lg:max-w-none"
        />
      </div>
    </main>
  );
};

export default Page;
