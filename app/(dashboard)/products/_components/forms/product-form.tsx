"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/(dashboard)/_components/ui/button";
import { Input } from "@/app/(dashboard)/_components/ui/input";
import { Card, CardContent } from "@/app/(dashboard)/_components/ui/card";
import { ProductFormValues, productSchema } from "@/app/(dashboard)/products/lib/validations/product";

interface ProductFormProps {
    initialData?: ProductFormValues;
    onSubmit: (data: ProductFormValues) => void;
    isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as any,
        defaultValues: initialData || {
            title: "",
            price: undefined,
            category: "",
            description: "",
            thumbnail: "",
            discountPercentage: undefined,
            brand: "",
            stock: undefined,
            weight: undefined,
            sku: "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Product Title</label>
                        <Input placeholder="e.g. iPhone 15 Pro" {...register("title")} />
                        {errors.title && (
                            <p className="text-sm text-destructive">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Price ($)</label>
                            <Input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
                            {errors.price && (
                                <p className="text-sm text-destructive">{errors.price.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Discount Percentage (%)</label>
                            <Input type="number" step="0.1" {...register("discountPercentage", { valueAsNumber: true })} />
                            {errors.discountPercentage && (
                                <p className="text-sm text-destructive">{errors.discountPercentage.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Stock Quantity</label>
                            <Input type="number" {...register("stock", { valueAsNumber: true })} />
                            {errors.stock && (
                                <p className="text-sm text-destructive">{errors.stock.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Weight (g)</label>
                            <Input type="number" {...register("weight", { valueAsNumber: true })} />
                            {errors.weight && (
                                <p className="text-sm text-destructive">{errors.weight.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Input placeholder="smartphones" {...register("category")} />
                            {errors.category && (
                                <p className="text-sm text-destructive">{errors.category.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Brand (Optional)</label>
                            <Input placeholder="Apple" {...register("brand")} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">SKU</label>
                            <Input placeholder="SKU-12345" {...register("sku")} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thumbnail URL</label>
                            <Input placeholder="https://..." {...register("thumbnail")} />
                            {errors.thumbnail && (
                                <p className="text-sm text-destructive">{errors.thumbnail.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea
                            className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            placeholder="Enter product description..."
                            {...register("description")}
                        />
                        {errors.description && (
                            <p className="text-sm text-destructive">{errors.description.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </form>
    );
}