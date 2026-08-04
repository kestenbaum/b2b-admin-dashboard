"use client";

import React, { useState } from "react";
import { useModal } from "@/app/(dashboard)/_components/providers/modal-provider";
import { ProductFormValues } from "@/app/(dashboard)/products/lib/validations/product";
import { createProductAction } from "@/app/(dashboard)/products/lib/actions";
import { Button } from "@/app/(dashboard)/_components/ui/button";
import { useRouter } from "next/navigation";
import { ProductForm } from "@/app/(dashboard)/products/_components/forms/product-form";

export function CreateProductButton() {
    const { openModal, closeModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleFormSubmit = async (data: ProductFormValues) => {
        setIsLoading(true);
        try {
            const result = await createProductAction(data);

            if (result.success) {
                closeModal();
                router.refresh();
            } else {
                alert("Error creating product");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = () => {
        openModal(
            <ProductForm onSubmit={handleFormSubmit} isLoading={isLoading} />,
            "Create New Product"
        );
    };

    return (
        <Button onClick={handleOpenModal}>
            Create
        </Button>
    );
}