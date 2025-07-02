import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: any[] = [];
  placeOrder(items: any[], shipping: any, payment: any) {
    const id = (this.orders.length + 1).toString();
    this.orders.push({ id, items, shipping, payment, status: 'Processing' });
    return id;
  }
  getOrders() {
    return this.orders;
  }
  getById(id: string | null) {
    return this.orders.find(o => o.id === id);
  }
}
