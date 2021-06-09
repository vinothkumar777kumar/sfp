import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private apiser: DataserviceService) { }

  postmethod(service:any,data:any,isFileUpload:boolean) {
   
    return this.apiser.apipostRecords(service,data,isFileUpload).then(res => res);
    
  }

  getdata(service:any){
    return this.apiser.getmethod(service).then(res => res);
  }

  delete(id:any){
    return this.apiser.getmethod(id).then(res => res);
  }

  
}
