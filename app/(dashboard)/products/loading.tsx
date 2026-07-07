import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function ProductsLoading() {
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
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-5 w-8" /></TableCell>
                                <TableCell><Skeleton className="h-10 w-10 rounded-md" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-[250px]" /></TableCell>
                                <TableCell><Skeleton className="h-5 w-[100px] rounded-full" /></TableCell>
                                <TableCell className="text-right"><Skeleton className="ml-auto h-5 w-16" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}