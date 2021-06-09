import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLayoutRoutingModule } from './basiclayout-routing.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MyaccountComponent } from 'src/app/pages/myaccount/myaccount.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';




@NgModule({
  declarations: [MyaccountComponent,LoginComponent],
  imports: [
    CommonModule,BasicLayoutRoutingModule,RouterModule,ReactiveFormsModule
  ]
})
export class BasiclayoutModule { }
