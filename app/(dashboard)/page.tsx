import { PageHeader } from "@/components/page-header";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getUsers } from "@/lib/api/users";
import { getProducts, getMostExpensiveProduct } from "@/app/(dashboard)/products/lib/api/products";
import { Users, Package, Star, Tags } from "lucide-react";
import { TopDeals } from "@/components/dashboard/top-deals";
import { OverviewChart } from "@/components/dashboard/overview-chart";

export default async function DashboardOverview() {
    const [usersData, productsData, mostExpensiveProduct] = await Promise.all([
        getUsers({ page: 1, limit: 1 }),
        getProducts({ page: 1, limit: 0 }),
        getMostExpensiveProduct()
    ]);

    const totalUsers = usersData.total;
    const totalProducts = productsData.total;

    const averageRating = productsData.products.length > 0
        ? (productsData.products.reduce((acc, p) => acc + (p.rating || 0), 0) / productsData.products.length).toFixed(1)
        : "0.0";

    return (
        <div className="space-y-6">
            <PageHeader title="Dashboard" description="Overview of your store's performance." />

            <div className="grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{averageRating} / 5.0</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Most Expensive</CardTitle>
                        <Tags className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold truncate" title={mostExpensiveProduct?.title}>
                            {mostExpensiveProduct ? mostExpensiveProduct.title : "N/A"}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {mostExpensiveProduct ? `$${mostExpensiveProduct.price?.toFixed(2)}` : ""}
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
                <div className="col-span-1 lg:col-span-4">
                    <OverviewChart products={productsData.products} />
                </div>
                <div className="col-span-1 lg:col-span-3">
                    <TopDeals products={productsData.products} />
                </div>
            </div>
        </div>
    );
}