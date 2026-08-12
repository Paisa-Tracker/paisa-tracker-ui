import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { DashboardContent } from "../dashboard-content/dashboard-content";

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, DashboardContent, RouterOutlet, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
