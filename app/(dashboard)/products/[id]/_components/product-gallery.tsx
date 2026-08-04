import React from 'react';
import type { Product } from "@/lib/api/products";
import { Card, CardContent } from "@/components/ui/card";

interface ProductGalleryProps {
    product: Product;
}

const ProductGallery = ({ product }: ProductGalleryProps) => {
    return (
        <div className="space-y-4">
            <div className="space-y-4">
                <Card className="overflow-hidden">
                    <CardContent className="p-0 flex justify-center bg-white">
                        {
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-100 w-full object-contain"
                            />}
                    </CardContent>
                </Card>

                <ProductGallery product={product} />
            </div>
            <div>
                {product.images && product.images.length > 1 && (
                    <div className="flex gap-4 overflow-x-auto pb-2">
                        {product.images.map((img) => (
                            <div key={product.id} className="h-24 w-24 shrink-0 border rounded-md overflow-hidden bg-white">
                                {// eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={img}
                                        alt={`${product.title}`}
                                        className="h-full w-full object-contain"
                                    />}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGallery;