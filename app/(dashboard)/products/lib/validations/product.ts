import { z } from "zod";

export const productSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters long"),
    price: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(0.01, "Price must be greater than 0")
    ),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    thumbnail: z.string().min(1, "Thumbnail URL is required"),
    discountPercentage: z.preprocess(
        (val) => (val === "" || val === undefined ? undefined : Number(val)),
        z.number().min(0).max(100).optional()
    ),
    brand: z.string().optional(),
    stock: z.preprocess(
        (val) => (val === "" || val === undefined ? 0 : Number(val)),
        z.number().int().min(0).optional()
    ),
    weight: z.preprocess(
        (val) => (val === "" || val === undefined ? undefined : Number(val)),
        z.number().min(0).optional()
    ),
    sku: z.string().optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;