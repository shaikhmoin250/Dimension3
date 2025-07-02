import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = this.productService.getAll();
  constructor(private productService: ProductService, private cart: CartService) {}
  addToCart(p: any) {
    this.cart.add(p);
  }
}
