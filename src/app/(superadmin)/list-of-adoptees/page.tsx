"use client";

import * as React from "react";

import { useFindAdoptees } from "@/client/queries/adoptees-queries";
import type {
  AdopteeCatDTO,
  AdopteeDTO,
} from "@/client/service/adoptees-service";
import {
  ListOfAdopteesTable,
  type Adoptee,
} from "@/components/ui/list-of-adoptees-table";

const formatAdoptedCats = (cats: AdopteeCatDTO[] = []) => {
  const catNames = cats.map((cat) => cat.name).filter(Boolean);

  return catNames.length ? catNames.join(", ") : "-";
};

const toTableRow = (adoptee: AdopteeDTO): Adoptee => ({
  name: adoptee.fullName || "-",
  age: adoptee.age ?? "-",
  contactNumber: adoptee.contactNumber || "-",
  email: adoptee.email || "-",
  address: adoptee.address || "-",
  adoptedCat: formatAdoptedCats(adoptee.cats),
});

const Page = () => {
  const [search, setSearch] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isLoading, isError, error } = useFindAdoptees(
    currentPage,
    itemsPerPage,
  );

  const tableRows = React.useMemo(() => {
    const rows = (data?.data ?? []).map(toTableRow);
    const query = search.trim().toLowerCase();

    if (!query) return rows;

    return rows.filter((row) => {
      const haystack = [
        row.name,
        String(row.age),
        row.contactNumber,
        row.email,
        row.address,
        row.adoptedCat,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [data, search]);

  const totalPages = Math.max(1, data?.meta.totalPages ?? 1);

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  React.useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  return (
    <main className="w-full px-3 py-6 md:px-5">
      <div className="mx-auto w-full max-w-7xl">
        {isError ? (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Failed to load adoptees:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        ) : null}

        <ListOfAdopteesTable
          adoptees={tableRows}
          search={search}
          onSearchChange={setSearch}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default Page;
