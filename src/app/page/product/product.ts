import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CONTACT } from '../../shared/config/contact.config';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filteredProducts: any[] = [];
  selectedCategory: string = 'All';
  searchQuery: string = '';
  itemsPerPage: number = 9;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = [{ id: 0, title: 'All', image: '' }, ...data];
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Failed to load products:', err);
      }
    });
  }

  selectCategory(category: string) {

    this.selectedCategory = category;

    this.currentPage = 1;

    this.applyFilters();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  onSearch() {
    this.currentPage = 1;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory !== 'All') {
      filtered = filtered.filter(
        (p) => p.category === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    this.filteredProducts = filtered;
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }
  }

  getPaginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredProducts.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  openWhatsApp(
    product: any
  ) {

    const message =

      `Hello,
I'm interested in:

Product:
${product.title}

Category:
${product.category}

Price:
${product.price}

Please provide details.`;

    window.open(

      `https://wa.me/${CONTACT.whatsapp
      }?text=${encodeURIComponent(
        message
      )
      }`,

      '_blank'

    );

  }

  getImageUrl(path: string): string {
    if (!path) {
      return '';
    }
    return path.startsWith('/') ? path : `/${path}`;
  }
}
