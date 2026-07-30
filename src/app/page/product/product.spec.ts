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

  it('should use the configured WhatsApp number and omit price from the message', () => {
    const product = { title: 'Chair', category: 'Furniture', price: '₹500' };
    const openSpy = spyOn(window, 'open');

    component.openWhatsApp(product as any);

    expect(CONTACT.whatsapp).toBe('6353799159');
    const url = openSpy.calls.most().args[0] as string;
    expect(url).toContain('https://wa.me/6353799159');
    expect(url).not.toContain('Price:');
  });
});
