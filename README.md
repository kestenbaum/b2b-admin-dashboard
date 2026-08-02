# B2B Admin Dashboard (TradeMinds)

This is a B2B admin dashboard project named TradeMinds, built with Next.js App Router and TypeScript.

## Technology Stack

*   **Next.js**: Utilizes the App Router for routing and rendering.
*   **TypeScript**: Strict mode is enabled for enhanced code quality and type safety.
*   **Tailwind CSS + shadcn/ui**: For styling and UI components. Note: Do not directly modify files in `components/ui`. Wrap them for customization if needed.
*   **State Management**: Zustand (not Redux) is used for managing application state.

## Project Structure

*   **`app/(dashboard)/...`**: Contains dashboard pages, with each feature (e.g., `products`, `users`) organized in its own folder.
*   **`components/ui`**: Houses base shadcn/ui components (e.g., `button`, `card`, `table`).
*   **`lib/api`**: This layer handles backend requests, with one file per entity (e.g., `products.ts`, `users.ts`).
*   **`lib/pagination.ts`**: Contains shared pagination logic, reused across the application.
*   **`__tests__`**: Directory for all project tests.

## Conventions

*   **Components**: Functional components, PascalCase, default export.
*   **Data/Type Files**: camelCase naming convention.
*   **Pagination**: Always use `clampPage()` from `lib/pagination.ts`; avoid manual boundary logic in components.
*   **API Error Handling**: Handled via `error.tsx` boundary (Next.js convention); avoid `try/catch` within page components.
*   **Styling**: Exclusively Tailwind CSS classes; inline styles are not used.

## What NOT to do without explicit request

*   Do not directly modify files in `components/ui`.
*   Do not add new dependencies without explaining the necessity.
*   Do not rewrite existing pagination or API layer logic for aesthetic reasons.
*   Do not delete existing tests.

## Testing

*   Tests are located in the `__tests__` directory.
*   To run tests: `npm run test`

## Before completing a task

*   Run `eslint` / `prettier` before considering the task complete.
*   If types in `lib/api` are changed, ensure all usages are updated.

## Component Extraction Guidelines

Extract components into a separate file only if:
*   The component is reused in 2 or more places, OR
*   It contains its own logic/state, OR
*   It exceeds ~50 lines of JSX.
Simple static elements (headers, wrappers without logic) should remain inline within the parent file.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Available Scripts

In the project directory, you can run:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts a production Next.js server.
*   `npm run lint`: Runs ESLint to check for code quality issues.
*   `npm run test`: Runs tests using Vitest.

## Dependencies

The project uses the following dependencies:

*   `@base-ui/react`
*   `@radix-ui/react-select`
*   `@radix-ui/react-slot`
*   `class-variance-authority`
*   `clsx`
*   `lucide-react`
*   `next`
*   `react`
*   `react-dom`
*   `react-hook-form`
*   `shadcn`
*   `tailwind-merge`
*   `tw-animate-css`

## Dev Dependencies

The project uses the following development dependencies:

*   `@tailwindcss/postcss`
*   `@testing-library/dom`
*   `@testing-library/jest-dom`
*   `@testing-library/react`
*   `@types/node`
*   `@types/react`
*   `@types/react-dom`
*   `@vitejs/plugin-react`
*   `eslint`
*   `eslint-config-next`

## Live Version
* https://b2b-admin-dashboard-drab.vercel.app/
