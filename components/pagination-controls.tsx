"use client";

import { useSearchParams, usePathname } from "next/navigation";
import { getPaginationRange, buildPageHref } from "@/lib/pagination";
import {
    Pagination,
    PaginationLink,
    PaginationEllipsis,
    ChevronLeft,
    ChevronRight,
} from "@/components/ui/pagination";

export function PaginationControls({currentPage, totalPages,}: {
    currentPage: number;
    totalPages: number;
}) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const range = getPaginationRange({ currentPage, totalPages, siblingCount: 1 });

    return (
        <Pagination className="flex-wrap justify-start sm:justify-center">
            <PaginationLink
                href={buildPageHref(pathname, searchParams, currentPage - 1)}
                disabled={currentPage === 1}
                ariaLabel="Предыдущая страница"
            >
                <ChevronLeft className="h-4 w-4" />
            </PaginationLink>

            {range.map((item, i) =>
                item === "ellipsis" ? (
                    <PaginationEllipsis key={`ellipsis-${i}`} />
                ) : (
                    <PaginationLink
                        key={item}
                        href={buildPageHref(pathname, searchParams, item)}
                        active={item === currentPage}
                        ariaLabel={`Страница ${item}`}
                    >
                        {item}
                    </PaginationLink>
                )
            )}

            <PaginationLink
                href={buildPageHref(pathname, searchParams, currentPage + 1)}
                disabled={currentPage === totalPages}
                ariaLabel="Следующая страница"
            >
                <ChevronRight className="h-4 w-4" />
            </PaginationLink>
        </Pagination>
    );
}
