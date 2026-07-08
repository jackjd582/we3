import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { ProductDetail } from './product-detail';
import { ProductService } from '../../services/product.service';

describe('ProductDetail', () => {
  let component: ProductDetail;
  let fixture: ComponentFixture<ProductDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: '1' }) },
        },
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') },
        },
        {
          provide: ProductService,
          useValue: {
            getProducts: jasmine.createSpy().and.returnValue(
              of([
                {
                  id: 1,
                  title: 'Test Product',
                  category: 'Category',
                  price: '₹100',
                  description: 'desc',
                  rating: 4.5,
                  reviews: 10,
                  images: ['assets/images/products/a.jpeg'],
                  image: 'assets/images/products/old.jpeg',
                },
              ])
            ),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return the first image from the images array for a product', () => {
    const product = {
      id: 2,
      title: 'Related Product',
      category: 'Category',
      price: '₹200',
      description: 'desc',
      rating: 4.2,
      reviews: 5,
      images: ['assets/images/products/related-1.jpeg', 'assets/images/products/related-2.jpeg'],
      image: 'assets/images/products/old.jpeg',
    };

    expect(component.getProductImage(product)).toBe('assets/images/products/related-1.jpeg');
  });
});
