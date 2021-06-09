import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { SponsorLayoutRoutingModule } from './sponsor-layout-routing.module';
import { SponsorProfileComponent } from 'src/app/pages/sponsors/sponsor-profile/sponsor-profile.component';
import { ChangeMyPasswordComponent } from 'src/app/pages/sponsors/change-my-password/change-my-password.component';
import { SponsorStudentListComponent } from 'src/app/pages/sponsors/sponsor-student-list/sponsor-student-list.component';
import { AddSponsorshipPaidComponent } from 'src/app/pages/sponsors/add-sponsorship-paid/add-sponsorship-paid.component';
import { ViewPaidDetailsComponent } from 'src/app/pages/sponsors/view-paid-details/view-paid-details.component';
import { SponsorWalletDetailsComponent } from 'src/app/pages/sponsors/sponsor-wallet-details/sponsor-wallet-details.component';
import { AddWalletTransationComponent } from 'src/app/pages/sponsors/add-wallet-transation/add-wallet-transation.component';
import { ViewSponsorstudentDetailsComponent } from '../../pages/sponsors/view-sponsorstudent-details/view-sponsorstudent-details.component';



@NgModule({
  declarations: [SponsorProfileComponent,ChangeMyPasswordComponent,SponsorStudentListComponent,
    AddSponsorshipPaidComponent,ViewPaidDetailsComponent,SponsorWalletDetailsComponent,AddWalletTransationComponent,
  ViewSponsorstudentDetailsComponent],
  imports: [
    CommonModule,RouterModule.forChild(SponsorLayoutRoutingModule),NgbModule,AngularMyDatePickerModule,
    FormsModule,ReactiveFormsModule,DataTablesModule
  ]
})
export class SponsorLayoutModule { }
