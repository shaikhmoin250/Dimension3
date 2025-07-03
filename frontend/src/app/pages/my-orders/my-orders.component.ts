import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$!: Observable<Order[]>;
  constructor(private readonly orderService: OrderService, private readonly auth: AuthService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.auth.loggedIn) {
      this.orders$ = of(this.orderService.getOrdersForUser(this.auth.username));
    } else {
      this.orders$ = of([]);
    }
  }

  trackById(_: number, order: Order) {
    return order.id;
  }
}
