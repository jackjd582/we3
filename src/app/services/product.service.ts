import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;

  image?: string;

  images?: string[];

}

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private cache: Product[] | null = null;

  constructor(
    private http: HttpClient
  ) {}

  getProducts(): Observable<Product[]> {

    if (this.cache) {
      return of(this.cache);
    }

    return this.http
      .get<Product[]>(
        '/assets/data/products.json'
      )
      .pipe(
        tap((data) => {
          this.cache = data;
        })
      );
  }

}