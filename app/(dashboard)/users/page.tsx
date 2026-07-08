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

export const dynamic = "force-dynamic";

export default async function UsersPage() {
    const users = await getUsers();

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
                                    {user.name.firstname} {user.name.lastname}
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
        </div>
    );
}