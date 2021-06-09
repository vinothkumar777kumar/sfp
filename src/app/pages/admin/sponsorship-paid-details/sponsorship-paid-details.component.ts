import { Component, Input, OnInit, ViewChild, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sponsorship-paid-details',
  templateUrl: './sponsorship-paid-details.component.html',
  styleUrls: ['./sponsorship-paid-details.component.css']
})
export class SponsorshipPaidDetailsComponent implements OnInit {
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
  sponsorshippaiddetails = [];
  logininfo:any;
  constructor(private router:Router,private sponsorserv:SponsorsService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
      this.getsponsorship_paid_data();
     }

  ngOnInit(): void {
  }

  getsponsorship_paid_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.sponsorserv.getdata('getsponsorshippaiddata').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptysponsorshippaiddetails = true;
    }else{
      data.forEach(s => {
        this.sponsorshippaiddetails.push({student_name:s.name+' '+s.last_name,sponsor_name:s.sponsorfname+' '+s.sponsorlname,
        paydate:s.pay_date,paid_amt:this.convertcurruncytype(s.paid)});
      });
      this.dtTrigger.next();
  
    }
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
