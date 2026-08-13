import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { RegistrationRequest } from '../../../models/registration-request';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-user',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-user.html',
  styleUrl: './register-user.css',
})
export class RegisterUser {
  errorMsg: string = ''; 

  constructor(private authService: AuthenticationService, private router: Router){}
  private readonly fb = inject(FormBuilder);

  readonly currentStep = signal(1);

  readonly registrationForm = this.fb.nonNullable.group({

    personal: this.fb.nonNullable.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]]
    }),

    contact: this.fb.nonNullable.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[6-9]\d{9}$/)
      ]]
    }),

    security: this.fb.nonNullable.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required
      ]]
    }, {
      validators: this.passwordMatchValidator
    })

  });

  readonly progress = computed(
    () => `${(this.currentStep() / 3) * 100}%`
  );

  next(): void {

    const step = this.currentStep();

    if (!this.isCurrentStepValid()) {
      this.markCurrentStepTouched();
      return;
    }

    if (step < 3) {
      this.currentStep.update(value => value + 1);
    }
  }

  back(): void {

    if (this.currentStep() > 1) {
      this.currentStep.update(value => value - 1);
    }
  }

  submit(): void {

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const registrationRequest: RegistrationRequest = {
      firstName: this.registrationForm.controls.personal.controls.firstName.value,
      lastName: this.registrationForm.controls.personal.controls.lastName.value,
      email: this.registrationForm.controls.contact.controls.email.value,
      phone: this.registrationForm.controls.contact.controls.phone.value,
      password: this.registrationForm.controls.security.controls.password.value
    };

    console.log('Registration payload:', registrationRequest);

    // Call registration API here.
    this.authService.register(registrationRequest).subscribe({
      next: ()=>{
        this.router.navigate(['/login'])
      },
      error: (err)=>{
        this.errorMsg = err;
        // this.cdrf.detectChanges();
      },
      complete: ()=>{
        this.errorMsg = '';
      }
    });
  }

  isCurrentStepValid(): boolean {

    switch (this.currentStep()) {

      case 1:
        return this.registrationForm.controls.personal.valid;

      case 2:
        return this.registrationForm.controls.contact.valid;

      case 3:
        return this.registrationForm.controls.security.valid;

      default:
        return false;
    }
  }

  markCurrentStepTouched(): void {

    switch (this.currentStep()) {

      case 1:
        this.registrationForm.controls.personal.markAllAsTouched();
        break;

      case 2:
        this.registrationForm.controls.contact.markAllAsTouched();
        break;

      case 3:
        this.registrationForm.controls.security.markAllAsTouched();
        break;
    }
  }

  hasError(
    control: AbstractControl | null,
    error: string
  ): boolean {

    return !!(
      control?.hasError(error) &&
      (control.dirty || control.touched)
    );
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword ? null : { passwordMismatch: true };
  }


}
