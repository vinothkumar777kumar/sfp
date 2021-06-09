import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { AdminRoutingModule } from './admin-routing.module';
import { StudentListComponent } from 'src/app/pages/admin/student-list/student-list.component';
import { AddStudentComponent } from 'src/app/pages/admin/add-student/add-student.component';
import { SponsorsListComponent } from 'src/app/pages/admin/sponsors-list/sponsors-list.component';
import { AddSponsorsComponent } from 'src/app/pages/admin/add-sponsors/add-sponsors.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from 'src/app/pages/dashboard/admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentChangePasswordComponent } from 'src/app/pages/admin/change-password/change-password.component'
import { SponsorChangePasswordComponent } from 'src/app/pages/admin/sponsor-change-password/sponsor-change-password.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SponsorStudentComponent } from 'src/app/pages/admin/sponsor-student/sponsor-student.component';
import { SponsorshipPaidDetailsComponent } from 'src/app/pages/admin/sponsorship-paid-details/sponsorship-paid-details.component';
import { StudentPendingApprovalListComponent } from 'src/app/pages/admin/student-pending-approval-list/student-pending-approval-list.component';
import { StudentApprovalComponent } from 'src/app/pages/admin/student-approval/student-approval.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SponsorAssigntoStudentComponent } from 'src/app/pages/admin/sponsor-assignto-student/sponsor-assignto-student.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DataTablesModule } from 'angular-datatables';

import { ViewStudentsDetailsComponent } from 'src/app/pages/admin/view-students-details/view-students-details.component';
import { AdminNotificationDetailsComponent } from 'src/app/pages/admin/admin-notification-details/admin-notification-details.component';
import { SponsorsFinancedListComponent } from 'src/app/pages/admin/sponsors-financed-list/sponsors-financed-list.component';
import { AdminSponsorshipPaidComponent } from 'src/app/pages/admin/admin-sponsorship-paid/admin-sponsorship-paid.component';

@NgModule({
  declarations: [AdminDashboardComponent,StudentListComponent,AddStudentComponent,SponsorsListComponent,
    AddSponsorsComponent,StudentChangePasswordComponent,SponsorChangePasswordComponent,SponsorStudentComponent,
    SponsorshipPaidDetailsComponent,StudentPendingApprovalListComponent,StudentApprovalComponent,
  SponsorAssigntoStudentComponent,ViewStudentsDetailsComponent,AdminNotificationDetailsComponent,SponsorsFinancedListComponent,
AdminSponsorshipPaidComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,AngularMyDatePickerModule,NgMultiSelectDropDownModule,
    RouterModule.forChild(AdminRoutingModule),NgbModule,NgxSpinnerModule,MatStepperModule,
    MatInputModule,MatButtonModule,MatListModule,MatFormFieldModule,MatSelectModule,DataTablesModule
  ]
})
export class AdminModule { }
