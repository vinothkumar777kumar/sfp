import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AuthHeaderComponent } from './component/auth-header/auth-header.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BasicLayoutComponent } from './layout/basic-layout/basic-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MyaccountComponent } from './pages/myaccount/myaccount.component';
import { AuthComponent } from './layout/auth/auth.component';
import { StudentLayoutComponent } from './layout/student-layout/student-layout.component';
import { SponsorsLayoutComponent } from './layout/sponsors-layout/sponsors-layout.component';
import { FrontentLayoutComponent } from './layout/frontent-layout/frontent-layout.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', component: FrontentLayoutComponent,
  children:[
      {
        path: '',
        // component:HomeComponent
        loadChildren: () => import('./layout/frontent-layout/frontent-layout.module').then(m => m.FrontentLayoutModule)
        // loadChildren: './layout/basiclayout/basiclayout.module#BasiclayoutModule'
      }
    ]},
  { path: '', component: BasicLayoutComponent,
children:[
    {
      path: '',
      // component:HomeComponent
      loadChildren: () => import('./layout/basic-layout/basiclayout.module').then(m => m.BasiclayoutModule)
      // loadChildren: './layout/basiclayout/basiclayout.module#BasiclayoutModule'
    }
  ]},
  {
    path: '',
    component:AdminComponent,
    loadChildren: () => import('./layout/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '',
    component:StudentLayoutComponent,
    loadChildren: () => import('./layout/student-layout/student-layout.module').then(m => m.StudentLayoutModule)
  },
  {
    path: '',
    component:SponsorsLayoutComponent,
    loadChildren: () => import('./layout/sponsors-layout/sponsor-layout.module').then(m => m.SponsorLayoutModule)
  },
  {
    path: '',
    component: AuthComponent,     
    loadChildren: () => import('./pages/auth/admin-login/admin-login.module').then(m => m.AdminLoginModule)    
  },
  {
    path: 'forgot-password',
    component: AuthComponent,     
    loadChildren: () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)    
  },
  {
    path: 'reset-password',
    component: AuthComponent,     
    loadChildren: () => import('./pages/auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule)    
  },
  {
    path: 'sign-up',
    component: AuthComponent,     
    loadChildren: () => import('./pages/auth/registration/registration.module').then(m => m.RegistrationModule)    
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
