import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, Loader2 } from "lucide-react";
import { SITE_CONTENT } from "@/lib/mockData";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShopifyProduct } from "@/lib/shopify";
import { useShopifyProducts } from "@/hooks/useShopify";



const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const searchQuery = searchParams.get("search") || "";
  const addItem = useCartStore(state => state.addItem);

  const { data: products, isLoading, error } = useShopifyProducts();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter(product => {
      const node = product.node || product;
      const title = (node.title || "").toLowerCase();
      const description = (node.description || "").toLowerCase();
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch = title.includes(searchLower) || description.includes(searchLower);

      // Match Shopify 'productType' to the category filter
      const matchesCategory = categoryFilter ? node.productType === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  const handleAddToCart = (product: ShopifyProduct["node"]) => {
    // Map the Shopify product node to the structure expected by the cart
    // The hook returns the 'node' directly, so we wrap it back if needed or adjust the cart store.
    // Looking at cartStore, it expects { product: ShopifyProduct, ... }
    // But ShopifyProduct interface in shopify.ts is { node: { ... } }
    // Let's construct the object the cart expects.

    const cartItemProduct: ShopifyProduct = { node: product };

    const cartItem = {
      product: cartItemProduct,
      variantId: product.variants?.edges?.[0]?.node?.id || "", // MUST be a real variant ID
      variantTitle: product.variants?.edges?.[0]?.node?.title || "Default",
      price: {
        amount: product.priceRange?.minVariantPrice?.amount || (typeof (product as any).price === 'number' ? (product as any).price.toFixed(2) : "0.00"),
        currencyCode: product.priceRange?.minVariantPrice?.currencyCode || "AUD"
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

      {/* Hero Carousel */}
      <HeroCarousel />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Shop Our Products</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">

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
          {isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="text-red-500">Failed to load products. Please try again later.</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const node = product.node || product;
                const title = node.title || "";
                const handle = node.handle || node.id;
                const description = node.description || "";

                // Image handling
                let mainImage = "/placeholder.svg";
                if (node.images?.edges?.[0]?.node?.url) {
                  mainImage = node.images.edges[0].node.url;
                } else if (Array.isArray(node.images) && node.images.length > 0) {
                  mainImage = node.images[0];
                } else if (node.image) {
                  mainImage = node.image;
                }

                // Price handling
                let priceStr = "0.00";
                if (node.priceRange?.minVariantPrice?.amount) {
                  priceStr = node.priceRange.minVariantPrice.amount;
                } else if (typeof node.price === 'number') {
                  priceStr = node.price.toFixed(2);
                }

                return (
                  <Card key={node.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col">
                    <div className="aspect-square bg-muted relative overflow-hidden">
                      <img
                        src={mainImage}
                        alt={title}
                        className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4 flex flex-col flex-1">
                      <Link to={`/product/${handle}`} className="block mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-secondary transition-colors line-clamp-1">
                          {title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {description}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <span className="text-lg font-bold text-primary">
                          ${parseFloat(priceStr).toFixed(2)}
                        </span>
                        <Button size="sm" onClick={() => handleAddToCart(node)}>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
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

export default Index;
