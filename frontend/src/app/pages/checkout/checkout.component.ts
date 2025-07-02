import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  shipping = {} as any;
  payment = {} as any;
  constructor(private cart: CartService, private orders: OrderService, private router: Router, private auth: AuthService, private toast: ToastService) {}
  checkout() {
    const id = this.orders.placeOrder(this.cart.items, this.shipping, this.payment, this.auth.username);
    this.cart.clear();
    this.toast.show('Order placed');
    this.router.navigate(['/order-confirmation', id]);
  }
}
