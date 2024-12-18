"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";

export type HitType = {
  name: string;
  salePrice: number;
  image: string;
  objectID: string;
};

export function ProductCard({ hit }: { hit: HitType }) {
  const { items, addItem, removeItem } = useCart();
  const isInCart = items.some((item) => item.objectID === hit.objectID);

  return (
    <div className="border rounded-lg p-4 flex flex-col gap-2 bg-white dark:bg-gray-800">
      <div className="relative w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded-md">
        <Image
          src={hit.image}
          alt={hit.name}
          fill
          className="object-contain p-2 rounded-md"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </div>
      <h3 className="font-semibold truncate mt-2">{hit.name}</h3>
      <p className="text-lg font-bold">
        {hit.salePrice ? `${hit.salePrice}€` : "Prix non disponible"}
      </p>
      <button
        className={`mt-auto w-full py-2 px-4 rounded transition-colors ${
          isInCart
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        onClick={() => (isInCart ? removeItem(hit) : addItem(hit))}
      >
        {isInCart ? "Retirer du panier" : "Ajouter au panier"}
      </button>
    </div>
  );
}
