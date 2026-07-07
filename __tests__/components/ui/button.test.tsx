import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

import { Button } from "@/components/ui/button";

describe("UI Component: Button", () => {
    it("renders children correctly", () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("applies the destructive variant class", () => {
        render(<Button variant="destructive">Delete</Button>);
        expect(screen.getByText("Delete")).toHaveClass("text-destructive");
    });
});