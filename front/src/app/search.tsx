"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox, Hits } from "react-instantsearch";
import { ProductCard } from "./components/ProductCard";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export function Search() {
  return (
    <InstantSearchNext indexName="bestbuy" searchClient={searchClient}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <SearchBox
          placeholder="Rechercher un produit..."
          className="mb-8"
          classNames={{
            root: "relative",
            input:
              "w-full p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700",
            submit: "hidden",
            reset: "hidden",
          }}
        />
        <Hits
          hitComponent={ProductCard}
          classNames={{
            list: "grid grid-cols-2 md:grid-cols-4 gap-6",
            item: "h-full",
          }}
        />
      </div>
    </InstantSearchNext>
  );
}
