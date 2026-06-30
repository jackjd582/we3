import { Component } from '@angular/core';
import { Navbar } from "../navbar/navbar";
import { Footer } from "../footer/footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [Navbar, Footer, RouterOutlet],
  templateUrl: './main.html',
  styleUrls: ['./main.css'],
})
export class Main {}
