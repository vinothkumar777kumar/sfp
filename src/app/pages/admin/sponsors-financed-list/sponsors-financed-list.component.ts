import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import * as $ from 'jQuery';
import { DataTableDirective } from 'angular-datatables';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { BLACK_ON_WHITE_CSS_CLASS } from '@angular/cdk/a11y/high-contrast-mode/high-contrast-mode-detector';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-sponsors-financed-list',
  templateUrl: './sponsors-financed-list.component.html',
  styleUrls: ['./sponsors-financed-list.component.css']
})
export class SponsorsFinancedListComponent implements OnInit {

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
  sponsor_id: any;
  emtysponsordetails: boolean = false;
  sponsordetails = [];
  transactiondata = [];
  feespaiddata = [];
  logininfo: any;
  revel_text;
  bank_bal:any;
  constructor(private Activate: ActivatedRoute, private studentserv: StudentService,
    private router: Router, private sponsorserv: SponsorsService,private ds:DataserviceService,
    private SpinnerService: NgxSpinnerService,private mas:MyaccountService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));

      this.sponsor_id = this.logininfo['user_id'];
      console.log(this.logininfo['user_id']);
      if (this.sponsor_id) {
        this.getallsponsordetails();
      }

  
  }

  ngOnInit(): void {
  }

  getallsponsordetails() {
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.studentserv.getdata('getsponsoralltransaction').then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        let data = res['data'];
        this.sponsordetails = [];
        if (data != undefined && data != '' && data.length > 0) {
          console.log(data);
          data.forEach(s => {
            this.sponsordetails.push({
              id: s.id, sponsor_id:s.sponsor_id,name: s.name+''+s.last_name,notconvrtamt:s.amount,
              amount: this.convertcurruncytype(s.amount),status:s.status,date:s.date,mobile:s.mobile})
          });
        } else {
          this.emtysponsordetails = true;
        }
        this.dtTrigger.next();
        console.log(this.sponsordetails);

      }
    });
  }

  

  viewtransactiondetails(data){
    this.studentserv.getdata('getsponsoralltransaction/' + data.id).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        var data = res['data'];
        this.transactiondata = [];
        if (data != undefined && data != '' && data.length > 0) {
          // this.emtysponsorstudent = false;
          console.log(data);
          data.forEach(f => {
            this.transactiondata.push({ id: f.id, amount: this.convertcurruncytype(f.amount), date: f.date });
          });

            (jQuery('#sponsortransactionmodal') as any).modal('show');
        } else {
          // this.emtysponsorstudent = true;
        }
        console.log(this.transactiondata);
        console.log(data);

      }
    });
  }

  approve(det){
    // if(status == 'approval'){
    Swal.fire({
      text: "Are You Sure Approved this financed?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        let data ={
          id:det.id,
          sponsor_id:det.sponsor_id,
          amount:det.notconvrtamt,
          status:'1'
        };
        this.SpinnerService.show();
        this.mas.postmethod('approvalsponsorfinanced',data).then(res => {
          this.SpinnerService.hide();
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
              //  this.studentsarray = [];
              //  this.getstudent_data();                  
          this.router.navigateByUrl('admin-dashboard', { skipLocationChange: true }).then(() => {
            this.router.navigate(['admin-dashboard']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('admin-dashboard');
             }
           })
          }
         },error=> {
          this.SpinnerService.hide();
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('admin-dashboard');
      }
    })
    
    // }
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

  viewbanktransaction(){
    this.studentserv.getdata('getbanktransaction').then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        var data = res['data'];
        var bank_data = res['bank_details'];
        this.bank_bal = this.convertcurruncytype(bank_data[0].bank_balance);
        this.transactiondata = [];
        if (data != undefined && data != '' && data.length > 0) {
          // this.emtysponsorstudent = false;
          console.log(data);
          data.forEach(f => {
            this.transactiondata.push({ id: f.id, name:f.name+' '+f.last_name,amount: this.convertcurruncytype(f.amount), date: f.date,status:f.status });
          });

            (jQuery('#banktransactionmodal') as any).modal('show');
        } else {
          // this.emtysponsorstudent = true;
        }
        console.log(this.transactiondata);
        console.log(data);

      }
    });
  }

  ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
