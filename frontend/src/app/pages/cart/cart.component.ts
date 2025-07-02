import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(public cart: CartService, private toast: ToastService) {}

  update(id: string, qty: number) {
    this.cart.updateQty(id, qty);
  }

  remove(index: number) {
    this.cart.remove(index);
    this.toast.show('Item removed');
  }
}
