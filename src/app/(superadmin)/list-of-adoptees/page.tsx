"use client";

import * as React from "react";

import { useGetRegisteredAdopters } from "@/client/queries/adopters-queries";
import {
  ListOfAdopteesTable,
  type Adoptee,
} from "@/components/ui/list-of-adoptees-table";
import type { RegisteredAdoptersResponseDTO } from "@/client/service/adopters-service";

const getTableRows = (
  data: {
    full_name?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    age?: number;
    contact_number?: string;
    contactNumber?: string;
    email?: string;
    address?: string;
  }[] = [],
): Adoptee[] => {
  return data.map((item) => {
    const fullName =
      item.full_name ??
      item.fullName ??
      [item.firstName, item.lastName].filter(Boolean).join(" ");

    return {
      name: fullName || "-",
      age: item.age ?? "-",
      contactNumber: item.contact_number ?? item.contactNumber ?? "-",
      email: item.email ?? "-",
      address: item.address ?? "-",
      adoptedCat: "-",
    };
  });
};

const Page = () => {
  const [search, setSearch] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data, isLoading, isError, error } = useGetRegisteredAdopters(
    currentPage,
    itemsPerPage,
  ) as {
    data?: RegisteredAdoptersResponseDTO;
    isLoading: boolean;
    isError: boolean;
    error: unknown;
  };

  const tableRows = React.useMemo(() => {
    const rows = getTableRows(data?.data ?? []);
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

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  const isSearching = search.trim().length > 0;
  const totalPages = isSearching ? 1 : (data?.meta.totalPages ?? 1);

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
          onItemsPerPageChange={setItemsPerPage}
          currentPage={currentPage}
          totalPages={Math.max(1, totalPages)}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      </div>
    </main>
  );
};

export default Page;
