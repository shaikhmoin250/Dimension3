import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any;
  constructor(route: ActivatedRoute, private productService: ProductService, private cart: CartService) {
    const id = route.snapshot.paramMap.get('id');
    this.product = this.productService.getById(id);
  }
  addToCart() {
    this.cart.add(this.product);
  }
}
