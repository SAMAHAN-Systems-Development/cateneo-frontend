import { ListOfAdopteesTable } from "@/components/ui/list-of-adoptees-table";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-cateneo-white p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <ListOfAdopteesTable />
      </div>
    </div>
  );
}
