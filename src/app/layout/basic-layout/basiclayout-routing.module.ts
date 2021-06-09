import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
// import { HomeComponent } from 'src/app/pages/home/home.component';
import { LoginComponent } from 'src/app/pages/auth/login/login.component';
import { MyaccountComponent } from 'src/app/pages/myaccount/myaccount.component';
import { AdminLoginComponent } from 'src/app/pages/auth/admin-login/admin-login.component';


const BasicLayoutRoutes: Routes = [
    // { path: 'home',component:HomeComponent},
    { path: 'myaccount',component:MyaccountComponent},
    // { path: 'login',component:AdminLoginComponent},
    // { path: 'login',component:LoginComponent},
];

@NgModule({
    imports: [RouterModule.forChild(BasicLayoutRoutes)],
    exports: [RouterModule]
  })
  export class BasicLayoutRoutingModule { }