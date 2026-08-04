import { apiFetch } from "@/app/(dashboard)/lib/api/client";

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
    q?: string;
}

export interface GetUsersResult {
    users: User[];
    total: number;
}

export async function getUsers({ page, limit, q }: GetUsersParams): Promise<GetUsersResult> {
    const skip = (page - 1) * limit;

    const params = new URLSearchParams({
        limit: String(limit),
        skip: String(skip),
    });

    const endpoint = q ? '/users/search' : '/users';
    if (q) {
        params.set('q', q);
    }

    const url = `${endpoint}?${params.toString()}`;

    const data = await apiFetch<DummyJsonUsersResponse>(
        url,
        { cache: "no-store" }
    );

    return { users: data.users, total: data.total };
}
