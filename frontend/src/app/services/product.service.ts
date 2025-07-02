import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = [
    { id: '1', name: 'Phone XL', price: 799, description: 'A large phone', brand: 'Tech', category: 'Phones', rating: 4.5 },
    { id: '2', name: 'Phone Mini', price: 699, description: 'A smaller phone', brand: 'Tech', category: 'Phones', rating: 4.0 },
    { id: '3', name: 'Phone Standard', price: 299, description: 'A cheap phone', brand: 'Generic', category: 'Phones', rating: 3.5 },
    { id: '4', name: 'Laptop Pro', price: 1299, description: 'High performance laptop', brand: 'Compute', category: 'Computers', rating: 4.8 },
    { id: '5', name: 'Laptop Air', price: 999, description: 'Lightweight laptop', brand: 'Compute', category: 'Computers', rating: 4.2 }
  ];

  private readonly productsSubject = new BehaviorSubject<Product[]>(this.products);

  /**
   * Observable stream of all products.
   */
  readonly products$ = this.productsSubject.asObservable();

  /**
   * Retrieve a copy of all products.
   */
  getAll(): Product[] {
    return [...this.productsSubject.value];
  }

  /**
   * List all unique product categories.
   */
  getCategories(): string[] {
    return Array.from(new Set(this.productsSubject.value.map(p => p.category)));
  }

  /**
   * Find a product by id.
   */
  getById(id: string | null): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  /**
   * Filter and sort products locally.
   */
  filterProducts(query = '', category = '', sort = ''): Product[] {
    let res = this.getAll();
    if (query) {
      const q = query.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q));
    }
    if (category) {
      res = res.filter(p => p.category === category);
    }
    if (sort === 'priceAsc') {
      res.sort((a, b) => a.price - b.price);
    } else if (sort === 'priceDesc') {
      res.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      res.sort((a, b) => b.rating - a.rating);
    }
    return res;
  }

  /**
   * Return a small set of featured products.
   */
  getFeatured(): Product[] {
    return this.productsSubject.value.slice(0, 1);
  }
}
