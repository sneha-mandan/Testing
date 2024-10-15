// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from './auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   providers: [AuthService]
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   errorMessage: string = '';

//   constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
//     this.loginForm = this.fb.group({
//       username: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//       remember: [false] 
//     });
//   }

//   onSubmit() {
//     if (this.loginForm.valid) {
//       this.authService.login(this.loginForm.value).subscribe({
//         next: (response) => {
//           console.log('Login successful', response);
//           this.errorMessage = '';
//           // Redirect to another page after login
//         },
//         error: (error) => {
//           this.errorMessage = 'Login failed. Please check your credentials.';
//           console.error('Login failed', error);
//         }
//       });
//     } else {
//       this.loginForm.markAllAsTouched();
//     }
//   }

//   isInvalid(controlName: string): boolean {
//     const control = this.loginForm.get(controlName);
//     return !!(control && control.invalid && (control.touched || control.dirty));
//   }

//   getErrorMessage(controlName: string): string {
//     const control = this.loginForm.get(controlName);

//     if (control?.hasError('required')) {
//       return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
//     }
//     if (control?.hasError('email')) {
//       return 'Please enter a valid email address.';
//     }
//     if (control?.hasError('minlength')) {
//       const requiredLength = control.errors?.['minlength']?.requiredLength;
//       return `Minimum length is ${requiredLength} characters.`;
//     }
//     return '';
//   }
// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false] 
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.errorMessage = '';
          // Redirect to another page after login if needed
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login failed', error);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);

    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required.`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address.';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength']?.requiredLength;
      return `Minimum length is ${requiredLength} characters.`;
    }
    return '';
  }

  // Navigate to the registration page
  onSignup() {
    this.router.navigate(['/register']);
  }

  // Navigate to the forgot password page
  onForgotPassword() {
    this.router.navigate(['/forgotpassword']);
  }
}
