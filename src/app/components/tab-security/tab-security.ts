import { Component } from '@angular/core';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-tab-security',
  imports: [Header, Footer],
  templateUrl: './tab-security.html',
  styleUrl: './tab-security.css',
})
export class TabSecurity {}
