
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { StudentService } from 'src/app/dataservice/student.service';

@Component({
  selector: 'app-view-sponsorstudent-details',
  templateUrl: './view-sponsorstudent-details.component.html',
  styleUrls: ['./view-sponsorstudent-details.component.css']
})
export class ViewSponsorstudentDetailsComponent implements OnInit {

  student_id:any;
  profileimageinput: boolean = true;
  profileimageshow: boolean = false;
  profileimage_url: any;
  profileimage_name: any;
  profile_image_api: any;
  profiledata = {
    address: '',
    dateofbirth: '',
    email: '',
    gender: '',
    mobile: '',
    name: '',
    last_name:'',
    referred_by:'',
    referred_contact: '',
    address_one:'',
    city:'',
    state:'',
    zip_code: '',
    fatherorguardian_name:'',
    parent_lastname:'',
    parent_age:'',
    fatherorgardian_mobile:'',
    parent_occupation: '',
    parent_address_one: '',
    parent_address_two: '',
    parent_city: '',
    parent_state: '',
    parent_zip_code: '',
    work_status:'',
    name_of_organizations:'',
    contact_of_organizations:'',
    organizations_address_one:'',
    organizations_address_two:'',
    organizations_city:'',
    organizations_state:'',
    organizations_pincode:'',
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
    study_duration:'',
    current_semester: '',
    join_date:'',
    transfer_option:'',
    bank_name:'',
    branch_name:'',
    bank_account_no:'',
    ifsc_code:'',
    dd_favouring:'',
    payment_type:'',
    due_date:'',
    why_need_sponsorship:''
  }
  fees_array = [];
  isShoworganizationdetails:boolean  = false;
  isShowrtgsorneft:boolean = false;
  isShowdd:boolean = false;
  constructor(private Activate: ActivatedRoute,private studentserv:StudentService,
    private SpinnerService: NgxSpinnerService,private myacser: MyaccountService, private toastr: ToastrService) {
      this.profile_image_api = this.myacser.getprofileimageAPI();
    this.Activate.queryParams.subscribe(res => {
      this.student_id = res.id;
      if(this.student_id){
        this.myacser.getdata('myaccount/' + res.id).then(async res => {
          if (res['status'] == 'success') {            console.log(res);
            let data = res['data'][0];
            let feesdata = res['data'];
            feesdata.forEach(d => {
this.fees_array.push({fees_type:d.fees_type,per_sem:d.fees_per_semester});
            });
            console.log(this.fees_array);
            this.profiledata.name = data.name;
            this.profiledata.last_name = data.last_name;
            this.profiledata.gender = data.gender;
            this.profiledata.dateofbirth = data.dateofbirth;
            this.profiledata.address = data.address_one+''+data.address_two;
            this.profiledata.email = data.email;
            this.profiledata.mobile = data.mobile;
            this.profiledata.zip_code = data.zip_code;
            this.profiledata.referred_by = data.referred_by;
            this.profiledata.referred_contact = data.referred_contact;
            this.profiledata.address = data.address_one +',' +data.address_two;
            this.profiledata.city = data.city;
            this.profiledata.state = data.state;
            this.profiledata.why_need_sponsorship = data.why_need_sponsorship;
            this.profiledata.fatherorguardian_name = data.fatherorguardian_name;
            this.profiledata.parent_lastname = data.parent_lastname;
            this.profiledata.parent_age = data.parent_age;
            this.profiledata.fatherorgardian_mobile = data.fatherorgardian_mobile;
            this.profiledata.parent_occupation = data.parent_occupation;
            this.profiledata.parent_address_one = data.parent_address_one;
            this.profiledata.parent_address_two = data.parent_address_two;
            this.profiledata.parent_city = data.parent_city;
            this.profiledata.parent_state = data.parent_state;
            this.profiledata.parent_zip_code = data.parent_zip_code;
            this.profiledata.work_status = data.work_status;
            if(data.work_status == 'working' || data.work_status == 'retired'){
              this.isShoworganizationdetails = true;
              this.profiledata.name_of_organizations = data.name_of_organizations;
            this.profiledata.contact_of_organizations = data.contact_of_organizations;
            this.profiledata.organizations_address_one = data.organizations_address_one;
            this.profiledata.organizations_address_two = data.organizations_address_two;
            this.profiledata.organizations_city = data.organizations_city;
            this.profiledata.organizations_state = data.organizations_state;
            this.profiledata.organizations_pincode = data.organizations_pincode;
            }else{
              this.isShoworganizationdetails = false;
            }
            
            this.profiledata.collegeofstudy = data.collegeofstudy;
            this.profiledata.college_phone = data.college_phone;
            this.profiledata.college_email = data.college_email;
            this.profiledata.college_address = data.college_address_one+','+data.college_address_two;
            this.profiledata.college_city = data.college_city;
            this.profiledata.college_state = data.college_state;
            this.profiledata.college_zip_code = data.college_zip_code;
            this.profiledata.contact_person = data.contact_person;
            this.profiledata.contact_person_mobile = data.contact_person_mobile;
            this.profiledata.academic_year = data.academic_year;
            this.profiledata.course_name = data.course_name;
            this.profiledata.study_duration = data.study_duration+' Years';
            this.profiledata.join_date = data.join_date;
            this.profiledata.transfer_option = data.transfer_option;
            if(data.transfer_option == 'RTGSORNEFT'){
              this.isShowrtgsorneft = true;
              this.isShowdd = false;
              this.profiledata.bank_name = data.bank_name;
            this.profiledata.branch_name = data.branch_name;
            this.profiledata.bank_account_no = data.bank_account_no;
            this.profiledata.ifsc_code = data.ifsc_code;
            }else if(data.transfer_option == 'DD'){
              this.isShowrtgsorneft = false;
              this.isShowdd = true;
              this.profiledata.dd_favouring = data.dd_favouring;
            }

            this.profiledata.payment_type = data.payment_type;
        this.profiledata.due_date = data.due_date;
            var profile_img = await this.urlToObject(data.profile_image);
        if(profile_img != null){
       
        this.profileimage_name = data.profile_image;
        this.profileimage_url = this.profile_image_api+''+data.profile_image;
        this.profileimageinput = false;
        this.profileimageshow = true;
        }else{
          this.profileimageinput = true;
          this.profileimageshow = false;
        }
          }
        }, error => {
          console.log(error);
          if (error['error']) {
            this.toastr.error(error['error'].message, 'Error', {
              progressBar: true
            });
            return;
          }
    
        })
      }
   });
  }

  ngOnInit(): void {
  }

  urlToObject = async (imageName) => {
    const response = await fetch((this.profile_image_api + imageName));
    if(response.ok) {
      const blob = await response.blob();
      // console.log(blob)
      // const file = new File([blob], imageName, {type: blob.type});
      return blob;
    } else {
      return null;
    }
  }

}
