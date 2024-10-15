// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AuthService } from './auth.service';
// import { HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { Router, RouterModule } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css'],
//   providers: [AuthService]
// })
// export class RegisterComponent {
//   registrationForm: FormGroup;
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router,
//     private snackBar: MatSnackBar
//   ) {
//   


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formvalidation',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent {
  userForm: FormGroup;
  showResumeMsg: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,) 

    {
    this.userForm = new FormGroup({
      fullName: new FormControl("", {
        validators: [Validators.required, this.nameValidator],
        updateOn: 'change'
      }),
      email: new FormControl("", [Validators.required, this.customEmailValidator]),
      alternateEmail: new FormControl("", [Validators.required, this.customEmailValidator]),
      mobile: new FormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
      alternateMobile: new FormControl("", [Validators.required, Validators.pattern(/^\d{10}$/)]),
      gender: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      linkedinLink: new FormControl("", [Validators.required, Validators.pattern(/https?:\/\/(www\.)?linkedin\.com\/.*$/)]),
      githubLink: new FormControl("", [Validators.required, Validators.pattern(/https?:\/\/(www\.)?github\.com\/.*$/)]),
      currentState: new FormControl("", [Validators.required]),
      currentCity: new FormControl("", [Validators.required]),
      homeState: new FormControl("", [Validators.required]),
      homeCity: new FormControl("", [Validators.required]),
      preferredLocation: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required, Validators.minLength(8), this.passwordComplexityValidator]),
      confirmPassword: new FormControl("", [Validators.required]),
      educationLevel: new FormControl("", [Validators.required]),
      college: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Za-z ]+$')]),
      course: new FormControl("", [Validators.required]),
      specialization: new FormControl("", [Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z ]*$')]),
      cgpa: new FormControl("", [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      positionApplying: new FormControl("", [Validators.required]),
      resume: new FormControl(null, [Validators.required, this.resumeFormatValidator]),
      primarySkill: new FormControl("", [Validators.required]),
      secondarySkill: new FormControl("", [Validators.required]),
      agree: new FormControl(false, Validators.requiredTrue) // Ensures the checkbox must be checked
    }, {
      validators: Validators.compose([
        emailDifferenceValidator('email', 'alternateEmail'),
        mobileDifferenceValidator('mobile', 'alternateMobile'),
        this.passwordMatchValidator
      ])
    });
  }

  // Validator for full name
  nameValidator(control: AbstractControl): ValidationErrors | null {
    const namePattern = /^[a-zA-Z\s]*$/;
    const minLength = 3;

    if (control.value) {
      if (control.value.length < minLength || !namePattern.test(control.value)) {
        return { invalidName: true };
      }
    }
    return null;
  }

  // Custom validator to match passwords
  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  // Validator for password complexity
  passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password && (password.length < minLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar)) {
      return { weakPassword: true };
    }
    return null;
  }

  // Custom email validator to ensure valid email format
  customEmailValidator(control: AbstractControl): ValidationErrors | null {
    const emailPattern = /^[a-z][a-z0-9._%+-]*@gmail\.com$/; // Enforces only lowercase gmail.com
    const email = control.value;
    return email && !emailPattern.test(email) ? { invalidEmail: true } : null;
  }

  // Validator for resume file format
  resumeFormatValidator(control: AbstractControl): ValidationErrors | null {
    const allowedFormats = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
    const file = control.value;
    return file && file.type && !allowedFormats.includes(file.type) ? { invalidFormat: true } : null;
  }

  // Handle file selection
  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.userForm.patchValue({
        resume: file
      });
      this.userForm.get('resume')?.updateValueAndValidity();
    }
  }

  // Show resume upload message
  showResumeMessage(): void {
    this.showResumeMsg = true;
  }

  // Hide resume upload message
  hideResumeMessage(): void {
    this.showResumeMsg = false;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
      // Proceed with your submission logic here
    } else {
      alert('Please fill the form correctly.');
      console.log('Form is not valid');
    }
  }
}

// Custom validator to ensure email and alternate email are different
export function emailDifferenceValidator(emailControlName: string, alternateEmailControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const emailControl = formGroup.get(emailControlName);
    const alternateEmailControl = formGroup.get(alternateEmailControlName);

    if (emailControl && alternateEmailControl && emailControl.value && alternateEmailControl.value) {
      const areSame = emailControl.value === alternateEmailControl.value;
      return areSame ? { emailDifference: true } : null;
    }
    return null;
  };
}

// Custom validator to ensure mobile and alternate mobile are different
export function mobileDifferenceValidator(mobileControlName: string, alternateMobileControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const mobileControl = formGroup.get(mobileControlName);
    const alternateMobileControl = formGroup.get(alternateMobileControlName);

    if (mobileControl && alternateMobileControl && mobileControl.value && alternateMobileControl.value) {
      const areSame = mobileControl.value === alternateMobileControl.value;
      return areSame ? { mobileDifference: true } : null;
    }
    return null;
  };
}
