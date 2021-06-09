import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FrontentLayoutRoutingModule } from './frontent-layout-routing.module';
import { FrontentLayoutComponent } from './frontent-layout.component';
import { FrontendHeaderComponent } from 'src/app/component/frontend-header/frontend-header.component';
import { FrontendFooterComponent } from 'src/app/component/frontend-footer/frontend-footer.component';
import { HomeComponent } from 'src/app/pages/front-end/home/home.component';
import { AboutComponent } from 'src/app/pages/front-end/about/about.component';
import { CoursesComponent } from 'src/app/pages/front-end/courses/courses.component';
import { ContactComponent } from 'src/app/pages/front-end/contact/contact.component';



@NgModule({
  declarations: [FrontentLayoutComponent,FrontendHeaderComponent,FrontendFooterComponent,HomeComponent,
  AboutComponent,CoursesComponent,ContactComponent],
  imports: [
    CommonModule,RouterModule.forChild(FrontentLayoutRoutingModule)
  ]
})
export class FrontentLayoutModule { }
