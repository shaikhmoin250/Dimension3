import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly featured$ = this.productService.getFeatured$();
  constructor(private readonly productService: ProductService) {}

  trackById(_: number, item: { id: string }) {
    return item.id;
  }
}
