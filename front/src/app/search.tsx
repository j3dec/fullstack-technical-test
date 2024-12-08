"use client";

import { liteClient as algoliasearch } from "algoliasearch/lite";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { SearchBox, Hits } from "react-instantsearch";
import Image from "next/image";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

// Type pour les produits Algolia
type HitType = {
  name: string;
  price: number;
  image: string;
  objectID: string;
};

// Composant pour afficher un produit
const ProductCard = ({ hit }: { hit: HitType }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      <div className="relative w-full aspect-square">
        <Image
          src={hit.image}
          alt={hit.name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <h3 className="font-semibold truncate mt-2">{hit.name}</h3>
      <p className="text-lg font-bold">{hit.price}€</p>
      <button
        className="mt-auto w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={() => console.log("Ajouter au panier:", hit.objectID)}
      >
        Ajouter au panier
      </button>
    </div>
  );
};

export function Search() {
  return (
    <InstantSearchNext indexName="bestbuy" searchClient={searchClient}>
      <div className="w-full max-w-6xl mx-auto px-4">
        <SearchBox
          placeholder="Rechercher un produit..."
          className="mb-8"
          classNames={{
            input: "w-full p-4 border rounded-lg",
            submit: "hidden",
            reset: "hidden",
          }}
        />
        <Hits
          hitComponent={ProductCard}
          classNames={{
            list: "grid grid-cols-2 md:grid-cols-4 gap-4",
          }}
        />
      </div>
    </InstantSearchNext>
  );
}
