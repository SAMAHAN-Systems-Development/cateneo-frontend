"use client";

import * as React from "react";

import { useFindAllUsers } from "@/client/queries/user-queries";
import {
  ListOfUsersTable,
  type UserTableRow,
} from "@/components/ui/list-of-users-table";

const formatJoinedAt = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const normalizeRole = (value?: string) => {
  if (!value) return "-";
  if (value === "SUPERADMIN") return "Superadmin";
  if (value === "ADMIN") return "Admin";
  if (value === "VOLUNTEER") return "Volunteer";
  return value;
};

const normalizeIsBlocked = (isActive?: boolean) => {
  if (isActive === undefined) return "-";
  return isActive ? "No" : "Yes";
};

const Page = () => {
  const { data, isLoading, isError, error } = useFindAllUsers({
    page: 1,
    limit: 10,
  });

  const usersData = React.useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  const users = React.useMemo<UserTableRow[]>(() => {
    return usersData.map((user) => {
      const fullName = [user.firstName, user.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

      return {
        id: user.id,
        name: fullName || "-",
        role: normalizeRole(user.role),
        roleValue: user.role,
        isBlocked: normalizeIsBlocked(user.is_active),
        joinedAt: formatJoinedAt(user.createdAt),
      };
    });
  }, [usersData]);

  return (
    <div className="w-full px-3 pb-6 md:px-5 md:pb-8">
      <div className="mx-auto w-full max-w-7xl">
        {isError ? (
          <p className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            Failed to load users:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        ) : null}
        <ListOfUsersTable
          users={isLoading ? [] : users}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Page;
