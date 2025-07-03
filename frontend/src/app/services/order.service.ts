import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order, CartItem, ShippingInfo, PaymentInfo } from '../models';
import { APP_CONFIG, AppConfig } from '../config/app-config';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly ordersSubject = new BehaviorSubject<Order[]>([]);
  /**
   * Observable stream of all orders.
   */
  readonly orders$ = this.ordersSubject.asObservable();

  constructor(@Inject(APP_CONFIG) private config: AppConfig) {
    try {
      const stored = localStorage.getItem('orders');
      if (stored) {
        this.ordersSubject.next(JSON.parse(stored));
      }
    } catch {
      this.ordersSubject.next([]);
    }
  }

  private save() {
    try {
      localStorage.setItem('orders', JSON.stringify(this.ordersSubject.value));
    } catch {
      // ignore storage write errors
    }
  }

  /**
   * Create a new order for the given user.
   */
  placeOrder(items: CartItem[], shipping: ShippingInfo, payment: PaymentInfo, username: string): string {
    const current = this.ordersSubject.value;
    const id = (current.length + 1).toString();
    const order: Order = {
      id,
      items,
      shipping,
      payment,
      status: 'Processing',
      username,
      date: new Date().toISOString(),
    };
    current.push(order);
    this.ordersSubject.next(current);
    this.save();
    return id;
  }

  getOrdersForUser(username: string): Order[] {
    return this.ordersSubject.value.filter(o => o.username === username);
  }

  getById(id: string | null): Order | undefined {
    return this.ordersSubject.value.find(o => o.id === id);
  }
}
