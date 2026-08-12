import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-tab-features',
  imports: [Header, Footer],
  templateUrl: './tab-features.html',
  styleUrl: './tab-features.css',
})
export class TabFeatures {}
