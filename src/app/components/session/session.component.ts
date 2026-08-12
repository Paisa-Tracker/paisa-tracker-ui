import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthenticationRequest } from '../../models/authentication-request';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthenticationService } from '../../services/authentication.service';
import { TokenService } from '../../services/token.service';
import { JwtUtils } from '../../utils/jwtUtils';
import { Header } from "../header/header";
import { Footer } from "../footer/footer";
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'app-session',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, FormsModule, ReactiveFormsModule, Header, Footer],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent implements OnInit{

  authRequest: AuthenticationRequest = {username: '', password: ''};
  errorMsg: string = '';
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  registrationRequest: RegistrationRequest = {username: '', fullname: '', email: '', password: ''};
  showRegister!: string;

  get usernameL() { return this.loginForm.get('username'); }
  get passwordL() { return this.loginForm.get('password'); }
  get usernameR() { return this.registerForm.get('username'); }
  get fullnameR() { return this.registerForm.get('fullname'); }
  get emailR() { return this.registerForm.get('email'); }
  get passwordR() { return this.registerForm.get('password'); }
  

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private cdrf: ChangeDetectorRef
  ) { }
  
  ngOnInit(): void {
    if(this.tokenService.token && !JwtUtils.isTokenExpired()){
      this.router.navigate(['/dashboard'])
    }else{
      localStorage.clear();
    }

    this.showRegister = this.route.snapshot.data['showRegister'] as string;
    this.errorMsg = '';
    this.loginForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.formBuilder.group({
      username:['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.-]*$')]],
      fullname:['', [Validators.required]],
      email:['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    this.errorMsg = '';
    this.authRequest.username = this.loginForm.get('username')?.value;
    this.authRequest.password = this.loginForm.get('password')?.value;
    this.authService.authenticate(this.authRequest).subscribe({
      next: (result)=>{
        this.tokenService.token = result.token as string;
        this.router.navigate(['/dashboard/content']);
      },
      error: (err)=>{
        this.errorMsg = err;
        this.cdrf.detectChanges();
      },
      complete: ()=>{
        this.errorMsg = '';
      }
    });
  }

  register(){
    this.registrationRequest.username = this.registerForm.get('username')?.value;
    this.registrationRequest.fullname = this.registerForm.get('fullname')?.value;
    this.registrationRequest.email = this.registerForm.get('email')?.value;
    this.registrationRequest.password = this.registerForm.get('password')?.value;

    this.authService.register(this.registrationRequest).subscribe({
      next: ()=>{
        this.router.navigate(['/signin'])
      },
      error: (err)=>{
        this.errorMsg = err;
        this.cdrf.detectChanges();
      },
      complete: ()=>{
        this.errorMsg = '';
      }
    });
  }
}
