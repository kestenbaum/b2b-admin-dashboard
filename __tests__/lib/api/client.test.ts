import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch } from "@/lib/api/client";

process.env.API_BASE_URL = "https://dummyjson.com";

describe("apiFetch", () => {
    const mockFetch = vi.fn();

    beforeEach(() => {
        vi.stubGlobal('fetch', mockFetch);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        mockFetch.mockClear();
    });

    it("should fetch data successfully and return JSON", async () => {
        const mockData = { message: "success" };
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const result = await apiFetch("/test-endpoint");

        expect(mockFetch).toHaveBeenCalledWith("https://dummyjson.com/test-endpoint", undefined);
        expect(result).toEqual(mockData);
    });

    it("should pass options to the fetch call", async () => {
        const mockData = { message: "success" };
        const fetchOptions = { method: "POST", body: JSON.stringify({ data: "payload" }) };
        mockFetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await apiFetch("/test-endpoint", fetchOptions);

        expect(mockFetch).toHaveBeenCalledWith("https://dummyjson.com/test-endpoint", fetchOptions);
    });

    it("should throw an error when the API response is not ok", async () => {
        mockFetch.mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found",
        });

        await expect(apiFetch("/test-endpoint")).rejects.toThrow(
            "API Error on /test-endpoint: 404 Not Found"
        );
    });
});
