import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AddFeesStructureComponent } from 'src/app/pages/student/add-fees-structure/add-fees-structure.component';
import { ChangePasswordComponent } from 'src/app/pages/student/change-password/change-password.component';
import { FeesStructureComponent } from 'src/app/pages/student/fees-structure/fees-structure.component';
import { SponsorshipPaidNotificationComponent } from 'src/app/pages/student/sponsorship-paid-notification/sponsorship-paid-notification.component';
import { StudentProfileComponent } from 'src/app/pages/student/student-profile/student-profile.component';
import { UpdateMydetailsComponent } from 'src/app/pages/student/update-mydetails/update-mydetails.component';
import { ViewStudentSponsorComponent } from 'src/app/pages/student/view-student-sponsor/view-student-sponsor.component';


export const StudentLayoutRoutingModule: Routes = [
  {path:'student-profile',component:StudentProfileComponent,canActivate:[AuthGuard]},
  {path:'fees-structure',component:FeesStructureComponent},
  {path:'add-fees-structure',component:AddFeesStructureComponent},
  {path:'change-password',component:ChangePasswordComponent},
  {path:'sponsorship-paid-notification',component:SponsorshipPaidNotificationComponent},
  {path:'view-student-sponsor',component:ViewStudentSponsorComponent},
  {path:'update-mydetails',component:UpdateMydetailsComponent}
];


