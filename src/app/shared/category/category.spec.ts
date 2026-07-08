import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Category } from './category';
import { CategoryService } from '../../services/category.service';

describe('Category', () => {
  let component: Category;
  let fixture: ComponentFixture<Category>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Category],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            getCategories: jasmine.createSpy().and.returnValue(of([{ title: 'Test Category' }]))
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Category);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh the view when categories arrive', () => {
    const detectChangesSpy = jasmine.createSpy('detectChanges');
    component['cdr'] = { detectChanges: detectChangesSpy } as any;

    component.ngOnInit();

    expect(detectChangesSpy).toHaveBeenCalled();
  });
});
