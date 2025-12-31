import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const CustomerLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useUser();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Mock authentication
        if (password.length > 0) {
            login(email);

            if (email.includes("wholesale")) {
                toast.success("Welcome back, Wholesale Partner!", {
                    description: "You now have access to wholesale pricing."
                });
            } else {
                toast.success("Welcome back!", {
                    description: "You are successfully logged in."
                });
            }

            navigate("/");
        } else {
            toast.error("Please enter a password");
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center bg-muted/40 py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8 rounded-lg border bg-background p-8 shadow-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold tracking-tight">Customer Login</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            Use 'wholesale@example.com' to test wholesale pricing.
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CustomerLogin;
