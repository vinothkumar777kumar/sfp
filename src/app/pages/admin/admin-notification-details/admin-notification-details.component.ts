import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-notification-details',
  templateUrl: './admin-notification-details.component.html',
  styleUrls: ['./admin-notification-details.component.css']
})
export class AdminNotificationDetailsComponent implements OnInit {

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
  notificationarray = [];
  profile_image_api:any;
  constructor(private router:Router,private sponsorserv:SponsorsService,private ds:DataserviceService) {
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
    this.sponsorserv.getdata('getrevelnotification').then(res => {
      console.log(res);
      if(res['status'] == 'success'){     
        var notification = res['data'];
      if(notification != undefined && notification != '' && notification.length > 0){
notification.forEach(n => {
  let msg = '';
  if(n.revel_status === '1'){
    msg = 'Hi admin revel sponsor details to '+n.student_firstname+''+n.student_lastname;
  }else{
    msg = 'Hi admin not revel sponsor details to '+n.student_firstname+''+n.student_lastname;
  }
console.log(n.created_on);
const dateTimeAgo = moment(n.created_on).fromNow();
console.log(dateTimeAgo); //> 6 minutes ago
this.notificationarray.push({id:n.student_id,student_name:n.student_firstname+''+n.student_lastname,
sponsor_name:n.sponsor_firstname+' '+n.sponsor_lastname,message:msg,
revel_status:n.revel_status})
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

  approve(d){
    let data = {
      student_id:d.id,
      revel_status:d.revel_status
    }
    // this.ngxService.start();
    this.ds.apipostRecords('studentrevelstatusupdate', data,false).then(res => {
      // this.ngxService.stop();
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Success',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/admin-dashboard');
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // this.router.navigateByUrl('/register');
          }
        })
      }
    }, error => {
      // this.ngxService.stop();
      console.log(error);
    });
  }

  ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}

