import Link from "next/link";
import { ReactNode } from "react";
import { LayoutDashboard, Menu, Package, Users } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen w-full bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
                        <Package className="h-6 w-6" />
                        <span className="text-lg">TradeMinds</span>
                    </Link>
                </div>
                <nav className="flex-1 space-y-2 px-4 py-4">
                    <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                        <LayoutDashboard className="h-4 w-4" />
                        Overview
                    </Link>
                    <Link href="/products" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                        <Package className="h-4 w-4" />
                        Products
                    </Link>
                    <Link href="/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
                        <Users className="h-4 w-4" />
                        Customers
                    </Link>
                </nav>
            </aside>

            <main className="flex flex-1 flex-col sm:pl-64 w-full min-w-0">
                <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger
                            className={`${buttonVariants({ variant: "outline", size: "icon" })} shrink-0 sm:hidden`}
                        >
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[250px] sm:hidden">
                            <nav className="grid gap-4 text-lg font-medium mt-6">
                                <SheetClose>
                                    <Link href="/" className="flex items-center gap-2 text-lg font-semibold mb-4 text-primary px-2">
                                        <Package className="h-6 w-6" />
                                        <span>TradeMinds</span>
                                    </Link>
                                </SheetClose>
                                <SheetClose>
                                    <Link href="/" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                                        <LayoutDashboard className="h-5 w-5" />
                                        Overview
                                    </Link>
                                </SheetClose>
                                <SheetClose>
                                    <Link href="/products" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                                        <Package className="h-5 w-5" />
                                        Products
                                    </Link>
                                </SheetClose>
                                <SheetClose>
                                    <Link href="/users" className="flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted">
                                        <Users className="h-5 w-5" />
                                        Customers
                                    </Link>
                                </SheetClose>
                            </nav>
                        </SheetContent>
                    </Sheet>

                    <div className="w-full flex-1">
                     <span className="text-sm text-muted-foreground hidden sm:inline-block">
                       Welcome back, Admin
                     </span>
                    </div>
                </header>

                <div className="flex-1 p-4 md:p-6 lg:p-8 w-full min-w-0">
                    {children}
                </div>
            </main>
        </div>
    );
}
