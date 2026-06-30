import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class Category {

  @ViewChild('categorySlider')
  categorySlider!: ElementRef;

  categories: any[] = [];

  loading = true;

  errorMessage = '';

  constructor(
    private service:
      CategoryService
  ) { }

  ngOnInit() {

    this.service
      .getCategories()
      .subscribe({

        next: (data) => {

          console.log(data);

          this.categories = data;

          this.loading = false;

        },

        error: (err) => {

          console.log(err);

          this.loading = false;

          this.errorMessage =
            'Unable to load';

        }

      });

  }

  getImageUrl(path: string) {

    return path;

  }

  scrollSlider(direction: number) {

    if (!this.categorySlider)
      return;

    this.categorySlider
      .nativeElement
      .scrollBy({

        left:
          direction * 400,

        behavior:
          'smooth'

      });

  }

}