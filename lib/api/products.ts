import { apiFetch } from "@/lib/api/client";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    thumbnail: string;
}

export interface Category {
    slug: string;
    name: string;
    url: string;
}

interface DummyJsonProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface GetProductsParams {
    page: number;
    limit: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface GetProductsResult {
    products: Product[];
    total: number;
}

export async function getProducts({
    page,
    limit,
    category,
    minPrice,
    maxPrice,
}: GetProductsParams): Promise<GetProductsResult> {
    const skip = (page - 1) * limit;
    const categoryPath = category ? `/category/${category}` : "";
    const url = `/products${categoryPath}?limit=0&skip=0`;

    const data = await apiFetch<DummyJsonProductsResponse>(url, {
        next: { revalidate: 3600 },
    });

    let filteredProducts = data.products;

    if (minPrice) {
        filteredProducts = filteredProducts.filter(
            (product) => product.price >= minPrice
        );
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(
            (product) => product.price <= maxPrice
        );
    }

    const total = filteredProducts.length;
    const paginatedProducts = filteredProducts.slice(skip, skip + limit);

    return { products: paginatedProducts, total };
}

export async function getCategories(): Promise<Category[]> {
    return await apiFetch<Category[]>("/products/categories", {
        next: { revalidate: 3600 },
    });
}
