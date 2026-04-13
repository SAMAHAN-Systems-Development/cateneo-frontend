const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

interface ApiRequestOptions extends RequestInit {
  body?: any;
}

const getResponseCache = new Map<string, unknown>();

export async function apiClient<TResponse>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<TResponse> {
  const { body, headers, ...rest } = options;
  const requestBody =
    body === undefined
      ? undefined
      : typeof body === "string"
        ? body
        : JSON.stringify(body);

  const isGetRequest = !body && (!rest.method || rest.method === "GET");
  const cacheControl = isGetRequest ? { cache: "no-store" as const } : {};
  const cacheKey = `${(rest.method ?? "GET").toUpperCase()} ${API_BASE_URL}${path}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
    body: requestBody,
    ...cacheControl,
    ...rest,
  });

  // Reuse cached GET payload for 304 responses.
  if (res.status === 304) {
    if (isGetRequest && getResponseCache.has(cacheKey)) {
      return getResponseCache.get(cacheKey) as TResponse;
    }

    return undefined as TResponse;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed with status ${res.status}`);
  }

  if (res.status === 204) {
    return undefined as TResponse;
  }

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const parsed = (await res.json()) as TResponse;

    if (isGetRequest) {
      getResponseCache.set(cacheKey, parsed as unknown);
    }

    return parsed;
  }

  const text = await res.text();
  return text as TResponse;
}
