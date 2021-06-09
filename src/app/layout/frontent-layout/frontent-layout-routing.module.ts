import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/front-end/home/home.component';


export const FrontentLayoutRoutingModule: Routes = [
   { path: 'home',component:HomeComponent},
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class FrontentLayoutRoutingModule { }
