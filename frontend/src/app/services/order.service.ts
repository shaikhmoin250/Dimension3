import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: any[] = [];

  constructor() {
    const stored = localStorage.getItem('orders');
    if (stored) {
      this.orders = JSON.parse(stored);
    }
  }

  private save() {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }

  placeOrder(items: any[], shipping: any, payment: any, username: string) {
    const id = (this.orders.length + 1).toString();
    const order = {
      id,
      items,
      shipping,
      payment,
      status: 'Processing',
      username,
      date: new Date().toISOString()
    };
    this.orders.push(order);
    this.save();
    return id;
  }

  getOrdersForUser(username: string) {
    return this.orders.filter(o => o.username === username);
  }

  getById(id: string | null) {
    return this.orders.find(o => o.id === id);
  }
}
