import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders = [] as any[];
  constructor(private orderService: OrderService, private auth: AuthService) {
    this.load();
  }

  load() {
    this.orders = this.orderService.getOrdersForUser(this.auth.username);
  }
}
