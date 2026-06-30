import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CategoryService {
  private categoriesCache: any[] | null = null;

    constructor(
        private http: HttpClient
    ) { }

  getCategories(): Observable<any[]> {
    if (this.categoriesCache) {
      return of(this.categoriesCache);
    }

    return this.http.get<any[]>(`/assets/data/categories.json`)
      .pipe(
        tap((categories) => {
          this.categoriesCache = categories;
        })
      );
  }

}