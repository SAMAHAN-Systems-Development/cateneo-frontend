import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  useReactivateUser,
  useSoftDeleteUser,
  useUpdateUserStatus,
} from "@/client/mutations/user-mutations";

const user = {
  id: 42,
  firstName: "Alex",
  lastName: "Santos",
  email: "alex@example.com",
  role: "Volunteer",
  is_active: true,
};

const userListKeys = [
  ["find-all-users"],
  ["find-all-users", { page: 1, limit: 10 }],
  ["find-all-users", { page: 2, limit: 10 }],
];

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function renderStatusMutation<T>(useStatusMutation: () => T) {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false, gcTime: 0 } },
  });
  userListKeys.forEach((key) => queryClient.setQueryData(key, [user]));
  queryClient.setQueryData(["unrelated-query"], { value: true });

  const hook = renderHook(useStatusMutation, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    ),
  });

  return { ...hook, queryClient };
}

describe("changing managed user status", () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => vi.unstubAllGlobals());

  it.each([false, true])(
    "PATCHes isActive=%s and invalidates every user list after success",
    async (isActive) => {
      const savedUser = { ...user, is_active: isActive };
      fetchMock.mockResolvedValueOnce(jsonResponse(savedUser));
      const { result, queryClient } = renderStatusMutation(useUpdateUserStatus);

      await act(async () => {
        await expect(
          result.current.mutateAsync({ id: "42", isActive }),
        ).resolves.toEqual(savedUser);
      });

      expect(fetchMock).toHaveBeenCalledOnce();
      const [url, request] = fetchMock.mock.calls[0];
      expect(new URL(String(url)).pathname).toBe("/api/users/42/status");
      expect(request).toMatchObject({ method: "PATCH", credentials: "include" });
      expect(new Headers(request?.headers).get("Content-Type")).toBe(
        "application/json",
      );
      expect(JSON.parse(request?.body as string)).toEqual({ isActive });
      userListKeys.forEach((key) => {
        expect(queryClient.getQueryState(key)?.isInvalidated).toBe(true);
      });
      expect(
        queryClient.getQueryState(["unrelated-query"])?.isInvalidated,
      ).toBe(false);
      await waitFor(() => expect(result.current.isSuccess).toBe(true));
    },
  );

  it.each([
    [400, "You cannot deactivate your own account"],
    [403, "Forbidden resource"],
  ])(
    "reports a %s failure without success or invalidating lists",
    async (status, message) => {
      fetchMock.mockResolvedValueOnce(jsonResponse({ message }, status));
      const { result, queryClient } = renderStatusMutation(useUpdateUserStatus);
      const onSuccess = vi.fn();

      await act(async () => {
        await expect(
          result.current.mutateAsync(
            { id: "42", isActive: false },
            { onSuccess },
          ),
        ).rejects.toThrow(message);
      });

      await waitFor(() => expect(result.current.isError).toBe(true));
      expect(fetchMock).toHaveBeenCalledOnce();
      expect(onSuccess).not.toHaveBeenCalled();
      userListKeys.forEach((key) => {
        expect(queryClient.getQueryState(key)?.isInvalidated).toBe(false);
        expect(queryClient.getQueryData(key)).toEqual([user]);
      });
    },
  );

  it.each([
    { action: "block", useStatusMutation: useSoftDeleteUser, isActive: false },
    { action: "unblock", useStatusMutation: useReactivateUser, isActive: true },
  ])(
    "keeps the existing $action hook compatible with the status endpoint",
    async ({ useStatusMutation, isActive }) => {
      const savedUser = { ...user, is_active: isActive };
      fetchMock.mockResolvedValueOnce(jsonResponse(savedUser));
      const { result, queryClient } = renderStatusMutation(useStatusMutation);

      await act(async () => {
        await expect(result.current.mutateAsync("42")).resolves.toEqual(savedUser);
      });

      expect(fetchMock).toHaveBeenCalledOnce();
      const [url, request] = fetchMock.mock.calls[0];
      expect(new URL(String(url)).pathname).toBe("/api/users/42/status");
      expect(request).toMatchObject({ method: "PATCH", credentials: "include" });
      expect(JSON.parse(request?.body as string)).toEqual({ isActive });
      userListKeys.forEach((key) => {
        expect(queryClient.getQueryState(key)?.isInvalidated).toBe(true);
      });
    },
  );
});
