import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import { AdminLoginRoutingModule } from './admin-login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,AdminLoginRoutingModule,SharedModule,FormsModule,ReactiveFormsModule,
    ToastrModule.forRoot(),NgxSpinnerModule
    
  ]
})
export class AdminLoginModule { }
