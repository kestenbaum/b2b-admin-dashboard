import { getCategories, getProducts } from "@/lib/api/products";
import { clampPage } from "@/lib/pagination";
import { PaginationControls } from "@/components/pagination-controls";
import { ProductsTable } from "@/app/(dashboard)/products/_components/products-table";
import React from "react";
import { PageHeader } from "@/components/page-header";
import { ProductsFilters } from "@/app/(dashboard)/products/_components/products-filters";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function ProductsPage({searchParams,}: {
    searchParams: Promise<{
        page?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
    }>;
}) {
    const resolvedParams = await searchParams;
    const { page, category, minPrice, maxPrice } = resolvedParams;

    const requestedPage = Number(page ?? 1);

    const [categories, { products, total }] = await Promise.all([
        getCategories(),
        getProducts({
            page: requestedPage,
            limit: PAGE_SIZE,
            category: category,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
        }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const currentPage = clampPage(requestedPage, totalPages);

    if (requestedPage !== currentPage) {
        const newSearchParams = new URLSearchParams();
        if (category) {
            newSearchParams.set("category", category);
        }
        if (minPrice) {
            newSearchParams.set("minPrice", minPrice);
        }
        if (maxPrice) {
            newSearchParams.set("maxPrice", maxPrice);
        }
        newSearchParams.set("page", currentPage.toString());
        redirect(`/products?${newSearchParams.toString()}`);
    }

    return (
        <section className="space-y-6">
            <PageHeader title="Products" description="Manage your store inventory." />
            <ProductsFilters categories={categories} />
            <ProductsTable products={products} />
            <PaginationControls currentPage={currentPage} totalPages={totalPages} />
        </section>
    );
}