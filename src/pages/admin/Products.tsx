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
import { toast } from "sonner";
import axios from "axios";

const Products = () => {
    const API_URL = import.meta.env.VITE_API_URL || '';

    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["admin-products"],
        queryFn: async () => {
            try {
                // Fetch from our backend proxy which uses Shopify Admin API
                const response = await axios.get(`${API_URL}/api/admin/products`);
                return response.data.products || [];
            } catch (error) {
                console.error("Failed to fetch products:", error);
                // If unauthorized, user might need to connect Shopify
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    toast.error("Not connected to Shopify", {
                        description: "Please go to the dashboard to connect."
                    });
                }
                throw error;
            }
        },
        retry: false
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
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-red-500">
                                    Failed to load products. Ensure backend is connected to Shopify.
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    No products found
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product: any) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.status}</TableCell>
                                    <TableCell>
                                        {/* Admin API returns variants array. We'll show the price of the first variant. */}
                                        {product.variants && product.variants.length > 0
                                            ? `$${product.variants[0].price}`
                                            : "N/A"}
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
