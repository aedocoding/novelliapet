const BASE_URL = "http://localhost:4000";

export async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, options);
  if (!res.ok) throw new Error((await res.json()).error);
  if (res.status === 204) return undefined as T;
  return res.json();
}
