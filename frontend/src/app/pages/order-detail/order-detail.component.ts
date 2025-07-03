import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  order$!: Observable<Order | undefined>;
  constructor(private readonly route: ActivatedRoute, private readonly orders: OrderService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.order$ = of(this.orders.getById(id));
  }

  trackByProduct(_: number, item: { product: { id: string } }) {
    return item.product.id;
  }
}
