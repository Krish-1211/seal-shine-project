import { useState, useMemo, useEffect, useRef } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { Input } from "@/components/ui/input";
import { useShopifyProducts } from "@/hooks/useShopify";

import logo from "@/assets/logo.png";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
    const { data: products } = useShopifyProducts();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const suggestions = useMemo(() => {
        if (!searchQuery.trim() || !products) return [];
        return products
            .filter(product =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5);
    }, [searchQuery, products]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSuggestionClick = (handle: string) => {
        navigate(`/product/${handle}`);
        setShowSuggestions(false);
        setSearchQuery(""); // Optional: clear search after selection
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            setSearchParams(prev => {
                prev.set("search", searchQuery);
                return prev;
            });
            navigate(`/?search=${encodeURIComponent(searchQuery)}`);
        } else {
            searchParams.delete("search");
            setSearchParams(searchParams);
            navigate("/");
        }
    };

    return (
        <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Sure Seal Sealants" className="h-20 w-auto" />
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-10">
                        <Link to="/" className="text-base font-medium hover:text-secondary transition-colors">HOME</Link>
                        <Link to="/about" className="text-base font-medium hover:text-secondary transition-colors">ABOUT US</Link>
                        <Link to="/products" className="text-base font-medium hover:text-secondary transition-colors">PRODUCTS</Link>

                        <Link to="/contact" className="text-base font-medium hover:text-secondary transition-colors">CONTACT US</Link>
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <div ref={searchRef} className="relative hidden md:block w-72">
                            <form onSubmit={handleSearch} className="flex items-center relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-10 pr-12 bg-muted/50 border-muted-foreground/20"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                                    <span className="text-xs">/</span>
                                </kbd>
                            </form>

                            {/* Search Suggestions Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg overflow-hidden z-50">
                                    <ul className="py-1">
                                        {suggestions.map((product) => (
                                            <li key={product.id}>
                                                <button
                                                    onClick={() => handleSuggestionClick(product.handle)}
                                                    className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-3"
                                                >
                                                    <div className="h-8 w-8 rounded bg-muted overflow-hidden flex-shrink-0">
                                                        <img
                                                            src={product.images.edges[0]?.node.url}
                                                            alt={product.title}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                    <span className="truncate">{product.title}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <CartDrawer />

                        {/* Mobile Menu Toggle */}
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pt-4 pb-4 animate-in slide-in-from-top-5">
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>HOME</Link>
                            <Link to="/about" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
                            <Link to="/products" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>PRODUCTS</Link>

                            <Link to="/contact" className="text-lg font-medium" onClick={() => setIsMenuOpen(false)}>CONTACT US</Link>
                            <div className="relative mt-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-9" />
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
