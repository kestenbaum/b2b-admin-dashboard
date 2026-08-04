"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { Category } from "@/lib/api/products";

export function ProductsFilters({ categories }: { categories: Category[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            category: searchParams.get("category") ?? "all",
            minPrice: searchParams.get("minPrice") ?? "",
            maxPrice: searchParams.get("maxPrice") ?? "",
        },
    });

    const handleFiltersChange = handleSubmit((data) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1");

        if (data.category && data.category !== "all") {
            params.set("category", data.category);
        } else {
            params.delete("category");
        }
        if (data.minPrice) {
            params.set("minPrice", data.minPrice);
        } else {
            params.delete("minPrice");
        }
        if (data.maxPrice) {
            params.set("maxPrice", data.maxPrice);
        } else {
            params.delete("maxPrice");
        }
        replace(`${pathname}?${params.toString()}`);
    });

    const uniqueCategories = Array.from(
        new Map(categories.map((cat) => [cat.slug, cat])).values()
    );

    return (
        <form
            onSubmit={handleFiltersChange}
            className="flex flex-col gap-4 sm:flex-row sm:items-center"
        >
            <Controller
                name="category"
                control={control}
                render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <SelectTrigger className="w-full sm:w-45">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="max-h-75 overflow-y-auto">
                            <SelectItem value="all">All Categories</SelectItem>
                            {uniqueCategories.map((cat) => (
                                <SelectItem key={cat.slug} value={cat.slug}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            <Input
                {...register("minPrice")}
                type="number"
                placeholder="Min price"
                className="w-full sm:w-32"
            />
            <Input
                {...register("maxPrice")}
                type="number"
                placeholder="Max price"
                className="w-full sm:w-32"
            />
            <Button type="submit" className="w-full sm:w-auto">Apply</Button>
        </form>
    );
}