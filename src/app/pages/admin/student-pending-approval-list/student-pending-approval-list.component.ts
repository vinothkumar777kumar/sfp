import { Component, Input, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-student-pending-approval-list',
  templateUrl: './student-pending-approval-list.component.html',
  styleUrls: ['./student-pending-approval-list.component.css']
})
export class StudentPendingApprovalListComponent implements OnInit {
  pendingapprovalstudentsarray = [];
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
  emptystudentsarray:boolean = false;
  selectedstudentsponsorsarray = [];
  constructor(private router:Router,private studenser:StudentService,private studentserv: StudentService,
    private mas:MyaccountService,private SpinnerService: NgxSpinnerService) {
    this.getpendingapprovalstudent_data();
   }

  ngOnInit(): void {
  }

  getpendingapprovalstudent_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.SpinnerService.show();
    this.studenser.getdata('getallpendingapprovalstudents').then(res => {
      this.SpinnerService.hide();
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptystudentsarray = true;
    }else{
      let unique = {};
      let distinct = [];
      data.forEach(s => {
        if(s.role_type == '3'){
        if (!unique[s.id]) {
          
        this.pendingapprovalstudentsarray.push({id:s.id,name:s.name,dateofbirth:s.dateofbirth,email:s.email,
          gender:s.gender,dob:s.dateofbirth,collegeofstudy:s.collegeofstudy,mobile:s.mobile,study_duration:s.study_duration,
          yearly_fees:s.yearly_fees,zip_code:s.zip_code,address:s.address,status:s.status,course_name:s.course_name,
          is_sponsored_student:s.is_sponsored_student
        });
        unique[s.id] = true;
      }
      }
      });
      console.log(this.pendingapprovalstudentsarray);
      // this.dtTrigger.next();
    
    }
    this.dtTrigger.next();
            }
    },error => {
      this.SpinnerService.hide();
      console.log(error);
     if(error['error']){
      // this.toastr.error(error['error'].message, 'Error', {
      //   progressBar:true
      // });
      return;
     }
     
    })
  }

  changeapprovalstatus(studentdata,status){
    if(status == 'approval'){
    Swal.fire({
      text: "Are You Sure Approved this student?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        let data ={
          student_id:studentdata.id
        };
        this.SpinnerService.show();
        this.mas.postmethod('approvalstudent/'+studentdata.id,data).then(res => {
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
          this.router.navigateByUrl('student-pending-approval-list', { skipLocationChange: true }).then(() => {
            this.router.navigate(['student-pending-approval-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('student-pending-approval-list');
             }
           })
          }
         },error=> {
          this.SpinnerService.hide();
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('student-pending-approval-list');
      }
    })
    
    }else if(status == 'pending'){
      Swal.fire({
        text: "Are You Sure pending this student?",
        icon: 'info',
        showCancelButton: true,
        cancelButtonText:'No',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          let data ={
            student_id:studentdata.id
          };
          this.SpinnerService.show();
          this.mas.postmethod('pendingstudent/'+studentdata.id,data).then(res => {
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
            this.router.navigateByUrl('student-pending-approval-list', { skipLocationChange: true }).then(() => {
              this.router.navigate(['student-pending-approval-list']);
            });
               } else if (result.dismiss === Swal.DismissReason.cancel) {
                 this.router.navigateByUrl('student-pending-approval-list');
               }
             })
            }
           },error=> {
            this.SpinnerService.hide();
             console.log(error);
           })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigateByUrl('student-pending-approval-list');
        }
      })
    }else if(status == 'reject'){
      Swal.fire({
        text: "Are You Sure Reject this student?",
        icon: 'info',
        showCancelButton: true,
        cancelButtonText:'No',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {
          let data ={
            student_id:studentdata.id
          };
          this.SpinnerService.show();
          this.mas.postmethod('rejectstudent/'+studentdata.id,data).then(res => {
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
            this.router.navigateByUrl('student-pending-approval-list', { skipLocationChange: true }).then(() => {
              this.router.navigate(['student-pending-approval-list']);
            });
               } else if (result.dismiss === Swal.DismissReason.cancel) {
                 this.router.navigateByUrl('student-pending-approval-list');
               }
             })
            }
           },error=> {
            this.SpinnerService.hide();
             console.log(error);
           })
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.router.navigateByUrl('student-pending-approval-list');
        }
      })
    }
  }

  view_student_sponsor(data){
    this.SpinnerService.show();
    this.studentserv.getdata('getstudentassignedsponsordata/' + data.id).then(async res => {
      this.SpinnerService.hide();
      console.log(res);
      if (res['status'] == 'success') {
        let sponsordata = res['studentassignsponsor'];
        this.selectedstudentsponsorsarray = [];
        if (sponsordata != undefined && sponsordata != '' && sponsordata.length > 0) {
          // this.emtysponsorstudent = false;
          console.log(sponsordata);
          sponsordata.forEach(s => {                
            this.selectedstudentsponsorsarray.push({id:s.id,name:s.sponsorfname+' '+s.sponsorlname,email:s.email,mobile:s.mobile});
          // }
        });
            (jQuery('#sponsormodal') as any).modal('show');
        } else {
          (jQuery('#sponsormodal') as any).modal('show');
          // this.emtysponsorstudent = true;
        }
        console.log(this.selectedstudentsponsorsarray);
        console.log(sponsordata);







      }
    });
  }

  assign_sponsor(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/sponsor-assignto-student'], navigationExtras);
  }

   ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
