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
    name: 'Pankaj Vataliya',
    role: 'Founder & Product Director',
    image: 'assets/images/founder.png',
    desc: 'Leads product research, formulation, manufacturing, and quality assurance to ensure every We3 Car Care product delivers premium performance, long-lasting protection, and professional-grade results.'
  },
  {
    name: 'Anurag Soni',
    role: 'Co-Founder & Sales Director',
    image: 'assets/images/co-founder.png',
    desc: 'Heads sales strategy, business development, dealer partnerships, and customer relationships, driving market growth while ensuring exceptional service across every customer touchpoint.'
  }
];

  getImageUrl(path: string): string {
    return path;
  }
}