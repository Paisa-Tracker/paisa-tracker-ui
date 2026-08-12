import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-tab-pricing',
  imports: [Header, Footer],
  templateUrl: './tab-pricing.html',
  styleUrl: './tab-pricing.css',
})
export class TabPricing {}
