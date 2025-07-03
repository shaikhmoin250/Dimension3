import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';
import { CartItem } from '../../models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  readonly items$ = this.cart.items$;
  readonly total$ = this.cart.total$;
  constructor(public readonly cart: CartService, private readonly toast: ToastService) {}

  update(id: string, qty: number) {
    this.cart.updateQty(id, qty);
  }

  remove(index: number) {
    this.cart.remove(index);
    this.toast.show('Item removed');
  }

  trackById(_: number, item: CartItem) {
    return item.product.id;
  }
}
