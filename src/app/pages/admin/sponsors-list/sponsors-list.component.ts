import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.css']
})
export class SponsorsListComponent implements OnInit {
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
  emptysponsorarray:boolean = false;
  sponsorsarray = [];
  transactiondata = [];
  constructor(private router:Router,private sponsorserv:SponsorsService, private studentserv: StudentService) { 
    this.getsponsors_data();
  }

  ngOnInit(): void {
  }

  getsponsors_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.sponsorserv.getdata('getallsponsors').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptysponsorarray = true;
    }else{
      data.forEach(s => {
        this.sponsorsarray.push({id:s.id,name:s.name,email:s.email,bal: this.convertcurruncytype(s.opening_bal),mobile:s.mobile,address:s.address_one,
          address_two:s.address_two
        });
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

  edit_sponsor(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-sponsors'], navigationExtras);
  }

  changepassword(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/sponsor-change-password'], navigationExtras);
  }

  delete_sponsor(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this sponsor?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.sponsorserv.delete('deletesponsor/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.sponsorsarray = [];
               this.getsponsors_data();                  
          this.router.navigateByUrl('sponsors-list', { skipLocationChange: true }).then(() => {
            this.router.navigate(['sponsors-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('sponsors-list');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('sponsors-list');
      }
    })
    
  
  }

  view_sponsord_student(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/sponsor-student'], navigationExtras);
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
