import { describe, it, expect, vi } from 'vitest';
import { getUsers } from "@/app/(dashboard)/users/lib/api/users";
import { apiFetch } from "@/app/(dashboard)/lib/api/client";


vi.mock("@/app/(dashboard)/lib/api/client", () => ({
    apiFetch: vi.fn(),
}));

describe("getUsers", () => {
    it("should fetch users and return them", async () => {
        const mockUsers = {
            users: [
                { id: 1, username: "testuser1" },
                { id: 2, username: "testuser2" },
            ],
            total: 2,
        };
        (apiFetch as ReturnType<typeof vi.fn>).mockResolvedValue(mockUsers);

        const result = await getUsers({ page: 1, limit: 10 });

        expect(apiFetch).toHaveBeenCalledWith("/users?limit=10&skip=0", { cache: "no-store" });
        expect(result.users).toEqual(mockUsers.users);
        expect(result.total).toEqual(mockUsers.total);
    });
});
