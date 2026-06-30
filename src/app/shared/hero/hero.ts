import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
  getImageUrl(path: string): string {
    if (!path) {
      return '';
    }
    return path.startsWith('/') ? path : `/${path}`;
  }
}
