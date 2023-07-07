import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './Components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { SignupComponent } from './Components/signup/signup.component';
import { ConfirmEmailComponent } from './Components/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './Components/email-confirmed/email-confirmed.component';
import { AccessDeniedComponent } from './Components/access-denied/access-denied.component';
import { SuccessfullRegisterComponent } from './Components/successfull-register/successfull-register.component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    ConfirmEmailComponent,
    EmailConfirmedComponent,
    AccessDeniedComponent,
    SuccessfullRegisterComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
