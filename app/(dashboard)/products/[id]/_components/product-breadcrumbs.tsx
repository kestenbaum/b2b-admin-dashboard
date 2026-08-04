import React from 'react';
import Link from "next/link";
import type { Product } from "@/lib/api/products";

interface ProductBreadcrumbsProps {
    product: Product;
}

const ProductBreadcrumbs = ({ product }: ProductBreadcrumbsProps) => {
    return (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">
                Products
            </Link>
            <span className="text-foreground capitalize">/ {product.category}</span>
            <span className="text-foreground truncate max-w-50">/ {product.title}</span>
        </div>
    );
};

export default ProductBreadcrumbs;