import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {

  founders = [
    {
      name: 'John Carter',
      role: 'Founder',
      image: 'assets/images/founder.jpg',
      desc:
        'Focused on delivering premium car care products with innovation and long-lasting quality.'
    },
    {
      name: 'Michael Roy',
      role: 'Co-Founder',
      image: 'assets/images/co-founder.jpg',
      desc:
        'Passionate about customer experience and building trusted automotive care solutions.'
    }
  ];

  getImageUrl(path: string): string {
    return path;
  }
}