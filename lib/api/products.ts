import { apiFetch } from "@/lib/api/client";

export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    thumbnail: string;
    rating?: number;
    discountPercentage?: number;
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
    const params = new URLSearchParams();

    let shouldFilterClientSide = false;

    if (minPrice || maxPrice) {
        params.set("limit", "0");
        params.set("skip", "0");
        shouldFilterClientSide = true;
    } else {
        params.set("limit", String(limit));
        params.set("skip", String(skip));
    }

    const url = `/products${categoryPath}?${params.toString()}`;

    const data = await apiFetch<DummyJsonProductsResponse>(url, {
        next: { revalidate: 3600 },
    });

    if (shouldFilterClientSide) {
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
    } else {
        return { products: data.products, total: data.total };
    }
}

export async function getCategories(): Promise<Category[]> {
    return await apiFetch<Category[]>("/products/categories", {
        next: { revalidate: 3600 },
    });
}

export async function getMostExpensiveProduct(): Promise<Product | null> {
    const { products } = await getProducts({ page: 1, limit: 0 }); // Fetch all products
    if (products.length === 0) {
        return null;
    }

    const mostExpensive = products.reduce((prev, current) => {
        return (prev.price > current.price) ? prev : current;
    });

    return mostExpensive;
}