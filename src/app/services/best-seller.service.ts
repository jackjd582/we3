import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BestSellerService {

  private productsCache: any[] | null = null;

  constructor(
    private http: HttpClient
  ) {}

  get hasCache(): boolean {
    return !!this.productsCache;
  }

  getProducts(): Observable<any[]> {

    if (this.productsCache) {
      return of(this.productsCache);
    }

    return this.http
      .get<any[]>('/assets/data/best-seller.json')
      .pipe(
        tap(data => {
          this.productsCache = data;
        })
      );
  }

}