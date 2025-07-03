import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent {
  orderId: string | null;
  constructor(route: ActivatedRoute) {
    this.orderId = route.snapshot.paramMap.get('id');
  }
}
