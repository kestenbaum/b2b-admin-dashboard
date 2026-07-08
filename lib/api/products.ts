import { apiFetch } from "@/lib/api/client";


export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export async function getProducts(): Promise<Product[]> {
    return apiFetch<Product[]>("/products", {
        next: { revalidate: 3600 },
    });
}