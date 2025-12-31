import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { toast } from "sonner";
import { format } from "date-fns";

const Orders = () => {
    const API_URL = import.meta.env.VITE_API_URL || '';

    const { data: orders, isLoading, isError } = useQuery({
        queryKey: ["admin-orders"],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/orders`);
                return response.data.orders || [];
            } catch (error) {
                console.error("Failed to fetch orders:", error);
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            </div>
            <div className="flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search orders..."
                        className="pl-8"
                    />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Payment Status</TableHead>
                            <TableHead>Fulfillment</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    Loading orders...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-red-500">
                                    Failed to load orders. Ensure backend is connected to Shopify.
                                </TableCell>
                            </TableRow>
                        ) : orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">
                                    No orders found
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order: any) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">#{order.order_number}</TableCell>
                                    <TableCell>
                                        {order.customer
                                            ? `${order.customer.first_name} ${order.customer.last_name}`
                                            : "Guest"}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={order.financial_status === 'paid' ? 'default' : 'secondary'}>
                                            {order.financial_status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {order.fulfillment_status || 'unfulfilled'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{format(new Date(order.created_at), 'MMM dd, yyyy')}</TableCell>
                                    <TableCell className="text-right">
                                        {order.currency} {order.total_price}
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

export default Orders;
