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
    <div className="w-full overflow-x-auto rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] p-2 sm:p-4">ID</TableHead>
            <TableHead className="min-w-[150px] p-2 sm:p-4">Title</TableHead>
            <TableHead className="hidden p-2 sm:table-cell sm:p-4">
              Category
            </TableHead>
            <TableHead className="p-2 text-right sm:p-4">
              Price
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="p-2 text-sm font-medium text-muted-foreground sm:p-4">
                #{product.id}
              </TableCell>
              <TableCell className="truncate p-2 text-sm font-medium sm:p-4">
                {product.title}
              </TableCell>
              <TableCell className="hidden p-2 sm:table-cell sm:p-4">
                <Badge
                  variant="secondary"
                  className="whitespace-nowrap capitalize"
                >
                  {product.category}
                </Badge>
              </TableCell>
              <TableCell className="p-2 text-right text-sm font-medium sm:p-4">
                ${product.price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}