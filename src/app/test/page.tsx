"use client"; // Required because we are initializing form hooks and handling submit events

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Import your existing card components and types
import CateneanCard, { type CatProps } from "@/components/ui/catenean-card";
import KitteneanCard, { type KitteneanProps } from "@/components/ui/kittenean-card";

// Import your form component and its corresponding schema/types
import AddCatForm from "@/components/ui/add-cat-form"; // Adjust path if necessary
import { addCatFormSchema, type AddCatFormData } from "@/schemas/add-cat-form-schema";

const initialKitteneanData: KitteneanProps[] = [
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/200px-Cat_November_2010-1a.jpg",
    name: "Iggy",
    gender: "male",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["white", "black"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "A sleepy cuddle bug who loves warm laps and quiet corners. Iggy is calm, gentle, and happiest when napping beside his favorite human.",
    svgColor: "darkbrown",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Kittyply_edit1.jpg/200px-Kittyply_edit1.jpg",
    name: "Peddy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "06/12/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["black", "lightbrown", "white"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Energetic and playful, Peddy turns everything into a toy. She loves chasing strings, climbing furniture, and being the center of attention.",
    svgColor: "darkbrown",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg/200px-Orange_tabby_cat_sitting_on_fallen_leaves-Hisashi-01A.jpg",
    name: "Favvy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["lightbrown", "white"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Quiet and gentle, Favvy is a shy sweetheart who warms up slowly. Once comfortable, she loves soft pets and staying close to her person.",
    svgColor: "orange",
  },
  {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/200px-Cat03.jpg",
    name: "Anchy",
    gender: "female",
    parent: "Minggay",
    dateOfBirth: "07/07/2025",
    medicine: "Nematocide, LC Vit",
    residence: "Mezzanine Floor",
    color: ["white", "lightbrown"],
    healthStatus: "N/A",
    status: "Adopted",
    personality:
      "Curious and mischievous, Anchy loves exploring and investigating everything. She’s playful, brave, and always the first to discover new places.",
    svgColor: "orange",
  },
];

export default function TestPage() {
  // 1. Optional: Track data in React state if you want the form to dynamically add cards to the page
  const [kitteneans, setKitteneans] = React.useState<KitteneanProps[]>(initialKitteneanData);

  // 2. Initialize the react-hook-form instance
  const form = useForm<AddCatFormData>({
    resolver: zodResolver(addCatFormSchema),
    defaultValues: {
      name: "",
      sex: "Male",
      type: "CATenean",
      dateOfBirth: "",
      motherCat: "Kitteean",
      fatherCat: "Kitteean",
      adoptionStatus: "Available",
      location: "MEZZANINE_FLOOR",
      vitamins: [],
      healthStatus: [],
      vaccines: [],
      personality: "",
      color: [],
      image: null,
    },
  });

  // 3. Define your submission handler
  const handleAddCatSubmit = async (data: AddCatFormData) => {
    console.log("Form submitted successfully:", data);

    // Create a mock image URL if a file was uploaded, otherwise fallback to a placeholder
    const imageUrl = data.image ? URL.createObjectURL(data.image) : "/placeholder-cat.jpg";

    // Map form data to match the KitteneanProps structure
    const newCat: KitteneanProps = {
      imageUrl,
      name: data.name,
      gender: data.sex.toLowerCase() as "male" | "female",
      parent: data.motherCat, // Mapping motherCat to parent for demonstration
      dateOfBirth: data.dateOfBirth || "Unknown",
      medicine: data.vitamins.length > 0 ? data.vitamins.join(", ") : null,
      residence: data.location.replace("_", " "),
      color: data.color.length > 0 ? (data.color.map(c => c.toLowerCase()) as any) : ["white"],
      healthStatus: data.healthStatus.length > 0 ? data.healthStatus.join(", ") : "N/A",
      status: data.adoptionStatus,
      personality: data.personality,
      svgColor: "orange", // Or map this dynamically based on data.color
    };

    // Update state to instantly display the new cat card
    setKitteneans((prev) => [newCat, ...prev]);

    // Reset the form fields after successful submission
    form.reset();
  };

  const handleCancel = () => {
    form.reset();
    console.log("Form creation cancelled.");
  };

  return (
    <div className="min-h-screen bg-cateneo-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-12">
        
        {/* --- SECTION 1: ADD CAT FORM --- */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-cateneo-darkbrown">Cat Registration Setup</h2>
            <p className="text-sm text-cateneo-darkbrown/70 font-gaegu">Fill out the details below to add a new profile.</p>
          </div>
          
          <AddCatForm
            form={form}
            onSubmit={handleAddCatSubmit}
            onCancel={handleCancel}
            submitLabel="Add Cat Profile"
            title="Register Profile"
          />
        </section>

        <hr className="border-cateneo-darkbrown/20" />

        {/* --- SECTION 2: CAT CARDS GRID --- */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-cateneo-darkbrown">Kitteneans Directory</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kitteneans.map((kittenean, index) => (
              // Using index as a safe fallback key just in case duplicate names are added during testing
              <KitteneanCard key={`${kittenean.name}-${index}`} {...kittenean} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}