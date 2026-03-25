"use client";

import AddCatForm from "@/components/ui/add-cat-form";
import type { AddCatFormData } from "@/schema/add-cat-form-schema";

const Page = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-3 sm:px-4">
        <h1 className="mb-6 text-center text-3xl font-bold text-cateneo-darkbrown font-playpen">
          Welcome to Cateneo
        </h1>
        <AddCatForm
          submitLabel="Save Cat"
          onSubmit={(data: AddCatFormData) => {
            console.log("Add cat:", data);
          }}
          onCancel={() => {
            console.log("Cancel");
          }}
        />
      </div>
    </div>
  );
};

export default Page;
