"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { HitType } from "../components/ProductCard";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

type CartContextType = {
  cartId: string | null;
  items: HitType[];
  addItem: (item: HitType) => Promise<void>;
  removeItem: (item: HitType) => Promise<void>;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the type for cart items in the backend
type Item = {
  id: string;
};

// Define the type for the backend response
type CartResponse = {
  id: string;
  items: Item[];
};

// Define the type for the Algolia search response
type AlgoliaSearchResponse = {
  results: Array<{
    hits: HitType[];
  }>;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<HitType[]>([]);

  useEffect(() => {
    // Initialize the cart on load
    const initCart = async () => {
      const storedCartId = localStorage.getItem("cartId");
      if (storedCartId) {
        try {
          const response = await fetch(
            `http://localhost:4000/cart/${storedCartId}`
          );
          if (response.ok) {
            const cart: CartResponse = await response.json();
            setCartId(cart.id);

            // Fetch product details from Algolia
            const itemDetails = await Promise.all(
              cart.items.map(async (item: Item) => {
                const { results } = (await searchClient.search([
                  {
                    indexName: "bestbuy",
                    params: {
                      filters: `objectID:${item.id}`,
                      hitsPerPage: 1,
                      attributesToRetrieve: [
                        "name",
                        "salePrice",
                        "image",
                        "objectID",
                      ],
                    },
                  },
                ])) as AlgoliaSearchResponse;

                if (results[0]?.hits?.[0]) {
                  return results[0].hits[0];
                }
                throw new Error(`Product ${item.id} not found`);
              })
            );

            setItems(itemDetails);
          } else {
            // If the cart is not found, create a new one
            localStorage.removeItem("cartId");
            const newCartResponse = await fetch("http://localhost:4000/cart", {
              method: "POST",
            });
            const newCart = await newCartResponse.json();
            setCartId(newCart.id);
            localStorage.setItem("cartId", newCart.id);
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          // If there's an error, remove the cart ID from localStorage
          localStorage.removeItem("cartId");
        }
      } else {
        try {
          const response = await fetch("http://localhost:4000/cart", {
            method: "POST",
          });
          const cart = await response.json();
          setCartId(cart.id);
          localStorage.setItem("cartId", cart.id);
        } catch (error) {
          console.error("Error creating cart:", error);
        }
      }
    };

    initCart();
  }, []);

  const addItem = async (item: HitType) => {
    if (!cartId) return;

    try {
      const response = await fetch(`http://localhost:4000/cart/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [...items, { id: item.objectID }],
        }),
      });

      if (response.ok) {
        setItems([...items, item]);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeItem = async (item: HitType) => {
    if (!cartId) return;

    try {
      const response = await fetch(`http://localhost:4000/cart/${cartId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items
            .filter((i) => i.objectID !== item.objectID)
            .map((i) => ({ id: i.objectID })),
        }),
      });

      console.log(response);
      if (response.ok) {
        setItems(items.filter((i) => i.objectID !== item.objectID));
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const total = items.reduce((sum, item) => sum + item.salePrice, 0);

  return (
    <CartContext.Provider value={{ cartId, items, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
