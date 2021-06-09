import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
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
  studentsarray = [];
  feespaiddata = [];
  studendata = {
    name:'',
    gender:'',
    dateofbirth:'',
    join_date:'',
    fatherorguardian_name:'',
  fatherorgardian_mobile:'',
address:'',  
   mobile:'',
   email: '',
    city:'',
    state:'',
    zip_code: '',
    collegeofstudy:'',
    college_phone:'',
    college_email:'',
    college_address:'',
    college_city:'',
    college_state:'',
    college_zip_code:'',
    contact_person:'',
    contact_person_mobile:'',
    academic_year:'',
    course_name:'',
    study_duration:''
  }
  constructor(private router:Router,private studenser:StudentService,private studentserv: StudentService) {
    this.getstudent_data();
   }

  ngOnInit(): void {
  }

  toggleCard(event) {
    this.cardToggle = this.cardToggle === 'collapsed' ? 'expanded' : 'collapsed';
  }

  closeCard(event) {
    this.cardClose = this.cardClose === 'closed' ? 'open' : 'closed';
  }

  fullScreen(event) {
    this.fullCard = this.fullCard === 'full-card' ? '' : 'full-card';
    this.fullCardIcon = this.fullCardIcon === 'icofont-resize' ? '' : 'icofont-resize';
  }

  appCardRefresh(event) {
    this.loadCard = true;
    this.cardLoad = 'card-load';
    setTimeout( () => {
      this.cardLoad = '';
      this.loadCard = false;
    }, 3000);
  }

  addstudent(){
    this.router.navigateByUrl('/add-student');
  }

  getstudent_data(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.studenser.getdata('getallstudent').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data'];
    if(data == ''){
this.emptystudentsarray = true;
    }else{
      data.forEach(s => {
        this.studentsarray.push({id:s.id,name:s.name,dateofbirth:s.dateofbirth,email:s.email,
          gender:s.gender,dob:s.dateofbirth,collegeofstudy:s.collegeofstudy,mobile:s.mobile,study_duration:s.study_duration,
          yearly_fees:s.yearly_fees,zip_code:s.zip_code,address:s.address,status:s.status,course_name:s.course_name
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

  edit_student(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/add-student'], navigationExtras);
  }

  changepassword(data){
    const navigationExtras = {
      queryParams: {
          id: data.id  
      }
  };
this.router.navigate(['/sponsor-change-password'], navigationExtras);
  }

  delete_student(data){
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this student?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText:'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.studenser.delete('deletestudent/'+data.id).then(res => {
          if(res['status'] == "success"){
           Swal.fire({
             title: 'Success',
             text: res['message'],
             icon: 'success',
             confirmButtonText: 'OK',
           }).then((result) => {
             if (result.value) {
               this.studentsarray = [];
               this.getstudent_data();                  
          this.router.navigateByUrl('students-list', { skipLocationChange: true }).then(() => {
            this.router.navigate(['students-list']);
          });
             } else if (result.dismiss === Swal.DismissReason.cancel) {
               this.router.navigateByUrl('students-list');
             }
           })
          }
         },error=> {
           console.log(error);
         })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('students-list');
      }
    })
    
  
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

      viewstudentdetails(data){
        // this.router.navigateByUrl('student-profile');
        // return;
        const navigationExtras = {
          queryParams: {
              id: data.id  
          }
      };
    this.router.navigate(['/view-student-details'], navigationExtras);
    return;
        this.studentserv.getdata('editstudent/'+data.id).then(async res => {
          console.log(res);
          if(res['status'] == 'success'){
            let data = res['data'];
            console.log(data);
           
            
           
            this.studendata.name =  data.name+' '+data.last_name;
            this.studendata.gender =  data.gender;
             this.studendata.dateofbirth =  data.dateofbirth;
             this.studendata.join_date =  data.join_date;
             this.studendata.fatherorguardian_name =  data.fatherorguardian_name;
             this.studendata.fatherorgardian_mobile = data.fatherorgardian_mobile;
             this.studendata.address = data.address_one+' '+data.address_two;       
             this.studendata.mobile = data.mobile;
             this.studendata.email = data.email;
             this.studendata.mobile = data.mobile;
             this.studendata.zip_code = data.zip_code;
             this.studendata.fatherorgardian_mobile = data.fatherorgardian_mobile;
             this.studendata.city = data.city;
             this.studendata.state = data.state;
             this.studendata.collegeofstudy = data.collegeofstudy;
             this.studendata.college_phone = data.college_phone;
             this.studendata.college_email = data.college_email;
             this.studendata.college_address = data.college_address_one+','+data.college_address_two;
             this.studendata.college_city = data.college_city;
             this.studendata.college_state = data.college_state;
             this.studendata.college_zip_code = data.college_zip_code;
             this.studendata.contact_person = data.contact_person;
             this.studendata.contact_person_mobile = data.contact_person_mobile;
             this.studendata.academic_year = data.academic_year;
             this.studendata.course_name = data.course_name;
             this.studendata.study_duration = data.study_duration;
             this.studendata.join_date = data.join_date;
            (jQuery('#studentmodal') as any).modal('show');
          }
        });
      }

      revel_request(data){
        
      }

      paysponsorship(data){
        const navigationExtras = {
          queryParams: {
              id: data.id  
          }
      };
    this.router.navigate(['/admin-sponsorship-paid'], navigationExtras);
      }

      ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
