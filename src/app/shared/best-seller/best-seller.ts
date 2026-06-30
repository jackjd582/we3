import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BestSellerService } from '../../services/best-seller.service';

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  rating: number;
  reviews: number;
  image: string;
  whatsapp?: string;
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

  loading = true;

  errorMessage = '';

  constructor(
    private service: BestSellerService
  ) {}

  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.loading = true;

    this.service
      .getProducts()
      .subscribe({

        next: (data: Product[]) => {

          console.log(data);

          this.products = data;

          this.loading = false;

        },

        error: (err) => {

          console.error(err);

          this.loading = false;

          this.errorMessage =
            'Unable to load products';

        }

      });

  }

  contact(phone?: string): void {

    if (!phone) {
      return;
    }

    window.open(
      `https://wa.me/${phone}`,
      '_blank'
    );

  }

}