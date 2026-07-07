export interface User {
    id: number;
    email: string;
    username: string;
    name: {
        firstname: string;
        lastname: string;
    };
    phone: string;
}

export async function getUsers(): Promise<User[]> {
    const baseUrl = process.env.API_BASE_URL;

    if (!baseUrl) {
        throw new Error("API_BASE_URL is not defined in environment variables");
    }

    // Тянем юзеров с кэшированием
    const res = await fetch(`${baseUrl}/users`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch users");

    return res.json();
}