import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/api/products";

interface ProductsTableProps {
  products: Product[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  return (
    <section className="w-full min-w-0 rounded-md border bg-card">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 p-2 md:w-16 md:p-4">ID</TableHead>
            <TableHead className="w-40 p-2 md:w-auto md:p-4">Title</TableHead>
            <TableHead className="hidden w-28 p-2 sm:table-cell md:w-32 md:p-4">
              Category
            </TableHead>
            <TableHead className="w-20 p-2 text-right md:w-24 md:p-4">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="p-2 text-sm font-medium text-muted-foreground md:p-4">
                #{product.id}
              </TableCell>
              <TableCell className="truncate p-2 text-sm font-medium md:p-4">
                {product.title}
              </TableCell>
              <TableCell className="hidden p-2 sm:table-cell md:p-4">
                <Badge
                  variant="secondary"
                  className="whitespace-nowrap capitalize text-[11px] md:text-xs"
                >
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="p-2 text-right text-sm font-medium md:p-4">
                ${product.price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}