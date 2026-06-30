import { Component } from '@angular/core';
import { Hero } from "../../shared/hero/hero";
import { Category } from "../../shared/category/category";
import { BestSeller } from '../../shared/best-seller/best-seller';
import { WhyChoose } from "../../shared/why-choose/why-choose";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Hero, Category, BestSeller, WhyChoose],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {}
