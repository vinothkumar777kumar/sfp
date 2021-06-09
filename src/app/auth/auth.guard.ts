import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  logininfo:any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.logininfo['token'] != null){
        return true;
      }else{
        this.router.navigate(['/login']);  
        return false;
      }
      // return this.authService.isLoggedIn         // {1}
      // .pipe(
      //   take(1),                              // {2} 
      //   map((isLoggedIn: boolean) => {    
      //     // alert(isLoggedIn);     // {3}
      //     if (!isLoggedIn){
      //       // alert(isLoggedIn);
      //       this.router.navigate(['/home']);  // {4}
      //       return false;
      //     }
      //     return true;
      //   })
      // )
  }
  
}
