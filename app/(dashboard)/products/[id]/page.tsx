import { notFound } from "next/navigation";
import { getProductById, Product } from "@/lib/api/products";
import { PageHeader } from "@/components/page-header";
import ProductBreadcrumbs from "@/app/(dashboard)/products/[id]/_components/product-breadcrumbs";
import ProductGallery from "@/app/(dashboard)/products/[id]/_components/product-gallery";
import ProductContent from "@/app/(dashboard)/products/[id]/_components/product-content";

interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <section className="space-y-6">
            <ProductBreadcrumbs product={product} />
            <PageHeader
                title={product.title}
                description={product.description}
            />
            <div className="grid gap-6 md:grid-cols-2">
                <ProductGallery product={product} />
                <ProductContent product={product} />
            </div>
        </section>
    );
}