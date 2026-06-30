import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {

  closeNavbar() {
    const nav = document.getElementById('navbar');

    if (nav?.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }
  }
}