import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export const AdminSidebar = () => {
    const location = useLocation();

    return (
        <aside className="hidden w-64 flex-col border-r bg-background md:flex">
            <div className="flex h-14 items-center border-b px-6">
                <Link to="/" className="flex items-center gap-2 font-semibold">
                    <span className="text-xl font-bold text-primary">Seal Shine</span>
                </Link>
            </div>
            <div className="flex flex-1 flex-col gap-2 p-4">
                {sidebarItems.map((item) => (
                    <Link
                        key={item.href}
                        to={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:text-primary",
                            location.pathname === item.href
                                ? "bg-muted text-primary"
                                : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </div>
            <div className="border-t p-4">
                <button
                    onClick={() => {
                        localStorage.removeItem("isAdminAuthenticated");
                        window.location.href = "/admin/login";
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-destructive"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </aside>
    );
};
