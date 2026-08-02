"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/api/users";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UsersTableProps {
    users: User[];
}

type SearchFormValues = {
    q: string;
};

export default function UsersTable({ users }: UsersTableProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryFromUrl = searchParams.get("q") || "";
    const searchParamsString = searchParams.toString();

    const { register, watch } = useForm<SearchFormValues>({
        defaultValues: {
            q: queryFromUrl,
        },
    });

    const watchedQuery = watch("q");
    const debouncedQuery = useDebounce(watchedQuery, 500);

    useEffect(() => {
        if (debouncedQuery === queryFromUrl) {
            return;
        }

        const params = new URLSearchParams(searchParamsString);

        if (debouncedQuery) {
            params.set("q", debouncedQuery);
        } else {
            params.delete("q");
        }
        params.set("page", "1");

        router.replace(`${pathname}?${params.toString()}`);
    }, [debouncedQuery, queryFromUrl, pathname, router, searchParamsString]);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center">
                <Input
                    placeholder="Search by name..."
                    {...register("q")}
                    className="w-full sm:max-w-sm"
                />
            </div>
            <div className="w-full overflow-x-auto rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-20 p-2 sm:p-4">ID</TableHead>
                            <TableHead className="p-2 sm:p-4">Full Name</TableHead>
                            <TableHead className="hidden p-2 sm:table-cell sm:p-4">Username</TableHead>
                            <TableHead className="hidden p-2 md:table-cell md:p-4">Email</TableHead>
                            <TableHead className="p-2 text-right sm:p-4">Phone</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell className="p-2 font-medium text-muted-foreground sm:p-4">
                                    #{user.id}
                                </TableCell>
                                <TableCell className="p-2 font-medium capitalize sm:p-4">
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell className="hidden p-2 sm:table-cell sm:p-4">
                                    <Badge variant="outline" className="text-xs">
                                        @{user.username}
                                    </Badge>
                                </TableCell>
                                <TableCell className="hidden p-2 text-muted-foreground md:table-cell md:p-4">
                                    {user.email}
                                </TableCell>
                                <TableCell className="p-2 text-right font-medium sm:p-4">
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