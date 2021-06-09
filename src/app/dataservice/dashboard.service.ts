import { Injectable } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private apiser: DataserviceService) { }

  getdata(service:any){
    return this.apiser.getmethod(service).then(res => res);
  }
}
