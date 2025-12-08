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

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category");
    const [searchQuery, setSearchQuery] = useState("");
    const addItem = useCartStore(state => state.addItem);

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    const handleAddToCart = (product: typeof MOCK_PRODUCTS[0]) => {
        // Convert mock product to ShopifyProduct structure for the store
        const shopifyProduct: ShopifyProduct = {
            node: {
                id: product.id,
                title: product.title,
                description: product.description,
                handle: product.title.toLowerCase().replace(/\s+/g, '-'),
                priceRange: {
                    minVariantPrice: {
                        amount: product.price.toString(),
                        currencyCode: "AUD"
                    }
                },
                images: {
                    edges: [{
                        node: {
                            url: product.image,
                            altText: product.title
                        }
                    }]
                },
                variants: {
                    edges: [{
                        node: {
                            id: product.id,
                            title: "Default Title",
                            price: {
                                amount: product.price.toString(),
                                currencyCode: "AUD"
                            },
                            availableForSale: true,
                            selectedOptions: []
                        }
                    }]
                },
                options: []
            }
        };

        const cartItem = {
            product: shopifyProduct,
            variantId: product.id,
            variantTitle: "Default Title",
            price: {
                amount: product.price.toString(),
                currencyCode: "AUD"
            },
            quantity: 1,
            selectedOptions: []
        };

        addItem(cartItem);
        toast.success("Added to cart", {
            description: product.title,
            position: "top-center",
        });
    };

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
                            {filteredProducts.map((product) => (
                                <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                                    <div className="aspect-square bg-muted relative overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                                            {product.category}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4 flex flex-col flex-1">
                                        <Link to={`/product/${product.id}`} className="block mb-2">
                                            <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors line-clamp-1">
                                                {product.title}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                                            {product.description}
                                        </p>
                                        {product.sizes && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {product.sizes.map(size => (
                                                    <Badge key={size} variant="secondary" className="text-xs">
                                                        {size}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                                            <span className="text-lg font-bold text-primary">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            <Button size="sm" onClick={() => handleAddToCart(product)}>
                                                <ShoppingCart className="w-4 h-4 mr-2" />
                                                Add
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
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
