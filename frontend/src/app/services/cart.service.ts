import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  items: any[] = [];

  constructor() {
    const stored = localStorage.getItem('cart');
    if (stored) {
      this.items = JSON.parse(stored);
    }
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  add(p: any) {
    const existing = this.items.find(i => i.id === p.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...p, qty: 1 });
    }
    this.save();
  }

  updateQty(id: string, qty: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) {
        this.items = this.items.filter(i => i.id !== id);
      }
      this.save();
    }
  }

  remove(index: number) {
    this.items.splice(index, 1);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  total() {
    return this.items.reduce((t, i) => t + i.price * i.qty, 0);
  }
}
