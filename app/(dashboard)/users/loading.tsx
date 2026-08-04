import { Skeleton } from "@/app/(dashboard)/_components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/(dashboard)/_components/ui/table";

export default function UsersLoading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="mb-2 h-9 w-40" />
                <Skeleton className="h-5 w-64" />
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20">ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="text-right">Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-37.5" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-25 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-50" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="ml-auto h-5 w-30" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}