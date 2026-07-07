export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export async function getProducts(): Promise<Product[]> {
    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not defined in environment variables");
    }

    const res = await fetch(`${baseUrl}/products`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch products");


    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res.json();
}