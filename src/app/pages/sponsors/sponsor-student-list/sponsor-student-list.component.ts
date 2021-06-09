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
  selector: 'app-sponsor-student-list',
  templateUrl: './sponsor-student-list.component.html',
  styleUrls: ['./sponsor-student-list.component.css']
})
export class SponsorStudentListComponent implements OnInit {

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
  emtysponsorstudent: boolean = false;
  sponsorstudentsarray = [];
  feesdata = [];
  feespaiddata = [];
  logininfo: any;
  revel_text;
  constructor(private Activate: ActivatedRoute, private studentserv: StudentService,
    private router: Router, private sponsorserv: SponsorsService,private ds:DataserviceService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));

      this.sponsor_id = this.logininfo['user_id'];
      console.log(this.logininfo['user_id']);
      if (this.sponsor_id) {
        this.getfeesdata(this.logininfo['user_id']);
      }

  
  }

  ngOnInit(): void {
  }

  getfeesdata(sponsorid) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.studentserv.getdata('getsponsorstudent/' +  sponsorid).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        let data = res['data'];
        this.sponsorstudentsarray = [];
        if (data != undefined && data != '' && data.length > 0) {
          console.log(data);
          data.forEach(s => {
            this.sponsorstudentsarray.push({
              id: s.id, name: s.name + '' + s.last_name, mobile: s.mobile, email: s.email,revel_status:s.revel_sponsor_details
            })
          });
          this.dtTrigger.next();
        } else {
          this.emtysponsorstudent = true;
        }
        console.log(this.sponsorstudentsarray);

      }
    });
  }

  view_fees_details(data) {
    this.studentserv.getdata('getstudentfeesdata/' + data.id).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        var data = res['data'];
        this.feesdata = [];
        if (data != undefined && data != '' && data.length > 0) {
          // this.emtysponsorstudent = false;
          console.log(data);
          data.forEach(f => {
            this.feesdata.push({ id: f.id, fees_type: f.fees_type, fees: f.fees_per_semester });
          });

            (jQuery('#studenfeesmodal') as any).modal('show');
        } else {
          // this.emtysponsorstudent = true;
        }
        console.log(this.feesdata);
        console.log(data);

      }
    });
  }

  paysponsorship(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-sponsorship-paid'], navigationExtras);
  }

  viewpaiddetails(data){
//     const navigationExtras = {
//       queryParams: {
//           id: data.id  
//       }
//   };
// this.router.navigate(['/view-paid-details'], navigationExtras);
this.studentserv.getdata('getpaidsponsorshipdata/' + data.id).then(async res => {
  console.log(res);
  if (res['status'] == 'success') {
    var data = res['data'];
    this.feespaiddata = [];
    if (data != undefined && data != '' && data.length > 0) {
      // this.emtysponsorstudent = false;
      console.log(data);
      data.forEach(f => {
        this.feespaiddata.push({ id: f.id, pay_date: f.pay_date, paid: f.paid });
      });

        (jQuery('#feespaidmodal') as any).modal('show');
    } else {
      (jQuery('#feespaidmodal') as any).modal('show');
      // this.emtysponsorstudent = true;
    }
    console.log(this.feespaiddata);
    console.log(data);

  }
});
  }

  revel_request(d){
    let revel_request = '';
    if(d.revel_status === '1'){
      revel_request = 'notrevel';
    }else if(d.revel_status === '0'){
      revel_request = 'revel';
    }
    let data = {
      student_id:d.id,
      sponsor_id:this.logininfo['user_id'],
      revel_request:revel_request
    }
    // this.ngxService.start();
    this.ds.apipostRecords('sponsorrevelrequest', data,false).then(res => {
      // this.ngxService.stop();
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Success',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {
            this.router.navigateByUrl('/sponsor-profile');
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

  viewstudentdetails(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/view-sponsorstudent-details'], navigationExtras);
  }

  ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
