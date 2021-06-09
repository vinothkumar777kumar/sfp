import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BasicHeaderComponent } from './component/basic-header/basic-header.component';
import { AuthHeaderComponent } from './component/auth-header/auth-header.component';
import { FooterComponent } from './component/footer/footer.component';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BasiclayoutModule } from './layout/basic-layout/basiclayout.module';
import { AuthlayoutModule } from './layout/auth-layout/authlayout.module';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AdminComponent } from './layout/admin/admin.component';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';
import { TitleComponent } from './layout/admin/title/title.component';
import { AuthComponent } from './layout/auth/auth.component';
import { AdminModule } from './layout/admin/admin.module';
import { AdminLoginModule } from './pages/auth/admin-login/admin-login.module';
import { RegistrationModule } from './pages/auth/registration/registration.module';
import { StudentLayoutModule } from './layout/student-layout/student-layout.module';
import { StudentLayoutComponent } from './layout/student-layout/student-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SponsorsLayoutComponent } from './layout/sponsors-layout/sponsors-layout.component';
import { SponsorLayoutModule } from './layout/sponsors-layout/sponsor-layout.module';
import { ForgotPasswordModule } from './pages/auth/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './pages/auth/reset-password/reset-password.module';
import { AuthGuard } from './auth/auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FrontentLayoutModule } from './layout/frontent-layout/frontent-layout.module';
// import { FrontendHeaderComponent } from './component/frontend-header/frontend-header.component';
// import { FrontendFooterComponent } from './component/frontend-footer/frontend-footer.component';
// import { FrontentLayoutComponent } from './layout/frontent-layout/frontent-layout.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicHeaderComponent,
    AuthHeaderComponent,
    FooterComponent,
    BasicLayoutComponent,
    AuthLayoutComponent,
    AdminComponent,
    BreadcrumbsComponent,
    TitleComponent,
    AuthComponent,
    StudentLayoutComponent,
    SponsorsLayoutComponent
  ],
  imports: [
    BrowserModule,NgbModule,
    AppRoutingModule,
    BasiclayoutModule,
    HttpClientModule,
    AuthlayoutModule,SharedModule,BrowserAnimationsModule,ResetPasswordModule,
    AdminModule,AdminLoginModule,RegistrationModule,StudentLayoutModule,SponsorLayoutModule,ForgotPasswordModule,
    NgxSpinnerModule,FrontentLayoutModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
