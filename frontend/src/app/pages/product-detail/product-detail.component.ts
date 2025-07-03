import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';
import { Product } from '../../models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product$!: Observable<Product | undefined>;
  constructor(private readonly route: ActivatedRoute, private readonly productService: ProductService, private readonly cart: CartService, private readonly toast: ToastService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = of(this.productService.getById(id));
  }

  addToCart(p?: Product) {
    if (p) {
      this.cart.add(p);
      this.toast.show('Added to cart');
    }
  }
}
