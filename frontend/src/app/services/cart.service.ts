import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  items: any[] = [];
  add(p: any) {
    const existing = this.items.find(i => i.id === p.id);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ ...p, qty: 1 });
    }
  }
  remove(index: number) {
    this.items.splice(index, 1);
  }
  clear() {
    this.items = [];
  }
  total() {
    return this.items.reduce((t, i) => t + i.price * i.qty, 0);
  }
}
