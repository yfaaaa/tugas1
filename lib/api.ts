const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiFetch = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Terjadi kesalahan pada server");
  }

  return response.json() as Promise<T>;
};