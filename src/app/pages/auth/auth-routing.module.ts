import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    // path: '',
    // data: {
    //   title: 'Authentication',
    //   status: false
    // },
    // children: [
      // {
        path: 'admin-login',
        data: {
          title: 'Authentication',
          status: false
        },
        loadChildren: () => import('./admin-login/admin-login.module').then(m => m.AdminLoginModule)
      // },
      // {
      //   path: 'registration',
      //   loadChildren: () => import('./registration/basic-reg/basic-reg.module').then(m => m.BasicRegModule)
      // }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
