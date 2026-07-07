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

interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">Manage your store inventory.</p>
            </div>

            <div className="rounded-md border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium text-muted-foreground">
                                    #{product.id}
                                </TableCell>
                                <TableCell className="font-medium">{product.title}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="capitalize">
                                        {product.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-medium">
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