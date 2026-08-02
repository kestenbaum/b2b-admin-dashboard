import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getProducts, getCategories, deleteProduct, getProductById } from "@/lib/api/products";
import { apiFetch } from "@/lib/api/client";

vi.mock("@/lib/api/client", () => ({
    apiFetch: vi.fn(),
}));

const mockProducts = {
    products: [
        { id: 1, title: "Product 1", price: 10, category: "cat1" },
        { id: 2, title: "Product 2", price: 20, category: "cat1" },
        { id: 3, title: "Product 3", price: 30, category: "cat2" },
        { id: 4, title: "Product 4", price: 40, category: "cat2" },
    ],
    total: 4,
};

describe("getProducts", () => {
    beforeEach(() => {
        (apiFetch as ReturnType<typeof vi.fn>).mockClear();
    });

    it("should fetch and paginate products without filters", async () => {
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);

        const result = await getProducts({ page: 1, limit: 2 });

        expect(apiFetch).toHaveBeenCalledWith(
            "/products?limit=2&skip=0",
            expect.anything()
        );
        expect(result.products).toHaveLength(4);
        expect(result.products[0].id).toBe(1);
        expect(result.total).toBe(4);
    });

    it("should filter by category", async () => {
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue({
            products: mockProducts.products.filter(p => p.category === 'cat1'),
            total: 2
        });

        const result = await getProducts({ page: 1, limit: 2, category: "cat1" });

        expect(apiFetch).toHaveBeenCalledWith(
            "/products/category/cat1?limit=2&skip=0",
            expect.anything()
        );
        expect(result.products).toHaveLength(2);
        expect(result.products.every(p => p.category === 'cat1')).toBe(true);
    });

    it("should filter by minPrice", async () => {
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);
        const result = await getProducts({ page: 1, limit: 4, minPrice: 25 });
        expect(result.products).toHaveLength(2);
        expect(result.products.every(p => p.price >= 25)).toBe(true);
        expect(result.total).toBe(2);
    });

    it("should filter by maxPrice", async () => {
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);
        const result = await getProducts({ page: 1, limit: 4, maxPrice: 25 });
        expect(result.products).toHaveLength(2);
        expect(result.products.every(p => p.price <= 25)).toBe(true);
        expect(result.total).toBe(2);
    });
});

describe("getCategories", () => {
    it("should fetch categories", async () => {
        const mockCategories = [
            { slug: "cat1", name: "Category 1", url: "" },
            { slug: "cat2", name: "Category 2", url: "" }
        ];
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockCategories);

        const result = await getCategories();

        expect(apiFetch).toHaveBeenCalledWith("/products/categories", { next: { revalidate: 3600 } });
        expect(result).toEqual(mockCategories);
    });
});

describe("Products API: getProductById & deleteProduct", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getProductById", () => {
        it("should successfully fetch and return a product by id", async () => {
            const mockProduct = { id: 1, title: "Test Product", price: 99.99, category: "test", description: "desc", thumbnail: "url" };
            vi.mocked(apiFetch).mockResolvedValueOnce(mockProduct);

            const result = await getProductById(1);

            expect(apiFetch).toHaveBeenCalledWith("/products/1", { next: { revalidate: 3600 } });
            expect(result).toEqual(mockProduct);
        });

        it("should catch error and return null when product is not found or request fails", async () => {
            vi.mocked(apiFetch).mockRejectedValueOnce(new Error("API Error"));

            const result = await getProductById(999);

            expect(apiFetch).toHaveBeenCalledWith("/products/999", { next: { revalidate: 3600 } });
            expect(result).toBeNull();
        });
    });

    describe("deleteProduct", () => {
        it("should execute DELETE request with correct method", async () => {
            const mockDeletedResponse = { id: 1, isDeleted: true };
            vi.mocked(apiFetch).mockResolvedValueOnce(mockDeletedResponse);

            const result = await deleteProduct(1);

            expect(apiFetch).toHaveBeenCalledWith("/products/1", { method: "DELETE" });
            expect(result).toEqual(mockDeletedResponse);
        });

        it("should throw error when deletion fails", async () => {
            const mockError = new Error("Failed to delete");
            vi.mocked(apiFetch).mockRejectedValueOnce(mockError);

            await expect(deleteProduct(1)).rejects.toThrow("Failed to delete");
        });
    });
});
