import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgotpassword/forgotpassword.component';
import { OtpComponent } from './otp/otp.component';
import { ChangePasswordComponent } from './changepassword/changepassword.component';


export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'forgotpassword',component:ForgotPasswordComponent},
    {path:'otp',component:OtpComponent},
    {path:'changepassword',component:ChangePasswordComponent}
];