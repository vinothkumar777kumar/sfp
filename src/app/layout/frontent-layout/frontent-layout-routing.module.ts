import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/front-end/home/home.component';
import { AboutComponent } from 'src/app/pages/front-end/about/about.component';
import { CoursesComponent } from 'src/app/pages/front-end/courses/courses.component';
import { ContactComponent } from 'src/app/pages/front-end/contact/contact.component';


export const FrontentLayoutRoutingModule: Routes = [
   { path: 'home',component:HomeComponent},
   { path: 'about',component:AboutComponent},
   { path: 'courses',component:CoursesComponent},
   { path: 'contact',component:ContactComponent}
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class FrontentLayoutRoutingModule { }
