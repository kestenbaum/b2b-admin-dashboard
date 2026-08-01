import * as React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paginationItemVariants = cva(
    "inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            active: {
                true: "bg-primary text-primary-foreground",
                false: "hover:bg-accent hover:text-accent-foreground",
            },
        },
        defaultVariants: { active: false },
    }
);

export function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
    return (
        <nav
            aria-label="Пагинация"
            className={cn("flex items-center justify-center gap-1", className)}
            {...props}
        />
    );
}

export function PaginationLink({
                                   href,
                                   active,
                                   disabled,
                                   children,
                                   ariaLabel,
                               }: {
    href: string;
    active?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    ariaLabel?: string;
}) {
    if (disabled) {
        return (
            <span
                aria-disabled="true"
                className={cn(paginationItemVariants({ active }), "opacity-40")}
            >
        {children}
      </span>
        );
    }

    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            aria-label={ariaLabel}
            scroll={false}
            prefetch
            className={cn(paginationItemVariants({ active }))}
        >
            {children}
        </Link>
    );
}

export function PaginationEllipsis() {
    return (
        <span className="inline-flex h-9 w-9 items-center justify-center text-muted-foreground">
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">Ещё страницы</span>
    </span>
    );
}

export { ChevronLeft, ChevronRight };