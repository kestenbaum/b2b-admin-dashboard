"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from "lucide-react"

import { deleteProductAction } from "@/app/(dashboard)/products/actions"
import { toast } from "@/lib/hooks/use-toast";

interface DeleteProductButtonProps {
    id: number | string
    onSuccess?: () => void
}

export function DeleteProductButton({
                                        id,
                                        onSuccess
                                    }: DeleteProductButtonProps) {
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteProductAction(id)

            if (result.success) {
                toast({
                    title: "Success",
                    description: `Product #${id} has been successfully deleted.`,
                })
                onSuccess?.()
            } else {
                toast({
                    title: "Error",
                    description: result.error || "Failed to delete product.",
                })
            }
        })
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={handleDelete}
            disabled={isPending}
            className="text-muted-foreground hover:text-destructive transition-colors"
        >
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    )
}