import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useAdminUpdateCat } from "@/client/mutations/cat-mutations";
import type { UpdateCatDTO } from "@/client/service/catenean-service";

const changes: UpdateCatDTO = {
  name: "Updated Miming",
  reproductiveStatus: "Neutered",
  vitamins: ["Nematocide", "LCVit"],
};

const savedCat = { id: 42, ...changes, imageUrl: "/images/original.jpg" };

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function renderSaveMutation() {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false, gcTime: 0 } },
  });

  return renderHook(() => useAdminUpdateCat(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    ),
  });
}

describe("saving cat edits through the API", () => {
  let fetchMock: ReturnType<typeof vi.fn<typeof fetch>>;

  beforeEach(() => {
    fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("saves fields as JSON without uploading when the image is unchanged", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(savedCat));
    const { result } = renderSaveMutation();

    await act(async () => {
      await expect(
        result.current.mutateAsync({ id: 42, formData: changes, image: null }),
      ).resolves.toEqual(savedCat);
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, request] = fetchMock.mock.calls[0];
    expect(url).toEqual(expect.stringMatching(/\/api\/cats\/admin\/42$/));
    expect(request).toMatchObject({ method: "PATCH", credentials: "include" });
    expect(new Headers(request?.headers).get("Content-Type")).toBe(
      "application/json",
    );
    expect(JSON.parse(request?.body as string)).toEqual(changes);
  });

  it("uploads the selected file as multipart and stays pending until it finishes", async () => {
    const image = new File(["new cat image"], "miming.png", { type: "image/png" });
    const updatedCat = { ...savedCat, imageUrl: "/images/miming.png" };
    let finishUpload!: (response: Response) => void;
    const uploadResponse = new Promise<Response>((resolve) => {
      finishUpload = resolve;
    });
    fetchMock
      .mockResolvedValueOnce(jsonResponse(savedCat))
      .mockReturnValueOnce(uploadResponse);
    const { result } = renderSaveMutation();
    const onSuccess = vi.fn();
    let save!: ReturnType<typeof result.current.mutateAsync>;

    act(() => {
      save = result.current.mutateAsync(
        { id: 42, formData: changes, image },
        { onSuccess },
      );
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(result.current.isPending).toBe(true);
    });
    const [url, request] = fetchMock.mock.calls[1];
    expect(url).toEqual(expect.stringMatching(/\/api\/cats\/admin\/42\/image$/));
    expect(request).toMatchObject({ method: "POST", credentials: "include" });
    expect(request?.body).toBeInstanceOf(FormData);
    expect((request?.body as FormData).get("image")).toBe(image);
    expect(new Headers(request?.headers).has("Content-Type")).toBe(false);
    expect(onSuccess).not.toHaveBeenCalled();

    await act(async () => {
      finishUpload(jsonResponse(updatedCat));
      await expect(save).resolves.toEqual(updatedCat);
    });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(onSuccess).toHaveBeenCalledOnce();
  });

  it("reports an upload failure instead of reporting that the complete edit succeeded", async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse(savedCat))
      .mockResolvedValueOnce(jsonResponse({ message: "Image upload failed" }, 500));
    const { result } = renderSaveMutation();
    const onSuccess = vi.fn();

    await act(async () => {
      await expect(
        result.current.mutateAsync(
          {
            id: 42,
            formData: changes,
            image: new File(["image"], "miming.png", { type: "image/png" }),
          },
          { onSuccess },
        ),
      ).rejects.toThrow("Image upload failed");
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("does not upload an image when saving the fields fails", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({ message: "Invalid cat details" }, 400),
    );
    const { result } = renderSaveMutation();

    await act(async () => {
      await expect(
        result.current.mutateAsync({
          id: 42,
          formData: changes,
          image: new File(["image"], "miming.png", { type: "image/png" }),
        }),
      ).rejects.toThrow("Invalid cat details");
    });

    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("preserves the multipart file when retrying an upload after token refresh", async () => {
    const image = new File(["new cat image"], "miming.png", { type: "image/png" });
    const updatedCat = { ...savedCat, imageUrl: "/images/miming.png" };
    fetchMock
      .mockResolvedValueOnce(jsonResponse(savedCat))
      .mockResolvedValueOnce(jsonResponse({ message: "Unauthorized" }, 401))
      .mockResolvedValueOnce(jsonResponse({ success: true }))
      .mockResolvedValueOnce(jsonResponse(updatedCat));
    const { result } = renderSaveMutation();

    await act(async () => {
      await expect(
        result.current.mutateAsync({ id: 42, formData: changes, image }),
      ).resolves.toEqual(updatedCat);
    });

    expect(fetchMock).toHaveBeenCalledTimes(4);
    expect(fetchMock.mock.calls[2][0]).toEqual(
      expect.stringMatching(/\/api\/auth\/refresh-token$/),
    );
    const [originalUrl, originalRequest] = fetchMock.mock.calls[1];
    const [retryUrl, retryRequest] = fetchMock.mock.calls[3];
    expect(retryUrl).toBe(originalUrl);
    expect(retryRequest).toMatchObject({ method: "POST", credentials: "include" });
    expect(retryRequest?.body).toBe(originalRequest?.body);
    expect((retryRequest?.body as FormData).get("image")).toBe(image);
    expect(new Headers(retryRequest?.headers).has("Content-Type")).toBe(false);
  });
});
