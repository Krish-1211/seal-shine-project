import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ShoppingCart } from "lucide-react";
import { MOCK_PRODUCTS, SITE_CONTENT } from "@/lib/mockData";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShopifyProduct } from "@/lib/shopify";
import { useUser } from "@/contexts/UserContext";
import { getProductPrice } from "@/lib/pricing";
import { useShopifyProducts } from "@/hooks/useShopify";

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category");
    const [searchQuery, setSearchQuery] = useState("");
    const addItem = useCartStore(state => state.addItem);
    const { user } = useUser();

    // Fetch real products from Shopify
    const { data: products, isLoading } = useShopifyProducts();

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        return products.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            // Map Shopify "productType" to our "category" filter
            // Ideally, ensure Shopify product types match "Cleaners", "Sealers", "Aerosols"
            const matchesCategory = categoryFilter ? product.productType === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchQuery, categoryFilter]);

    const handleAddToCart = (product: ShopifyProduct['node'], price: string) => {
        const defaultVariant = product.variants.edges[0]?.node;
        if (!defaultVariant) {
            toast.error("No variant available");
            return;
        }

        const cartItem = {
            product: { node: product },
            variantId: defaultVariant.id, // REAL Globally Unique ID
            variantTitle: defaultVariant.title,
            price: {
                amount: price,
                currencyCode: defaultVariant.price.currencyCode
            },
            quantity: 1,
            selectedOptions: defaultVariant.selectedOptions || []
        };

        addItem(cartItem);
        toast.success("Added to cart", {
            description: product.title,
            position: "top-center",
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 py-12 flex items-center justify-center">
                    <p className="text-muted-foreground">Loading products from Shopify...</p>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Our Products</h1>
                            <p className="text-muted-foreground">
                                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    className="pl-9"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            {categoryFilter && (
                                <Button
                                    variant="outline"
                                    onClick={() => setSearchParams({})}
                                    className="shrink-0"
                                >
                                    Clear Filter
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="flex overflow-x-auto pb-4 gap-2 mb-8 no-scrollbar">
                        <Button
                            variant={!categoryFilter ? "default" : "outline"}
                            onClick={() => setSearchParams({})}
                            className="whitespace-nowrap"
                        >
                            All Products
                        </Button>
                        {SITE_CONTENT.categories.map((category) => (
                            <Button
                                key={category.name}
                                variant={categoryFilter === category.name ? "default" : "outline"}
                                onClick={() => setSearchParams({ category: category.name })}
                                className="whitespace-nowrap"
                            >
                                {category.name}
                            </Button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => {
                                // Attempt to match with mock data for wholesale pricing
                                const mockProduct = MOCK_PRODUCTS.find(mp => mp.title === product.title || mp.id === product.handle);

                                let pricing;
                                if (mockProduct) {
                                    pricing = getProductPrice(mockProduct, user?.isWholesale || false);
                                } else {
                                    // Fallback if no mock data found (use real Shopify price)
                                    const price = parseFloat(product.priceRange.minVariantPrice.amount);
                                    pricing = {
                                        price: price,
                                        isWholesalePrice: false,
                                        displayPrice: `$${price.toFixed(2)}`
                                    };
                                }

                                const mainImage = product.images.edges[0]?.node.url;

                                return (
                                    <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                                        <div className="aspect-square bg-muted relative overflow-hidden">
                                            {mainImage ? (
                                                <img
                                                    src={mainImage}
                                                    alt={product.title}
                                                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                            {product.productType && (
                                                <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                                                    {product.productType}
                                                </Badge>
                                            )}
                                        </div>
                                        <CardContent className="p-4 flex flex-col flex-1">
                                            <Link to={`/product/${product.handle}`} className="block mb-2">
                                                <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors line-clamp-1">
                                                    {product.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                                                {product.description}
                                            </p>

                                            {/* Display options if any (e.g. sizes) - Simplified for grid */}
                                            {product.variants.edges.length > 1 && (
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    <Badge variant="secondary" className="text-xs">
                                                        {product.variants.edges.length} sizes
                                                    </Badge>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-primary">
                                                        {pricing.displayPrice}
                                                    </span>
                                                    {pricing.isWholesalePrice && (
                                                        <span className="text-xs text-muted-foreground line-through">
                                                            ${pricing.originalPrice?.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <Button size="sm" onClick={() => handleAddToCart(product, pricing.price.toString())}>
                                                    <ShoppingCart className="w-4 h-4 mr-2" />
                                                    Add
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-muted/30 rounded-lg">
                            <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="text-lg font-semibold mb-2">No products found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter to find what you're looking for.
                            </p>
                            <Button
                                variant="link"
                                onClick={() => {
                                    setSearchQuery("");
                                    setSearchParams({});
                                }}
                                className="mt-2"
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Products;
