"use server"

import { apiFetch } from "@/app/(dashboard)/lib/api/client"
import { revalidatePath } from "next/cache"
import { ProductFormValues } from "@/app/(dashboard)/products/lib/validations/product";

export async function deleteProductAction(id: number | string) {
    try {
        await apiFetch(`/products/${id}`, {
            method: 'DELETE',
        })

        revalidatePath("/products")

        return { success: true }
    } catch (error) {
        console.error("Failed to delete product:", error)
        return { success: false, error: "Failed to delete product" }
    }
}

export async function createProductAction(data: ProductFormValues) {
    try {
        const response = await apiFetch('/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        revalidatePath("/products");

        return { success: true, data: response };
    } catch (error) {
        console.error("Failed to create product:", error);
        return { success: false, error: "Failed to create product" };
    }
}