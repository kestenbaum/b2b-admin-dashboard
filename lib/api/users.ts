import { apiFetch } from "@/lib/api/client";

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
    return apiFetch<User[]>("/users", {
        cache: "no-cache",
    });
}