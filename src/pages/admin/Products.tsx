import { useQuery } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { storefrontApiRequest, STOREFRONT_QUERY } from "@/lib/shopify";
import { toast } from "sonner";

const Products = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ["admin-products"],
        queryFn: async () => {
            try {
                const response = await storefrontApiRequest(STOREFRONT_QUERY, { first: 20 });
                return response?.data?.products?.edges || [];
            } catch (error) {
                console.error("Failed to fetch products:", error);
                return [];
            }
        },
    });

    const handleAddProduct = () => {
        toast.info("This is a demo action. In a real app, this would open a product creation form.");
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button onClick={handleAddProduct}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map(({ node }: any) => (
                                <TableRow key={node.id}>
                                    <TableCell className="font-medium">{node.title}</TableCell>
                                    <TableCell>Active</TableCell>
                                    <TableCell>
                                        {node.priceRange.minVariantPrice.currencyCode}{" "}
                                        {node.priceRange.minVariantPrice.amount}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Products;
