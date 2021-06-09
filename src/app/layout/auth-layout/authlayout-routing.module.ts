import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyaccountComponent } from 'src/app/pages/myaccount/myaccount.component';


const AuthLayoutRoutes: Routes = [
    // { path: 'home',component:HomeComponent},
    { path: 'myaccount',component:MyaccountComponent}
];

@NgModule({
    imports: [RouterModule.forChild(AuthLayoutRoutes)],
    exports: [RouterModule]
  })
  export class AuthLayoutRoutingModule { }