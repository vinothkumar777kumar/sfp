import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiconfigService } from './apiconfig.service';
import { catchError, retry, tap, debounceTime } from 'rxjs/operators';
import { throwError } from 'rxjs';
// import { register } from '../entities/register.entity';
import { DataserviceService } from './dataservice.service';
import { AnyAaaaRecord } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _URL: string = "";
  logininfo:any;
  constructor(private http:HttpClient,private apiser: DataserviceService) { }

  register(data) {
   
    return this.apiser.postmethod('register',data).then(res => res);
    
  }

  login(data) {
   
    return this.apiser.postmethod('userlogin',data).then(res => res);
    
  }

  forgotpasswordin(data) {
   
    return this.apiser.postmethod('forgotpassword',data).then(res => res);
    
  }

  seesionuser_info(res){
    sessionStorage.setItem('login_details',JSON.stringify(res));
}

manager_signup(data: any) {
   
  return this.apiser.postmethod('managersignup',data).then(res => res);
  
}
}
