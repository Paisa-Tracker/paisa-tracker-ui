import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../../models/authentication-request';
import { AuthenticationService } from '../../../services/authentication.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-login-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-user.html',
  styleUrl: './login-user.css',
})
export class LoginUser {
  private readonly fb = inject(FormBuilder);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');
  readonly loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly authService: AuthenticationService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
  ) {}

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set('');
    this.isSubmitting.set(true);

    // The authentication endpoint uses `username` as its request field; email is
    // supplied as its value because users sign in with their registered email.
    const request: AuthenticationRequest = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    this.authService.authenticate(request).subscribe({
      next: (response) => {
        if (!response?.token) {
          this.errorMessage.set('Unable to sign in. Please try again.');
          return;
        }

        this.tokenService.token = response.token;
        this.router.navigate(['/dashboard/content']);
      },
      error: (error: string) => {
        this.errorMessage.set(error || 'Unable to sign in. Please try again.');
        this.isSubmitting.set(false);
      },
      complete: () => this.isSubmitting.set(false),
    });
  }

  hasError(controlName: 'email' | 'password', error: string): boolean {
    const control = this.loginForm.controls[controlName];
    return control.hasError(error) && (control.dirty || control.touched);
  }
}
