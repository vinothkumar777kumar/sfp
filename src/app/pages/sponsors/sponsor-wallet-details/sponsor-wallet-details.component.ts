import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import * as $ from 'jQuery';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-sponsor-wallet-details',
  templateUrl: './sponsor-wallet-details.component.html',
  styleUrls: ['./sponsor-wallet-details.component.css']
})
export class SponsorWalletDetailsComponent implements OnInit {
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
  emtytransationarray: boolean = false;
  transationarray = [];
  feesdata = [];
  feespaiddata = [];
  logininfo: any;
  revel_text;
  main_balance:any;
  constructor(private Activate: ActivatedRoute, private studentserv: StudentService,
    private router: Router, private sponsorserv: SponsorsService,private ds:DataserviceService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));

      this.sponsor_id = this.logininfo['user_id'];
      console.log(this.logininfo['user_id']);
      if (this.sponsor_id) {
        this.gettransactiondata(this.logininfo['user_id']);
      }

  
  }

  ngOnInit(): void {
  }

  gettransactiondata(sponsorid) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.studentserv.getdata('getsponsorswallettransactiondetails/'+sponsorid).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        let data = res['data'];
        this.main_balance = this.convertcurruncytype(data[0].opening_bal);
        this.transationarray = [];
        if (data != undefined && data != '' && data.length > 0) {
          console.log(data);
          data.forEach(s => {
            this.transationarray.push({
              id: s.id, amount: this.convertcurruncytype(s.amount), date: s.date,status:s.status})
          });
        } else {
          this.emtytransationarray = true;
        }
        this.dtTrigger.next();
        console.log(this.transationarray);

      }
    });
  }

  edittransaction(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-wallet-transation'], navigationExtras);
  }

  deletetransaction(data){
    Swal.fire({
      title: 'Delete',
      text: "Are you sure delete this transaction amount?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.sponsorserv.delete('deletesponsorwallet/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.transationarray = [];
               this.gettransactiondata(this.logininfo['user_id']);                  
          this.router.navigateByUrl('sponsor-wallet-details', { skipLocationChange: true }).then(() => {
            this.router.navigate(['sponsor-wallet-details']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('sponsor-wallet-details');
             }
           })
          }else if(res['status'] == "info"){
            Swal.fire({
              title: 'Info',
              text: res['message'],
              icon: 'info',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                                
           this.router.navigateByUrl('sponsor-wallet-details', { skipLocationChange: true }).then(() => {
             this.router.navigate(['sponsor-wallet-details']);
           });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.router.navigateByUrl('sponsor-wallet-details');
              }
            })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('sponsor-wallet-details');
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
