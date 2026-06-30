import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BestSellerService {

    constructor(
        private http: HttpClient
    ) { }

    private productsCache: any[] | null = null;

    getProducts(): Observable<any[]> {
        if (this.productsCache) {
            return of(this.productsCache);
        }

        return this.http.get<any[]>(`/assets/data/best-seller.json`)
            .pipe(
                tap((products) => {
                    this.productsCache = products;
                })
            );
    }

}