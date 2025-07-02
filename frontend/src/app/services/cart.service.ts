import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem, Product } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>([]);
  /**
   * Observable stream of cart items.
   */
  readonly items$ = this.itemsSubject.asObservable();

  /**
   * Snapshot of current items.
   */
  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  constructor() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.itemsSubject.next(JSON.parse(stored));
    }
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.itemsSubject.value));
  }

  /**
   * Add a product to the cart.
   */
  add(product: Product) {
    const items = this.itemsSubject.value;
    const existing = items.find(i => i.product.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ product, qty: 1 });
    }
    this.itemsSubject.next(items);
    this.save();
  }

  /**
   * Update quantity for a cart item. Removes item if quantity is 0.
   */
  updateQty(id: string, qty: number) {
    const items = this.itemsSubject.value;
    const item = items.find(i => i.product.id === id);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) {
        const filtered = items.filter(i => i.product.id !== id);
        this.itemsSubject.next(filtered);
        this.save();
        return;
      }
      this.itemsSubject.next(items);
      this.save();
    }
  }

  /**
   * Remove an item from the cart by index.
   */
  remove(index: number) {
    const items = this.itemsSubject.value;
    items.splice(index, 1);
    this.itemsSubject.next(items);
    this.save();
  }

  /**
   * Clear the entire cart.
   */
  clear() {
    this.itemsSubject.next([]);
    this.save();
  }

  /**
   * Calculate the total cost of items in the cart.
   */
  total() {
    return this.itemsSubject.value.reduce((t, i) => t + i.product.price * i.qty, 0);
  }
}
