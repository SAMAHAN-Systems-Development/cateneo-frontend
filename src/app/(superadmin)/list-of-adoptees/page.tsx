import { ListOfAdopteesTable } from "@/components/ui/list-of-adoptees-table";

const Page = () => {
  return (
    <main className="px-3 py-6 md:px-5">
      <div className="mx-auto w-full max-w-7xl">
        <ListOfAdopteesTable />
      </div>
    </main>
  );
};

export default Page;
