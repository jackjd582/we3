import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CONTACT } from '../../shared/config/contact.config';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product: any = null;
  relatedProducts: any[] = [];
  selectedImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
      private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = parseInt(params['id'], 10);
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number) {

    this.productService
      .getProducts()
      .subscribe({

        next: (products: any[]) => {

          this.product =
            products.find(
              (p) => p.id === id
            );

          this.selectedImageIndex = 0;

          if (this.product) {

            this.loadRelatedProducts();

          }

        }

      });

  }

  loadRelatedProducts() {
    this.productService.getProducts().subscribe({
      next: (products: any[]) => {
        this.relatedProducts = products
          .filter(
            (p) =>
              p.category === this.product.category && p.id !== this.product.id
          )
          .slice(0, 4);
      },
      error: (err) => {
        console.error('Failed to load related products:', err);
      }
    });
  }

  selectImage(index: number) {
    this.selectedImageIndex = index;
  }

  openWhatsApp() {

    const message =

      `Hello,
I want details for

${this.product.title}

Price:
${this.product.price}`;

    window.open(

      `https://wa.me/${CONTACT.whatsapp
      }?text=${encodeURIComponent(
        message
      )
      }`,

      '_blank'

    );

  }

  copyWhatsAppNumber() {
    const phone = this.product.whatsapp;
    navigator.clipboard.writeText(phone).then(() => {
      alert('WhatsApp number copied to clipboard!');
    });
  }

  getImageList(): string[] {

    if (!this.product) {
      return [];
    }

    if (
      this.product.images &&
      this.product.images.length
    ) {
      return this.product.images;
    }

    return [this.product.image];

  }
  getSelectedImage(): string {

    const images =
      this.getImageList();

    return this.getImageUrl(
      images[
      this.selectedImageIndex
      ] || images[0]
    );

  }
  generateStars() {
    const stars = [];
    const rating = Math.floor(this.product.rating);
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push('full');
      } else if (i === rating && this.product.rating % 1 !== 0) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }

 goBack() {

  this.router.navigate(
    ['/products']
  );

}

  getImageUrl(path: string): string {
    if (!path) {
      return '';
    }
    return path.startsWith('/') ? path : `/${path}`;
  }
}
