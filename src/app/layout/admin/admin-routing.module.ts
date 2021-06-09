import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSponsorsComponent } from 'src/app/pages/admin/add-sponsors/add-sponsors.component';
import { AddStudentComponent } from 'src/app/pages/admin/add-student/add-student.component';
import { AdminNotificationDetailsComponent } from 'src/app/pages/admin/admin-notification-details/admin-notification-details.component';
import { AdminSponsorshipPaidComponent } from 'src/app/pages/admin/admin-sponsorship-paid/admin-sponsorship-paid.component';
import { StudentChangePasswordComponent } from 'src/app/pages/admin/change-password/change-password.component';
import { SponsorAssigntoStudentComponent } from 'src/app/pages/admin/sponsor-assignto-student/sponsor-assignto-student.component';
import { SponsorChangePasswordComponent } from 'src/app/pages/admin/sponsor-change-password/sponsor-change-password.component';
import { SponsorStudentComponent } from 'src/app/pages/admin/sponsor-student/sponsor-student.component';
import { SponsorsFinancedListComponent } from 'src/app/pages/admin/sponsors-financed-list/sponsors-financed-list.component';
import { SponsorsListComponent } from 'src/app/pages/admin/sponsors-list/sponsors-list.component';
import { SponsorshipPaidDetailsComponent } from 'src/app/pages/admin/sponsorship-paid-details/sponsorship-paid-details.component';
import { StudentApprovalComponent } from 'src/app/pages/admin/student-approval/student-approval.component';
import { StudentListComponent } from 'src/app/pages/admin/student-list/student-list.component';
import { StudentPendingApprovalListComponent } from 'src/app/pages/admin/student-pending-approval-list/student-pending-approval-list.component';
import { ViewStudentsDetailsComponent } from 'src/app/pages/admin/view-students-details/view-students-details.component';
import { AdminDashboardComponent } from 'src/app/pages/dashboard/admin-dashboard/admin-dashboard.component';


export const AdminRoutingModule : Routes = [
  {path:'admin-dashboard',component:AdminDashboardComponent},
    {path:'students-list',component:StudentListComponent},
    {path:'add-student',component:AddStudentComponent},
    {path:'sponsors-list',component:SponsorsListComponent},
    {path:'add-sponsors',component:AddSponsorsComponent},
    {path:'student-change-password',component:StudentChangePasswordComponent},
    {path:'sponsor-change-password',component:SponsorChangePasswordComponent},
    {path:'sponsor-student',component:SponsorStudentComponent},
    {path:'sponsorship-paid-details',component:SponsorshipPaidDetailsComponent},
    {path:'student-pending-approval-list',component:StudentPendingApprovalListComponent},
    {path:'student-approval',component:StudentApprovalComponent},
    {path:'sponsor-assignto-student',component:SponsorAssigntoStudentComponent},
    {path:'view-student-details',component:ViewStudentsDetailsComponent},
    {path:'admin-notification-details',component:AdminNotificationDetailsComponent},
    {path:'sponsor-finansed-list',component:SponsorsFinancedListComponent},
    {path:'admin-sponsorship-paid',component:AdminSponsorshipPaidComponent}
  

];

