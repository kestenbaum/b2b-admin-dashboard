"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
    openModal: (content: ReactNode, title?: string) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState<ReactNode>(null);
    const [title, setTitle] = useState<string | undefined>();

    const openModal = (newContent: ReactNode, newTitle?: string) => {
        setContent(newContent);
        setTitle(newTitle);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
        setTitle(undefined);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
                        onClick={closeModal}
                    />

                    <div className="relative z-10 w-full max-w-lg rounded-xl border bg-background p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between pb-4 mb-4 border-b">
                            {title ? (
                                <h2 className="text-lg font-semibold">{title}</h2>
                            ) : (
                                <div />
                            )}
                            <button
                                onClick={closeModal}
                                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md"
                            >
                                ✕
                            </button>
                        </div>

                        <div>{content}</div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};