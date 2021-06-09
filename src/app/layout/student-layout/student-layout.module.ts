import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { StudentLayoutRoutingModule } from './student-layout-routing.module';
import { StudentProfileComponent } from 'src/app/pages/student/student-profile/student-profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeesStructureComponent } from 'src/app/pages/student/fees-structure/fees-structure.component';
import { AddFeesStructureComponent } from 'src/app/pages/student/add-fees-structure/add-fees-structure.component';
import { ChangePasswordComponent } from 'src/app/pages/student/change-password/change-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SponsorshipPaidNotificationComponent } from 'src/app/pages/student/sponsorship-paid-notification/sponsorship-paid-notification.component';
import { ViewStudentSponsorComponent } from 'src/app/pages/student/view-student-sponsor/view-student-sponsor.component';
import { UpdateMydetailsComponent } from 'src/app/pages/student/update-mydetails/update-mydetails.component';

import { NgxSpinnerModule } from 'ngx-spinner';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [StudentProfileComponent,FeesStructureComponent,AddFeesStructureComponent,
    ChangePasswordComponent,SponsorshipPaidNotificationComponent,ViewStudentSponsorComponent,UpdateMydetailsComponent],
    
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,AngularMyDatePickerModule,
    RouterModule.forChild(StudentLayoutRoutingModule),NgbModule,NgxSpinnerModule,MatStepperModule,
    MatInputModule,MatButtonModule,MatListModule,MatFormFieldModule,MatSelectModule,DataTablesModule
  ]
})
export class StudentLayoutModule { }
