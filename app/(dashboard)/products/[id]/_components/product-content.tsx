import React from 'react';
import { Badge } from "@/app/(dashboard)/_components/ui/badge";
import { Card, CardContent } from "@/app/(dashboard)/_components/ui/card";
import { Package, Star } from "lucide-react";
import type { Product } from "@/app/(dashboard)/products/lib/api/products";

interface ProductContentProps {
    product: Product;
}

const ProductContent = ({ product }: ProductContentProps) => {
    return (
        <section className="space-y-6">
            <div>
                <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>
                {(product.discountPercentage ?? 0) > 0 && (
                    <Badge variant="destructive" className="mt-2">
                        -{product.discountPercentage}% OFF
                    </Badge>
                )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardContent className="p-4 flex items-center space-x-4">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                            <p className="text-sm font-medium leading-none">Rating</p>
                            <p className="text-sm text-muted-foreground">{product.rating} / 5</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center space-x-4">
                        <Package className="h-5 w-5 text-muted-foreground" />
                        <div>
                            <p className="text-sm font-medium leading-none">Stock Status</p>
                            <p className="text-sm text-muted-foreground">
                                {(product.stock ?? 0) > 0 ? `${product.stock} units available` : "Out of stock"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg border-b pb-2">Specifications</h3>
                    <dl className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <dt className="text-muted-foreground">Brand</dt>
                            <dd className="font-medium">{product.brand || "Generic"}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Category</dt>
                            <dd className="font-medium capitalize">{product.category}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">SKU</dt>
                            <dd className="font-medium">{product.sku}</dd>
                        </div>
                        <div>
                            <dt className="text-muted-foreground">Weight</dt>
                            <dd className="font-medium">{product.weight}g</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </section>
    );
};

export default ProductContent;