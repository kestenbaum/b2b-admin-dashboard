import { apiFetch } from "@/lib/api/client";

export interface User {
    id: number;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    phone: string;
}

interface DummyJsonUsersResponse {
    users: User[];
    total: number;
    skip: number;
    limit: number;
}

export interface GetUsersParams {
    page: number;
    limit: number;
}

export interface GetUsersResult {
    users: User[];
    total: number;
}

export async function getUsers({ page, limit }: GetUsersParams): Promise<GetUsersResult> {
    const skip = (page - 1) * limit;

    const data = await apiFetch<DummyJsonUsersResponse>(
        `/users?limit=${limit}&skip=${skip}`,
        { cache: "no-store" }
    );

    return { users: data.users, total: data.total };
}