import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-student-sponsor',
  templateUrl: './view-student-sponsor.component.html',
  styleUrls: ['./view-student-sponsor.component.css']
})
export class ViewStudentSponsorComponent implements OnInit {
  profileimageinput: boolean = true;
  profileimageshow: boolean = false;
  profileimage_url: any;
  file: any = [];
  profileimage_name: any;
  profile_image_api: any;
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  submitted = false;
  editAbout = true;
  editAboutIcon = 'icofont-edit';
  logininfo: any;
  public date = new Date();
  profiledata = {
    address: '',
    dateofbirth: '',
    email: '',
    gender: '',
    mobile: '',
    fullName: '',
    fatherorguardian_name:'',
    fatherorgardian_mobile:'',
    address_one:'',
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
    study_duration:'',
    join_date:''
  }
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private myacser: MyaccountService,private ds:DataserviceService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
      this.profile_image_api = this.myacser.getprofileimageAPI();
      if (this.logininfo == undefined) {
        this.router.navigateByUrl('/login')
        return;
      }
      this.myacser.getdata('getstudentsponsordata/' + this.logininfo['user_id']).then(async res => {
        if (res['status'] == 'success') {
          this.profileimageinput = false;
          this.profileimageshow = true;
          console.log(res);
          let data = res['data'][0];
          this.profiledata.fullName = data.sponsorfname+' '+data.sponsorlname;
          this.profiledata.fatherorguardian_name = data.fatherorguardian_name;
          this.profiledata.gender = data.gender;
          this.profiledata.dateofbirth = data.dateofbirth;
          this.profiledata.address = data.address;
          this.profiledata.email = data.email;
          this.profiledata.mobile = data.mobile;
          this.profiledata.zip_code = data.zip_code;
          this.profiledata.fatherorgardian_mobile = data.fatherorgardian_mobile;
          this.profiledata.address = data.address_one +',' +data.address_two;
          this.profiledata.city = data.city;
          this.profiledata.state = data.state;
          this.profiledata.collegeofstudy = data.collegeofstudy;
          this.profiledata.college_phone = data.college_phone;
          this.profiledata.college_email = data.college_email;
          this.profiledata.college_address = data.collegcollege_address_one+','+data.college_address_two;
          this.profiledata.college_city = data.college_city;
          this.profiledata.college_state = data.college_state;
          this.profiledata.college_zip_code = data.college_zip_code;
          this.profiledata.contact_person = data.contact_person;
          this.profiledata.contact_person_mobile = data.contact_person_mobile;
          this.profiledata.academic_year = data.academic_year;
          this.profiledata.course_name = data.course_name;
          this.profiledata.study_duration = data.study_duration+' Years';
          this.profiledata.join_date = data.join_date;
  
  
          
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
