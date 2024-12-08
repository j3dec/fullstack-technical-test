import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export type Cart = {
  id: string;
  items: Item[];
};

export type Item = {
  id: string;
};

@Injectable()
export class CartService {
  private carts: Cart[] = [];

  create(): Cart {
    const cart: Cart = {
      id: uuidv4(),
      items: [],
    };
    this.carts.push(cart);
    return cart;
  }

  getCart(id: string): Cart {
    const cart = this.carts.find((cart) => cart.id === id);
    if (!cart) {
      throw new NotFoundException(`Cart with id ${id} not found`);
    }
    return cart;
  }

  putItems(id: string, items: Item[]): Cart {
    const cart = this.getCart(id);
    cart.items = items.map((item) => ({
      id: item.id,
    }));
    return cart;
  }
}
