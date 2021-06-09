import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterModule } from '@angular/router';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,ForgotPasswordRoutingModule,AngularMyDatePickerModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class ForgotPasswordModule { }
