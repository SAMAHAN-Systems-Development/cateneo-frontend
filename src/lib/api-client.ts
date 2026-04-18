const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

interface ApiRequestOptions extends RequestInit {
  body?: any;
}

const getResponseCache = new Map<string, unknown>();
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

/**
 * Refreshes the access token using the refresh token from HttpOnly cookie
 */
async function refreshAccessToken(): Promise<boolean> {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });

      if (res.ok) {
        return true;
      } else {
        // Redirect to login if refresh fails
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return false;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

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
    credentials: "include", // Include cookies (for access token)
  });

  // Handle 401 Unauthorized - attempt token refresh and retry
  if (res.status === 401 && !path.includes("/auth/")) {
    const tokenRefreshed = await refreshAccessToken();

    if (tokenRefreshed) {
      // Retry the original request with the new token
      const retryRes = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
          "Content-Type": "application/json",
          ...(headers ?? {}),
        },
        body: requestBody,
        ...cacheControl,
        ...rest,
        credentials: "include",
      });

      // Process the retry response
      return processResponse<TResponse>(retryRes, isGetRequest, cacheKey, path);
    } else {
      throw new Error("Token refresh failed");
    }
  }

  return processResponse<TResponse>(res, isGetRequest, cacheKey, path);
}

/**
 * Process the HTTP response and return the parsed data
 */
async function processResponse<TResponse>(
  res: Response,
  isGetRequest: boolean,
  cacheKey: string,
  path: string,
): Promise<TResponse> {
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
