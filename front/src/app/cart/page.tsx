"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Mon Panier</h1>
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex items-center gap-2"
        >
          ← Retour à la recherche
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="mb-4">Votre panier est vide</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Retourner à la boutique
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          <ul className="divide-y">
            {items.map((item) => (
              <li
                key={item.objectID}
                className="py-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-lg">{item.salePrice}€</p>
                </div>
                <button
                  onClick={() => removeItem(item)}
                  className="text-red-500 hover:text-red-600"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>{total}€</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
