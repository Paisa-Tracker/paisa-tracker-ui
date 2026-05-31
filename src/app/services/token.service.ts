import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private loggedInStatus = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$: Observable<boolean> = this.loggedInStatus.asObservable();

  constructor() {
    
  }

  set token(token: string){
    localStorage.setItem('token', token);
    this.loggedInStatus.next(true);
  }

  get token(){
    return localStorage.getItem('token') as string;
  }

  private hasToken(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && token !== undefined && token !== '';
  }

  public clearToken(){
    localStorage.clear();
    this.loggedInStatus.next(false);
  }


}
