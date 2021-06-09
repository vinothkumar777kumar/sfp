import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class SponsorsService {

  constructor(private apiser: DataserviceService) { }

  postmethod(service:any,data:any,isFileupload:boolean) {
   
    return this.apiser.apipostRecords(service,data,isFileupload).then(res => res);
    
  }

  postjson(service:any,data:any) {
   
    return this.apiser.apipostRecords(service,data).then(res => res);
    
  }

  getdata(service:any){
    return this.apiser.getmethod(service).then(res => res);
  }

  delete(id:any){
    return this.apiser.getmethod(id).then(res => res);
  }
}
