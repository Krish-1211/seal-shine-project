import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingBag, Users, AlertCircle } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "@/components/ui/button";

const dummyChartData = [
    { name: "Jan", total: 1200 },
    { name: "Feb", total: 2100 },
    { name: "Mar", total: 1800 },
    { name: "Apr", total: 2400 },
    { name: "May", total: 3200 },
    { name: "Jun", total: 4500 },
];

const Dashboard = () => {
    const API_URL = import.meta.env.VITE_API_URL || '';

    const { data: stats, isLoading, isError } = useQuery({
        queryKey: ["admin-dashboard-stats"],
        queryFn: async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/dashboard-stats`);
                return response.data;
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    throw new Error("Unauthorized");
                }
                throw error;
            }
        },
        retry: false
    });

    if (isLoading) {
        return <div className="p-8 text-center">Loading dashboard stats...</div>;
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
                <AlertCircle className="w-12 h-12 text-red-500" />
                <h3 className="text-lg font-semibold text-red-600">Connection Error</h3>
                <p className="max-w-md text-gray-500">
                    Could not fetch dashboard data. You may need to reconnect your Shopify store.
                </p>
                <Button
                    variant="default"
                    onClick={() => {
                        const backendUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '';
                        window.location.href = `${backendUrl}/auth/shopify?shop=suresealsealants-2.myshopify.com`;
                    }}
                >
                    Connect Shopify
                </Button>
            </div>
        );
    }

    const { totalRevenue, productCount, recentSales, store } = stats || {};

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue (Recent)</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${totalRevenue?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </div>
                        <p className="text-xs text-muted-foreground">Based on last 50 orders</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Store Status</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Connected</div>
                        <p className="text-xs text-muted-foreground">
                            {store || "N/A"}
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{productCount || 0}</div>
                        <p className="text-xs text-muted-foreground">Active in Shopify</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Real-time analytics not enabled</p>
                    </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={dummyChartData}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="currentColor"
                                    radius={[4, 4, 0, 0]}
                                    className="fill-primary"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {recentSales?.length > 0 ? (
                                recentSales.map((sale: any, i: number) => (
                                    <div key={i} className="flex items-center">
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">{sale.name}</p>
                                            <p className="text-sm text-muted-foreground">{sale.email}</p>
                                        </div>
                                        <div className="ml-auto font-medium">{sale.amount}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-muted-foreground text-center py-4">No recent sales found.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div >
    );
};

export default Dashboard;
