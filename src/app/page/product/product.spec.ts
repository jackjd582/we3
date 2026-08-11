import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Product } from './product';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { CONTACT } from '../../shared/config/contact.config';

describe('Product', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getProducts: jasmine.createSpy().and.returnValue(of([])),
          },
        },
        {
          provide: CategoryService,
          useValue: {
            getCategories: jasmine.createSpy().and.returnValue(of([])),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open WhatsApp inquiries for all configured numbers and omit price from the message', () => {
    const product = { title: 'Chair', category: 'Furniture', price: '₹500' };
    const openSpy = spyOn(window, 'open');
    const numbers = CONTACT.getWhatsAppNumbers();

    component.openWhatsApp(product as any);

    const urls = openSpy.calls.allArgs().map((call) => call[0] as string);

    expect(numbers.length).toBeGreaterThan(1);
    expect(urls.length).toBe(numbers.length);
    expect(urls[0]).toContain(`https://wa.me/${numbers[0]}`);
    expect(urls.some((url) => url.includes(`https://wa.me/${numbers[1]}`))).toBeTrue();
    expect(urls[0]).not.toContain('Price:');
  });
});
