"use server"

import { apiFetch } from "@/lib/api/client"
import { revalidatePath } from "next/cache"

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