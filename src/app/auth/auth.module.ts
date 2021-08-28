import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IconsModule } from '../icons.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IconsModule,
  ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent
  ],
  exports: [
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent
  ]
})
export class AuthComponentsModule { }
