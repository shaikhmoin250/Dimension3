import { Component } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];
  query = '';
  category = '';
  sort = '';
  categories = this.productService.getCategories();

  constructor(private productService: ProductService, private cart: CartService, private toast: ToastService) {
    this.applyFilters();
  }

  onSearch(q: string) {
    this.query = q;
    this.applyFilters();
  }

  applyFilters() {
    this.products = this.productService.filterProducts(this.query, this.category, this.sort);
  }

  addToCart(p: any) {
    this.cart.add(p);
    this.toast.show('Added to cart');
  }
}
