import AdoptionProcessSection from "@/components/section/adoption-process-section";


import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import AddCatForm from "@/components/ui/add-cat-form";
import {
  addCatFormDefaultValues,
  addCatFormSchema,
  type AddCatFormData,
} from "@/schema/add-cat-form-schema";

const Page = () => {
  const form = useForm<AddCatFormData>({
    resolver: zodResolver(addCatFormSchema),
    defaultValues: addCatFormDefaultValues,
  });

  return (
    <div>
        <AdoptionProcessSection />
    </div>
  );
};

export default Page;
