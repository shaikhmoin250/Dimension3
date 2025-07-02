import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, SortOption } from '../../models';
import { ToastService } from '../../services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$!: Observable<Product[]>;
  query = '';
  category = '';
  sort: SortOption = SortOption.Default;
  readonly SortOption = SortOption;
  readonly categories = this.productService.getCategories();

  constructor(private readonly productService: ProductService, private readonly cart: CartService, private readonly toast: ToastService) {}

  ngOnInit() {
    this.applyFilters();
  }

  onSearch(q: string) {
    this.query = q;
    this.applyFilters();
  }

  applyFilters() {
    this.products$ = this.productService.filterProducts$(this.query, this.category, this.sort);
  }

  addToCart(p: Product) {
    this.cart.add(p);
    this.toast.show('Added to cart');
  }

  trackById(_: number, p: Product) {
    return p.id;
  }
}
