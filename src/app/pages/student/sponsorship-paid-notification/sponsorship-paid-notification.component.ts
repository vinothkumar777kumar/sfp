import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sponsorship-paid-notification',
  templateUrl: './sponsorship-paid-notification.component.html',
  styleUrls: ['./sponsorship-paid-notification.component.css']
})
export class SponsorshipPaidNotificationComponent implements OnInit {

  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;
      @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  cardToggle = 'expanded';
  cardClose = 'open';
  fullCard: string;
  fullCardIcon: string;
  loadCard = false;
  isCardToggled = false;
  cardLoad: string;
  emptysponsorshippaiddetails:boolean = false;
  notificationdata = [];
  logininfo:any;
  constructor(private router:Router,private sponsorserv:SponsorsService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
      this.getnotificationdata();
     }

  ngOnInit(): void {
  }

  getnotificationdata(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.sponsorserv.getdata('getallnotificationdata/'+''+this.logininfo['user_id']).then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptysponsorshippaiddetails = true;
    }else{
      data.forEach(s => {
        this.notificationdata.push({student_name:s.name+' '+s.last_name,sponsor_name:s.sponsorfname+' '+s.sponsorlname,
        paydate:s.pay_date,paid_amt:s.paid});
      });
  
    }
    this.dtTrigger.next();
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

  ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
