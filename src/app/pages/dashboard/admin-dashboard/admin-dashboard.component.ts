import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dataservice/dashboard.service';


declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css',
  '../../../../assets/icon/svg-animated/svg-weather.css']
})
export class AdminDashboardComponent implements OnInit {
 
  studentscount = 0;
  sponsorscount = 0;
  pending_approval_count = 0;
  bank_bal = 0;
  role_type:any
  logininfo:any;
  constructor(private dashboardserv:DashboardService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.role_type = this.logininfo['role_type'];
    this.getsponsors_data();
  }

  ngOnInit() {
   
  }

  getsponsors_data(){
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5
    // }
    this.dashboardserv.getdata('getdashboarddata').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    this.studentscount =  res['students_count'];
    this.sponsorscount =  res['sponsors_count'];
    this.pending_approval_count = res['student_pendingapproval_count'];
    this.bank_bal = this.convertcurruncytype(res['bank_balance']);
    
            }
    },error => {
      console.log(error);
     if(error['error']){
      // this.toastr.error(error['error'].message, 'Error', {
      //   progressBar:true
      // });
      return;
     }
     
    })
  }

  convertcurruncytype(amount){
    var x=amount;
    x=x.toString();
    var lastThree = x.substring(x.length-3);
    var otherNumbers = x.substring(0,x.length-3);
    if(otherNumbers != '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
    // alert(res);
  }

}




