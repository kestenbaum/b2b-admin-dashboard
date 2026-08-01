import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUsers } from "@/lib/api/users";
import { clampPage } from "@/lib/pagination";
import { PaginationControls } from "@/components/pagination-controls";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function UsersPage({searchParams,}: {
    searchParams: Promise<{ page?: string }>;
}) {

    const { page } = await searchParams;
    const requestedPage = Number(page ?? 1);

    const { users, total } = await getUsers({
        page: requestedPage,
        limit: PAGE_SIZE
    });

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = clampPage(requestedPage, totalPages);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                <p className="text-muted-foreground">Manage your client base and accounts.</p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium text-muted-foreground">
                                    #{user.id}
                                </TableCell>
                                <TableCell className="font-medium capitalize">
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-xs">
                                        @{user.username}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.email}
                                </TableCell>
                                <TableCell className="text-right font-medium">
                                    {user.phone}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </div>
    );
}