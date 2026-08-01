import { apiFetch } from "@/lib/api/client";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    thumbnail: string;
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
}

export interface GetProductsResult {
    products: Product[];
    total: number;
}

export async function getProducts({page, limit,}: GetProductsParams): Promise<GetProductsResult> {
    const skip = (page - 1) * limit;

    const data = await apiFetch<DummyJsonProductsResponse>(
        `/products?limit=${limit}&skip=${skip}`,
        { next: { revalidate: 3600 } }
    );

    return { products: data.products, total: data.total };
}