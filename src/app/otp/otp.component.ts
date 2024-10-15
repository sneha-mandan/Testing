import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service'; 
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
  providers: [AuthService]
})
export class OtpComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  showError = false;
  showEmptyError = false;
  countdown: number = 30;
  canResend: boolean = false; 
  timer: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.otpForm = this.fb.group({
      otp1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      otp4: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });
  }

  ngOnInit() {
    this.startCountdown(); 
  }

  ngOnDestroy() {
    clearInterval(this.timer); 
  }

  startCountdown() {
    this.countdown = 30;
    this.canResend = false; 

    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.timer); 
        this.canResend = true;
      }
    }, 1000); 
  }

  resendOtp() {
    if (this.canResend) {
      console.log('Resending OTP...');
      this.resetOTPFields(); 

      this.authService.otp({ email: 'user@example.com' }).subscribe(
        response => {
          console.log('OTP Resent:', response);
          this.startCountdown(); 
        },
        error => {
          console.error('Error resending OTP:', error);
        }
      );
    }
  }

  resetOTPFields() {
    this.otpForm.reset(); 
    this.showEmptyError = false; 
    this.showError = false; 
    this.countdown = 30; 
    clearInterval(this.timer); 
    this.canResend = false;
    this.startCountdown(); 
  }

  isOtpComplete() {
    return this.otpForm.valid; 
  }

  validateInput(currentField: string, nextFieldID: string) {
    const currentValue = this.otpForm.get(currentField)?.value;

    if (!/^[0-9]$/.test(currentValue)) {
      this.showError = true;
      this.otpForm.get(currentField)?.setValue('');
      this.showEmptyError = true; 
    } else {
      this.showError = false; 
      this.showEmptyError = !this.otpForm.valid; 

      if (nextFieldID) {
        const nextInput = document.getElementById(nextFieldID) as HTMLInputElement;
        nextInput?.focus();
      }
      
      if (this.isOtpComplete()) {
        clearInterval(this.timer); 
      }
    }
  }

  moveToPrevious(event: KeyboardEvent, previousFieldID: string) {
    if (event.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
      const previousInput = document.getElementById(previousFieldID) as HTMLInputElement;
      previousInput?.focus();
    }
  }

  onSubmit() {
    if (this.otpForm.invalid) {
      this.showEmptyError = true; 
    } else {
      this.showEmptyError = false; 
      console.log('OTP Submitted:', this.otpForm.value);
      this.router.navigate(['/new-password']);
    }
  }
}

