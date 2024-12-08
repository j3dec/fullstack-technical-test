"use client";

import Image from "next/image";

export type HitType = {
  name: string;
  price: number;
  image: string;
  objectID: string;
};

export function ProductCard({ hit }: { hit: HitType }) {
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
      <p className="text-lg font-bold">{hit.price}€</p>
      <button
        className="mt-auto w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={() => console.log("Ajouter au panier:", hit.objectID)}
      >
        Ajouter au panier
      </button>
    </div>
  );
}
