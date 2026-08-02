import { notFound } from "next/navigation";
import { getProductById } from "@/lib/api/products";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Package } from "lucide-react";
import Link from "next/link";

interface ProductDetailPageProps {
    params: {
        id: string;
    };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/products" className="hover:text-primary transition-colors">
                    Products
                </Link>
                <span>/</span>
                <span className="text-foreground capitalize">{product.category}</span>
                <span>/</span>
                <span className="text-foreground truncate max-w-50">{product.title}</span>
            </div>

            <PageHeader
                title={product.title}
                description={product.description}
            />

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Card className="overflow-hidden">
                        <CardContent className="p-0 flex justify-center bg-white">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="h-100 w-full object-contain"
                            />
                        </CardContent>
                    </Card>

                    {product.images && product.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <div key={idx} className="h-24 w-24 shrink-0 border rounded-md overflow-hidden bg-white">
                                    <img
                                        src={img}
                                        alt={`${product.title} ${idx}`}
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
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
                </div>
            </div>
        </div>
    );
}