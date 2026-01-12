import { useParams, Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShieldCheck, Minus, Plus } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { useShopifyProduct } from "@/hooks/useShopify";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { useUser } from "@/contexts/UserContext";
import { getProductPrice } from "@/lib/pricing";


const ProductDetail = () => {
  const { handle } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const addItem = useCartStore(state => state.addItem);
  const { user } = useUser();

  const { data: productData, isLoading } = useShopifyProduct(handle || "");

  const currentVariant = productData?.variants.edges[selectedVariantIndex]?.node;

  const mockProduct = MOCK_PRODUCTS.find(p =>
    p.codes.includes(currentVariant?.sku || "") ||
    p.title === productData?.title
  );

  const pricing = mockProduct ? getProductPrice(mockProduct, user?.isWholesale || false, selectedVariantIndex) : null;

  const handleAddToCart = () => {
    if (!productData) return;

    const variant = productData.variants.edges[selectedVariantIndex]?.node;
    if (!variant) return;

    const product = {
      node: productData
    } as ShopifyProduct;

    // Use wholesale price if applicable, otherwise fallback to variant price
    const finalPrice = pricing?.isWholesalePrice ? pricing.price.toString() : variant.price.amount;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: {
        amount: finalPrice,
        currencyCode: variant.price.currencyCode
      },
      quantity,
      selectedOptions: variant.selectedOptions || []
    };

    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${productData.title} x ${quantity}`,
      position: "top-center",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading product...</p>
      </div>
    );
  }

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Product not found</p>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Reload current variant and main image since hooks might return after render
  // const currentVariant variable is now defined above to support pricing

  const mainImage = productData.images.edges[0]?.node;
  const technicalData = mockProduct?.technicalData;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold text-primary">Sure Seal Sealants</h1>
            </div>
          </div>
          <CartDrawer />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="space-y-4">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {productData.images.edges.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted p-2">
                      <img
                        src={image.node.url}
                        alt={image.node.altText || productData.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {productData.images.edges.length > 1 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>

            {/* Technical Data */}
            {technicalData && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Technical Data</h3>
                  <a
                    href={technicalData}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Technical Data Sheet (PDF)
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">In Stock</Badge>
              <h1 className="text-4xl font-bold mb-4">{productData.title}</h1>
              <div className="flex flex-col">
                {pricing ? (
                  <>
                    <p className="text-3xl font-bold text-primary">
                      {pricing.displayPrice}
                    </p>
                    {pricing.isWholesalePrice && (
                      <p className="text-sm text-muted-foreground line-through">
                        ${pricing.originalPrice?.toFixed(2)}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-3xl font-bold text-primary">
                    ${parseFloat(currentVariant?.price.amount || '0').toFixed(2)} {currentVariant?.price.currencyCode}
                  </p>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">GST inclusive</p>
              {currentVariant?.sku && (
                <p className="text-sm font-medium mt-2">Item Code: {currentVariant.sku}</p>
              )}
            </div>

            <Separator />

            {/* Description */}
            {productData.description && (
              <div>
                <h3 className="font-semibold mb-2">Product Overview</h3>
                <p className="text-muted-foreground">{productData.description}</p>
              </div>
            )}

            {/* Variant Selection */}
            {productData.variants.edges.length > 1 && (
              <div>
                <h3 className="font-semibold mb-3">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {productData.variants.edges.map((variant, idx) => (
                    <Button
                      key={variant.node.id}
                      variant={selectedVariantIndex === idx ? "default" : "outline"}
                      onClick={() => setSelectedVariantIndex(idx)}
                    >
                      {variant.node.title}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Separator />

            {/* Features */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <h3 className="font-semibold">Product Features</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Australian made with premium quality ingredients</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Long-term durability and protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Advanced stain and moisture resistance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
