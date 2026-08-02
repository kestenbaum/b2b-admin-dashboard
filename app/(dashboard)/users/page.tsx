import { getUsers } from "@/lib/api/users";
import { clampPage } from "@/lib/pagination";
import { PaginationControls } from "@/components/pagination-controls";
import UsersTable from "@/app/(dashboard)/users/_components/users-table";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function UsersPage({searchParams,}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;

  const page = typeof resolvedParams.page === "string" ? resolvedParams.page : undefined;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : undefined;

  const requestedPage = Number(page ?? 1);

  const { users, total } = await getUsers({
    page: requestedPage,
    limit: PAGE_SIZE,
    q,
  });

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const currentPage = clampPage(requestedPage, totalPages);

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your client base and accounts.
          </p>
        </div>

        <UsersTable users={users} />
        <PaginationControls currentPage={currentPage} totalPages={totalPages} />
      </div>
  );
}