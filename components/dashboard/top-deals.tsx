import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/app/(dashboard)/products/lib/api/products";

interface TopDealsProps {
    products: Product[];
}

export function TopDeals({ products }: TopDealsProps) {
    const topDiscountedProducts = [...products]
        .sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0))
        .slice(0, 5);

    return (
        <Card className="h-full w-full">
            <CardHeader>
                <CardTitle className="text-lg">Top Deals</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                {topDiscountedProducts.map((product) => (
                    <div key={product.id} className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-muted">
                                {product.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="object-cover h-full w-full"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                        NA
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-none truncate max-w-37.5" title={product.title}>
                                    {product.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    ${product.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                        <div className="font-medium text-red-500 text-sm bg-red-500/10 px-2 py-1 rounded-md">
                            -{product.discountPercentage?.toFixed(1)}%
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}