import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css'],
  providers: [AuthService]
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;
  errorMessage: string | null = null;
  isSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.passwordForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8), this.strongPasswordValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  // Custom validator to check password strength
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (control.value && !strongPasswordRegex.test(control.value)) {
      return { weakPassword: true };
    }
    return null;
  }

  // Validator to check if newPassword and confirmPassword match
  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  // Method to handle form submission
  onSubmit(): void {
    this.errorMessage = null;
    this.isSuccess = false;

    if (this.passwordForm.invalid) {
      if (!this.passwordForm.controls['newPassword'].value && !this.passwordForm.controls['confirmPassword'].value) {
        this.errorMessage = 'Please enter password';
      } else if (this.passwordForm.controls['newPassword'].hasError('required')) {
        this.errorMessage = 'Please enter new password';
      } else if (this.passwordForm.controls['confirmPassword'].hasError('required')) {
        this.errorMessage = 'Please enter confirm password';
      } else if (this.passwordForm.controls['newPassword'].hasError('weakPassword')) {
        this.errorMessage = 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.';
      } else if (this.passwordForm.hasError('passwordsMismatch')) {
        this.errorMessage = 'Passwords did not match';
      }
      return;
    }

    // If all validations pass
    this.errorMessage = 'Password successfully reset!';
    this.isSuccess = true;
  }
}
