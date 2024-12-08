"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox, Hits } from "react-instantsearch";
import { ProductCard } from "./components/ProductCard";
import { SearchPagination } from "./components/SearchPagination";
import Link from "next/link";
import { useCart } from "./context/CartContext";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export function Search() {
  const { items } = useCart();

  return (
    <InstantSearchNext indexName="bestbuy" searchClient={searchClient}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <SearchBox
            placeholder="Rechercher un produit..."
            classNames={{
              root: "relative flex-1 mr-4",
              input:
                "w-full p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700",
              submit: "hidden",
              reset: "hidden",
            }}
          />
          <Link
            href="/cart"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Panier ({items.length})
          </Link>
        </div>
        <Hits
          hitComponent={ProductCard}
          classNames={{
            list: "grid grid-cols-2 md:grid-cols-4 gap-6",
            item: "h-full",
          }}
        />
        <SearchPagination />
      </div>
    </InstantSearchNext>
  );
}
