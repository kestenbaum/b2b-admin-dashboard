"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Users } from "lucide-react";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Customers", href: "/users", icon: Users },
];

export function DesktopNav() {
    const pathname = usePathname();

    return (
        <nav className="flex-1 space-y-2 px-4 py-4">
            {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-muted",
                            isActive ? "bg-muted text-primary font-medium" : "text-muted-foreground"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {link.name}
                    </Link>
                );
            })}
        </nav>
    );
}

export function MobileNav() {
    const pathname = usePathname();

    return (
        <nav className="grid gap-4 text-lg font-medium mt-6">
            {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;

                return (
                    <SheetClose  key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                                "flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground hover:bg-muted",
                                isActive ? "bg-muted text-foreground font-medium" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {link.name}
                        </Link>
                    </SheetClose>
                );
            })}
        </nav>
    );
}