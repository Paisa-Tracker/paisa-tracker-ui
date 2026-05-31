import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TokenService } from '../../services/token.service';
import { JwtUtils } from '../../utils/jwtUtils';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit{

  isLoggedIn$: Observable<boolean>;
  username!: string;

  constructor(
    private tokenService:TokenService, 
    private router:Router,
  ){
    this.isLoggedIn$ = this.tokenService.isLoggedIn$;
  }

  ngOnInit(): void {
    if(this.tokenService.token){
      this.username = JwtUtils.getUsername();
    }
  }

  signOut(){
    this.tokenService.clearToken();
    this.router.navigate(['/signin']);
  }
}
