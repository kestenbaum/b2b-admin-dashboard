const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "https://dummyjson.com";

if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined in environment variables");
}

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${baseUrl}${endpoint}`;

    const res = await fetch(url, options);

    if (!res.ok) {
        throw new Error(`API Error on ${endpoint}: ${res.status} ${res.statusText}`);
    }

    return await res.json() as Promise<T>;
}