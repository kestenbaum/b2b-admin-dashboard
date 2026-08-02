"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"
import { deleteProduct } from "@/lib/api/products"
import { useRouter } from "next/navigation"
import { toast } from "@/lib/hooks/use-toast";

interface DeleteProductButtonProps {
    id: number | string
    redirectAfterDelete?: boolean
    onSuccess?: () => void
}

export function DeleteProductButton({
                                        id,
                                        redirectAfterDelete = false,
                                        onSuccess
                                    }: DeleteProductButtonProps) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleDelete = async () => {
        try {
            setIsLoading(true)

            await deleteProduct(id)

            toast({
                title: "Success",
                description: `Product #${id} has been successfully deleted.`,
            })

            if (onSuccess) {
                onSuccess()
            }

            if (redirectAfterDelete) {
                router.push("/products")
            }
        } catch {
            toast({
                title: "Error",
                description: "Failed to delete product.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isLoading}
            className="text-muted-foreground hover:text-destructive transition-colors"
        >
            {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    )
}