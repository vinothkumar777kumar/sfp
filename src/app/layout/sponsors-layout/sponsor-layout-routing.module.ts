import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSponsorshipPaidComponent } from 'src/app/pages/sponsors/add-sponsorship-paid/add-sponsorship-paid.component';
import { ChangeMyPasswordComponent } from 'src/app/pages/sponsors/change-my-password/change-my-password.component';
import { SponsorProfileComponent } from 'src/app/pages/sponsors/sponsor-profile/sponsor-profile.component';
import { SponsorStudentListComponent } from 'src/app/pages/sponsors/sponsor-student-list/sponsor-student-list.component';
import { ViewPaidDetailsComponent } from 'src/app/pages/sponsors/view-paid-details/view-paid-details.component';
import { SponsorWalletDetailsComponent } from 'src/app/pages/sponsors/sponsor-wallet-details/sponsor-wallet-details.component';
import { AddWalletTransationComponent } from 'src/app/pages/sponsors/add-wallet-transation/add-wallet-transation.component';
import { ViewSponsorstudentDetailsComponent } from '../../pages/sponsors/view-sponsorstudent-details/view-sponsorstudent-details.component';


export const SponsorLayoutRoutingModule: Routes = [
  {path:'sponsor-profile',component:SponsorProfileComponent},
  {path:'sponsor-changemy-password',component:ChangeMyPasswordComponent},
  {path:'sponsor-students-list',component:SponsorStudentListComponent},
  {path:'add-sponsorship-paid',component:AddSponsorshipPaidComponent},
  {path:'view-paid-details',component:ViewPaidDetailsComponent},
  {path:'sponsor-wallet-details',component:SponsorWalletDetailsComponent},
  {path:'add-wallet-transation',component:AddWalletTransationComponent},
  {path:'view-sponsorstudent-details',component:ViewSponsorstudentDetailsComponent}
  
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class SponsorLayoutRoutingModule { }
