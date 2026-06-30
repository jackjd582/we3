import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerService } from '../../services/best-seller.service';
import { CONTACT } from '../../shared/config/contact.config';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
}

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-seller.html',
  styleUrls: ['./best-seller.css']
})
export class BestSeller implements OnInit {

  products: Product[] = [];

  loading = false;

  errorMessage = '';

  contact = CONTACT;

  constructor(
    private service: BestSellerService
  ) {}

  ngOnInit(): void {

    // show loading only first time
    this.loading = !this.service.hasCache;

    this.service.getProducts().subscribe({

      next: (data) => {

        this.products = data;

        this.loading = false;

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Unable to load products';

      }

    });

  }

  openWhatsapp() {

    window.open(
      `https://wa.me/${this.contact.whatsapp}`,
      '_blank'
    );

  }

  openEmail() {

    window.location.href =
      `mailto:${this.contact.email}`;

  }

}