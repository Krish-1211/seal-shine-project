import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShopifyProduct, createStorefrontCheckout, getNumericId } from '@/lib/shopify';
import { MOCK_PRODUCTS } from '@/lib/mockData';

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;

  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: (options?: { isWholesale?: boolean; userEmail?: string }) => Promise<void>;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);

        if (existingItem) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            )
          });
        } else {
          set({ items: [...items, item] });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),

      createCheckout: async (options?: { isWholesale?: boolean; userEmail?: string }) => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          if (options?.isWholesale && options.userEmail) {
            // Wholesale Flow: Map Wholesale IDs -> Retail IDs for inventory deduction
            const wholesaleItems = items.map(item => {
              const currentId = getNumericId(item.variantId);

              // Find the product and the specific variant index
              let retailId = currentId;
              const productMatch = MOCK_PRODUCTS.find(p =>
                p.wholesaleVariantIds?.includes(currentId)
              );

              if (productMatch && productMatch.wholesaleVariantIds && productMatch.variantIds) {
                const idx = productMatch.wholesaleVariantIds.indexOf(currentId);
                if (idx !== -1 && productMatch.variantIds[idx]) {
                  console.log(`Mapping Wholesale ID ${currentId} to Retail ID ${productMatch.variantIds[idx]}`);
                  retailId = productMatch.variantIds[idx];
                }
              }

              return {
                variantId: retailId, // Use Retail Inventory
                quantity: item.quantity,
                customPrice: item.price.amount // Use Wholesale Price
              };
            });

            // Call Backend API
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/create-wholesale-checkout`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                items: wholesaleItems,
                email: options.userEmail
              }),
            });

            if (!response.ok) throw new Error('Wholesale checkout failed');

            const data = await response.json();
            if (data.checkoutUrl) {
              setCheckoutUrl(data.checkoutUrl);
            }
          } else {
            // Retail Flow (Standard)
            const checkoutUrl = await createStorefrontCheckout(items);
            setCheckoutUrl(checkoutUrl);
          }
        } catch (error) {
          console.error('Failed to create checkout:', error);
        } finally {
          setLoading(false);
        }
      }
    }),
    {
      name: 'shopify-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
