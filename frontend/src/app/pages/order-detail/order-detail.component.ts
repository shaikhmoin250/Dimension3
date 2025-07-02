import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  order: Order | undefined;
  constructor(route: ActivatedRoute, private orders: OrderService) {
    const id = route.snapshot.paramMap.get('id');
    this.order = this.orders.getById(id);
  }
}
