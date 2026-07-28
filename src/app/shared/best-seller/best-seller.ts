import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('sliderTrack') sliderTrack!: ElementRef<HTMLElement>;

  products: Product[] = [];

  loading = false;

  errorMessage = '';

  contact = CONTACT;

  constructor(
    private service: BestSellerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // show loading only first time
    this.loading = !this.service.hasCache;

    this.service.getProducts().subscribe({

      next: (data) => {

        this.products = data;

        this.loading = false;

        this.cdr.detectChanges();

      },

      error: () => {

        this.loading = false;

        this.errorMessage =
          'Unable to load products';

        this.cdr.detectChanges();

      }

    });

  }

  scrollSlider(direction: number) {
    const track = this.sliderTrack?.nativeElement;

    if (!track) {
      return;
    }

    const cardWidth = track.querySelector('.slider-item')?.getBoundingClientRect().width || 280;
    track.scrollBy({ left: direction * (cardWidth + 16), behavior: 'smooth' });
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