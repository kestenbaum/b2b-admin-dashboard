import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/lib/api/products";

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">Manage your store inventory.</p>
            </div>

            <div className="w-full min-w-0 rounded-md border bg-card">
                <Table className="w-full table-fixed">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40px] md:w-[60px] p-2 md:p-4">ID</TableHead>
                            <TableHead className="w-[160px] md:w-auto p-2 md:p-4">Title</TableHead>
                            <TableHead className="hidden sm:table-cell w-[100px] md:w-[120px] p-2 md:p-4">Category</TableHead>
                            <TableHead className="w-[70px] md:w-[90px] text-right p-2 md:p-4">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-muted-foreground p-2 md:p-4 text-sm">
                                    #{product.id}
                                </TableCell>
                                <TableCell className="font-medium p-2 md:p-4 text-sm truncate">
                                    {product.title}
                                </TableCell>
                                <TableCell className="hidden sm:table-cell p-2 md:p-4">
                                    <Badge variant="secondary" className="capitalize text-[11px] md:text-xs whitespace-nowrap">
                                        {product.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium p-2 md:p-4 text-sm">
                                    ${product.price.toFixed(2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
