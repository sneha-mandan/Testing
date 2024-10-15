// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from './auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-forgot-password',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
//   templateUrl: './forgotpassword.component.html',
//   styleUrls: ['./forgotpassword.component.css'],
//   providers: [AuthService]
// })
// export class ForgotPasswordComponent {
//   forgotPasswordForm: FormGroup;
//   submitted = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//   ) {
//     this.forgotPasswordForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]]
//     });
//   }

//   onSubmit() {
//     this.submitted = true;
//     if (this.forgotPasswordForm.valid) {
//       const email = this.forgotPasswordForm.value.email;
//       console.log('Submitted Email:', email);
//       // Logic to handle sending OTP can be added here
//     }
//   }

//   getEmailErrorMessage() {
//     const control = this.forgotPasswordForm.controls['email'];
    
//     if (control.hasError('required')) {
//       return 'Please enter your email';
//     }
//     if (control.hasError('email')) {
//       return 'Please enter a valid email address';
//     }
//     return '';
//   }

//   get emailInvalid() {
//     const control = this.forgotPasswordForm.controls['email'];
//     return control.invalid && (control.touched || this.submitted);
//   }
// }


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
  providers: [AuthService]
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      console.log('Submitted Email:', email);
      // Here you can call a service to send the OTP
      // For now, we will navigate to the OTP page directly
      this.router.navigate(['/otp']); // Navigate to the OTP page
    }
  }

  getEmailErrorMessage() {
    const control = this.forgotPasswordForm.controls['email'];
    
    if (control.hasError('required')) {
      return 'Please enter your email';
    }
    if (control.hasError('email')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  get emailInvalid() {
    const control = this.forgotPasswordForm.controls['email'];
    return control.invalid && (control.touched || this.submitted);
  }
}
