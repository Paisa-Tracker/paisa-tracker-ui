import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-tab-support',
  imports: [Header, Footer],
  templateUrl: './tab-support.html',
  styleUrl: './tab-support.css',
})
export class TabSupport {}
