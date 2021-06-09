import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

  constructor(private apiser: DataserviceService) { }
  
  getprofileimageAPI(): string {
    return sessionStorage.getItem('profile_image_url');
  }
  postmethod(service:any,data:any) {
   
    return this.apiser.apipostRecords(service,data).then(res => res);
    
  }

  getdata(service:any){
    return this.apiser.getmethod(service).then(res => res);
  }

  deleteblog(id:any){
    return this.apiser.getmethod(id).then(res => res);
  }
}
