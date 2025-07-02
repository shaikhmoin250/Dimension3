import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products = [
    { id: '1', name: 'Product 1', price: 10, description: 'Description 1' },
    { id: '2', name: 'Product 2', price: 20, description: 'Description 2' }
  ];
  getAll() {
    return this.products;
  }
  getById(id: string | null) {
    return this.products.find(p => p.id === id);
  }
  getFeatured() {
    return this.products.slice(0, 1);
  }
}
