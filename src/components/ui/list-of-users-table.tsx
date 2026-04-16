"use client";

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function DropdownMenu(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) min-w-32 origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:overflow-hidden data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  );
}

function Table({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<"table"> & { containerClassName?: string }) {
  return (
    <div
      data-slot="table-container"
      className={cn("relative w-full overflow-x-auto", containerClassName)}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
}

export interface UserTableRow {
  name: string;
  role: string;
  joinedAt: string;
}

const PAGE_SIZE_OPTIONS = [5, 10, 25, 50] as const;

function getVisiblePages(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 1) return [1];
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, "ellipsis", total];
  if (current >= total - 3)
    return [1, "ellipsis", total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

function formatPageLabel(n: number) {
  return String(n).padStart(2, "0");
}

export interface ListOfUsersTableProps {
  users?: UserTableRow[];
  className?: string;
  onFilterClick?: () => void;
  onViewUser?: (user: UserTableRow) => void;
  onEditUser?: (user: UserTableRow) => void;
  onDeleteUser?: (user: UserTableRow) => void;
}

export function ListOfUsersTable({
  users = [],
  className,
  onFilterClick,
  onViewUser,
  onEditUser,
  onDeleteUser,
}: ListOfUsersTableProps) {
  const [search, setSearch] = React.useState("");
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((row) => {
      const hay = [row.name, row.role, row.joinedAt].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, itemsPerPage]);

  React.useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  const pageRows = React.useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const visiblePages = React.useMemo(
    () => getVisiblePages(currentPage, totalPages),
    [currentPage, totalPages],
  );

  return (
    <section
      className={cn(
        "font-playpen w-full rounded-2xl bg-cateneo-white p-4 text-cateneo-darkbrown md:p-6",
        className,
      )}
    >
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          List of Users
        </h2>

        <div className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap md:items-center lg:w-auto lg:justify-end">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium">Showing</span>
            <Select
              value={String(itemsPerPage)}
              onValueChange={(v) => setItemsPerPage(Number(v))}
            >
              <SelectTrigger className="font-playpen h-9 w-18 rounded-full border-cateneo-darkbrown/30 bg-[#EEDCBE] px-3 text-sm font-medium text-cateneo-darkbrown shadow-none focus:ring-cateneo-darkbrown/20 [&_svg]:text-cateneo-darkbrown/80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-playpen border-cateneo-darkbrown/20 bg-cateneo-white text-sm text-cateneo-darkbrown">
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <SelectItem
                    key={n}
                    value={String(n)}
                    className="font-playpen text-cateneo-darkbrown focus:bg-[#EEDCBE] focus:text-cateneo-darkbrown data-highlighted:bg-[#EEDCBE] data-highlighted:text-cateneo-darkbrown"
                  >
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                className="h-9 shrink-0 rounded-full border-0 bg-cateneo-lightbrown px-4 text-white hover:bg-cateneo-lightbrown/90"
              >
                <Filter className="size-4 text-white" aria-hidden />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="font-playpen min-w-48 border-cateneo-darkbrown/20 bg-cateneo-white text-sm text-cateneo-darkbrown"
            >
              <DropdownMenuItem
                className="font-playpen focus:bg-[#EEDCBE] focus:text-cateneo-darkbrown"
                onSelect={() => onFilterClick?.()}
              >
                Filter options…
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="relative w-full min-w-0 sm:min-w-50 sm:flex-1 lg:max-w-md">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-cateneo-darkbrown/80"
              aria-hidden
            />
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-full rounded-full border-cateneo-darkbrown/40 bg-cateneo-white pl-9 pr-3 text-cateneo-darkbrown placeholder:text-cateneo-darkbrown/50 focus-visible:border-cateneo-darkbrown focus-visible:ring-cateneo-darkbrown/20"
            />
          </div>
        </div>
      </div>

      <div className="w-full min-w-0">
        <Table
          className="text-cateneo-darkbrown"
          containerClassName={cn(
            "max-md:overflow-x-scroll max-md:pb-1 lg:overflow-x-auto",
            "max-md:[scrollbar-width:thin]",
            "max-md:[scrollbar-color:rgba(131,73,27,0.55)_rgba(241,237,226,0.95)]",
            "max-md:[&::-webkit-scrollbar]:h-2.5",
            "max-md:[&::-webkit-scrollbar-track]:rounded-full max-md:[&::-webkit-scrollbar-track]:bg-cateneo-darkbrown/15",
            "max-md:[&::-webkit-scrollbar-thumb]:rounded-full max-md:[&::-webkit-scrollbar-thumb]:bg-cateneo-darkbrown/45",
            "max-md:[&::-webkit-scrollbar-thumb]:hover:bg-cateneo-darkbrown/60",
          )}
        >
          <TableHeader className="bg-[#EEDCBE]">
            <TableRow className="hover:bg-[#EEDCBE]">
              <TableHead className="min-w-48 rounded-tl-2xl border-b-2 border-cateneo-black px-3 py-3 font-bold text-cateneo-black">
                Name
              </TableHead>
              <TableHead className="min-w-32 border-b-2 border-cateneo-black px-3 py-3 font-bold text-cateneo-black">
                Role
              </TableHead>
              <TableHead className="min-w-36 border-b-2 border-cateneo-black px-3 py-3 font-bold text-cateneo-black">
                Joined At
              </TableHead>
              <TableHead className="min-w-28 rounded-tr-2xl border-b-2 border-cateneo-black px-3 py-3 font-bold text-cateneo-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow className="border-0 hover:bg-transparent">
                <TableCell colSpan={4} className="py-8 text-center">
                  No users match your search.
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row, idx) => (
                <TableRow
                  key={`${row.name}-${row.joinedAt}-${idx}`}
                  className="border-0 hover:bg-cateneo-orange/5"
                >
                  <TableCell className="px-3 py-2.5">{row.name}</TableCell>
                  <TableCell className="px-3 py-2.5">{row.role}</TableCell>
                  <TableCell className="px-3 py-2.5">{row.joinedAt}</TableCell>
                  <TableCell className="px-3 py-2.5">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-8 w-8 rounded-full p-0 text-cateneo-black hover:bg-cateneo-orange/10"
                          aria-label={`Open actions for ${row.name}`}
                        >
                          <MoreHorizontal className="size-4" aria-hidden />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="font-playpen min-w-40 border-cateneo-darkbrown/20 bg-cateneo-white text-sm text-cateneo-darkbrown"
                      >
                        <DropdownMenuItem
                          className="font-playpen focus:bg-[#EEDCBE] focus:text-cateneo-darkbrown"
                          onSelect={() => onViewUser?.(row)}
                        >
                          View profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="font-playpen focus:bg-[#EEDCBE] focus:text-cateneo-darkbrown"
                          onSelect={() => onEditUser?.(row)}
                        >
                          Edit role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => onDeleteUser?.(row)}
                        >
                          Remove user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <footer className="mt-4 flex items-center justify-between gap-2 border-t border-cateneo-darkbrown/30 pt-4">
        <Button
          type="button"
          variant="ghost"
          className="h-9 shrink-0 gap-1 rounded-full px-2 font-playpen text-cateneo-black hover:bg-cateneo-orange/10"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          <ChevronLeft className="size-4" aria-hidden />
          Previous
        </Button>

        <nav
          className="flex min-w-0 flex-1 flex-wrap items-center justify-center gap-1.5 sm:gap-2"
          aria-label="Pagination"
        >
          {visiblePages.map((item, i) =>
            item === "ellipsis" ? (
              <span
                key={`e-${i}`}
                className="px-1 text-cateneo-black"
                aria-hidden
              >
                ...
              </span>
            ) : (
              <Button
                key={item}
                type="button"
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 min-w-8 rounded-full px-2 font-playpen text-sm",
                  item === currentPage
                    ? "font-bold text-cateneo-black"
                    : "text-cateneo-black/70 hover:bg-cateneo-orange/10",
                )}
                onClick={() => setCurrentPage(item)}
                aria-current={item === currentPage ? "page" : undefined}
              >
                {formatPageLabel(item)}
              </Button>
            ),
          )}
        </nav>

        <Button
          type="button"
          variant="ghost"
          className="h-9 shrink-0 gap-1 rounded-full px-2 font-playpen text-cateneo-black hover:bg-cateneo-orange/10"
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
          <ChevronRight className="size-4" aria-hidden />
        </Button>
      </footer>
    </section>
  );
}
