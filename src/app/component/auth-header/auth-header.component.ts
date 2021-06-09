import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent implements OnInit {

  constructor(private ds:DataserviceService) { }

  ngOnInit(): void {
  }

  logout(){
this.ds.logout('admin');
  }

}
