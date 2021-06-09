import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
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
  myaccountForm: FormGroup;
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
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{ dates: [{ year: 1885, month: 1, day: 1 }, { year: 2011, month: 1, day: 1 }], styleClass: 'yoga' }],
    // disableUntil: {day:1,month: 1,year: 1985},
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
  };
  public myDatePickerOptions1: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{ dates: [{ year: 1885, month: 1, day: 1 }, { year: 2011, month: 1, day: 1 }], styleClass: 'yoga' }],
    // disableUntil: {day:1,month: 1,year: 1985},
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
  };
  fees_array = [];
  isShoworganizationdetails:boolean  = false;
  isShowrtgsorneft:boolean = false;
  isShowdd:boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,
    private myacser: MyaccountService,private ds:DataserviceService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.profile_image_api = this.myacser.getprofileimageAPI();
    if (this.logininfo == undefined) {
      this.router.navigateByUrl('/login')
      return;
    }
    this.myaccountForm = this.fb.group({
      id: [''],
      profile_image: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      fatherorguardian_name: ['', Validators.required],
      gender: ['', Validators.required],
      dateofbirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      fatherorgardian_mobile: ['', Validators.required],
      address_one: ['', Validators.required],
      address_two: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      collegeofstudy: ['', Validators.required],
      contact_person: ['', Validators.required],
      contact_person_mobile: ['', Validators.required],
      college_phone: ['', Validators.required],
      college_email: ['', [Validators.required, Validators.email]],
      college_address_one: ['', Validators.required],
      college_address_two: ['', Validators.required],
      college_city: ['', Validators.required],
      college_state: ['', Validators.required],
      college_zip_code: ['', Validators.required],
      course_name: ['', Validators.required],
      study_duration: ['', Validators.required],
      academic_year: ['', Validators.required],
      join_date: ['', Validators.required],
      role_type:[''],
      status: ['']
    });
    
    this.myacser.getdata('myaccount/' + this.logininfo['user_id']).then(async res => {
      if (res['status'] == 'success') {
        this.profileimageinput = false;
        this.profileimageshow = true;
        console.log(res);
        let data = res['data'][0];
        let feesdata = res['data'];
        feesdata.forEach(d => {
this.fees_array.push({fees_type:d.fees_type,per_sem: this.convertcurruncytype(d.fees_per_semester)});
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
        this.myaccountForm.controls['id'].setValue(data.id);
        var profile_img = await this.urlToObject(data.profile_image);
        if(profile_img != null){
        this.myaccountForm.get('profile_image').clearValidators();
        this.myaccountForm.get('profile_image').updateValueAndValidity();
        this.profileimage_name = data.profile_image;
        this.profileimage_url = this.profile_image_api+''+data.profile_image;
        this.profileimageinput = false;
        this.profileimageshow = true;
        }else{
          this.profileimageinput = true;
          this.profileimageshow = false;
        }
        this.myaccountForm.controls['name'].setValue(data.name);
        this.myaccountForm.controls['last_name'].setValue(data.last_name);
        this.myaccountForm.controls['fatherorguardian_name'].setValue(data.fatherorguardian_name);
        
        this.myaccountForm.controls['gender'].setValue(data.gender);
        this.myaccountForm.controls['email'].setValue(data.email);
        this.myaccountForm.controls['zip_code'].setValue(data.zip_code);
        this.myaccountForm.controls['mobile'].setValue(data.mobile);
        this.myaccountForm.controls['fatherorgardian_mobile'].setValue(data.fatherorgardian_mobile);
        this.myaccountForm.controls['address_one'].setValue(data.address_one);
        this.myaccountForm.controls['address_two'].setValue(data.address_two);
        this.myaccountForm.controls['city'].setValue(data.city);
        this.myaccountForm.controls['state'].setValue(data.state);
        this.myaccountForm.controls['contact_person'].setValue(data.contact_person);
        this.myaccountForm.controls['contact_person_mobile'].setValue(data.contact_person_mobile);
        this.myaccountForm.controls['college_phone'].setValue(data.college_phone);
        this.myaccountForm.controls['college_email'].setValue(data.college_email);
        this.myaccountForm.controls['college_address_one'].setValue(data.college_address_one);
        this.myaccountForm.controls['college_address_two'].setValue(data.college_address_two);
        this.myaccountForm.controls['college_city'].setValue(data.college_city);
        this.myaccountForm.controls['college_state'].setValue(data.college_state);
        this.myaccountForm.controls['college_zip_code'].setValue(data.college_zip_code);
        this.myaccountForm.controls['academic_year'].setValue(data.academic_year);
        this.myaccountForm.controls['collegeofstudy'].setValue(data.collegeofstudy);
        this.myaccountForm.controls['course_name'].setValue(data.course_name);
        this.myaccountForm.controls['study_duration'].setValue(data.study_duration);
        if (data.dateofbirth != null) {
          let dob = data.dateofbirth.split('-');
          let rplace = /^0+/;
          let dod = dob[0].replace(rplace, '');
          let dom = dob[1].replace(rplace, '');
          this.myaccountForm.controls['dateofbirth'].setValue({
            isRange: false, singleDate: {
              date: {
                year: dob[2],
                month: dom,
                day: dod
              }
            }
          });
        }

        if (data.join_date != null) {
          let job = data.join_date.split('-');
          let rplace = /^0+/;
          let dod = job[0].replace(rplace, '');
          let dom = job[1].replace(rplace, '');
          this.myaccountForm.controls['join_date'].setValue({
            isRange: false, singleDate: {
              date: {
                year: job[2],
                month: dom,
                day: dod
              }
            }
          });
        }
        this.myaccountForm.controls['role_type'].setValue(data.status);
        this.myaccountForm.controls['status'].setValue(data.status);
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

  fileProgress(fileInput: any) {
    console.log(fileInput)
    let fileData = fileInput.target.files[0];
    this.file = fileData;
    // let arr = fileData.split('/'); 
    console.log(this.file);
  }

  // convenience getter for easy access to form fields
  get c() { return this.myaccountForm.controls; }

  updateprofile() {
    this.submitted = true;
    if (this.myaccountForm.invalid) {
      return;
    } else {
      if (this.myaccountForm.value.id) {

        let dob = this.myaccountForm.value.dateofbirth;
if(typeof(dob) == 'object'){
        let pd = dob.singleDate.date;
        let d = (pd.day < 10 ? '0' : '') + (pd.day);
        let m = (pd.month < 10 ? '0' : '') + (pd.month);
        // console.log(dob);
        this.myaccountForm.controls['dateofbirth'].setValue(d + '-' + m + '-' + pd.year);
}

        let jod = this.myaccountForm.value.join_date;
        if(typeof(jod) == 'object'){
        let jdate = jod.singleDate.date;
        let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
        let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
        // console.log(dob);
        this.myaccountForm.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
        }
        const myFormData = new FormData();
        myFormData.append('id', this.myaccountForm.value.id);
        if (this.file == '') {

          myFormData.append('profile_image', this.profileimage_name);
        } else {
          myFormData.append('profile_image', this.file, this.file.name);
        }
        myFormData.append('name', this.myaccountForm.value.name);
        myFormData.append('last_name', this.myaccountForm.value.last_name);
        myFormData.append('fatherorguardian_name', this.myaccountForm.value.fatherorguardian_name);
        myFormData.append('gender', this.myaccountForm.value.gender);
        myFormData.append('dateofbirth', this.myaccountForm.value.dateofbirth);
        myFormData.append('email', this.myaccountForm.value.email);
        myFormData.append('mobile', this.myaccountForm.value.mobile);
        myFormData.append('fatherorgardian_mobile', this.myaccountForm.value.fatherorgardian_mobile);
        myFormData.append('address_one', this.myaccountForm.value.address_one);
        myFormData.append('address_two', this.myaccountForm.value.address_two);
        myFormData.append('city', this.myaccountForm.value.city);
        myFormData.append('state', this.myaccountForm.value.state);
        myFormData.append('zip_code', this.myaccountForm.value.zip_code);
        myFormData.append('collegeofstudy', this.myaccountForm.value.collegeofstudy);
        myFormData.append('contact_person', this.myaccountForm.value.contact_person);
        myFormData.append('contact_person_mobile', this.myaccountForm.value.contact_person_mobile);
        myFormData.append('college_phone', this.myaccountForm.value.college_phone);
        myFormData.append('college_email', this.myaccountForm.value.college_email);
        myFormData.append('college_address_one', this.myaccountForm.value.college_address_one);
        myFormData.append('college_address_two', this.myaccountForm.value.college_address_two);
        myFormData.append('college_city', this.myaccountForm.value.college_city);
        myFormData.append('college_state', this.myaccountForm.value.college_state);
        myFormData.append('college_zip_code', this.myaccountForm.value.college_zip_code);
        myFormData.append('course_name', this.myaccountForm.value.course_name);
        myFormData.append('study_duration', this.myaccountForm.value.study_duration);
        myFormData.append('academic_year', this.myaccountForm.value.academic_year);
        myFormData.append('join_date', this.myaccountForm.value.join_date);
        myFormData.append('role_type', this.myaccountForm.value.role_type);
        myFormData.append('status', this.myaccountForm.value.status);
        

        // this.ngxService.start();
        this.ds.apipostRecords('updatestudent', myFormData,true).then(res => {
          // this.ngxService.stop();
          if (res['status'] == 'success') {
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/student-profile');
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
    }
  }

  toggleEditProfile() {
    
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  editstudentdetails(){
    const navigationExtras = {
      queryParams: {
          id: this.logininfo['user_id']  
      }
  };
this.router.navigate(['/update-mydetails'], navigationExtras);
  }

  onDateChanged(event, text) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
    if (text == 'birth_date') {
      this.myaccountForm.controls['dateofbirth'].setValue(event.singleDate.formatted);
      let start_date = event['singleDate'].date;
      console.log(start_date.day, start_date.month, start_date.year)
      // this.myDatePickerOptions = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
      //    this.myDatePickerOptions1 = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
      if (Number(start_date.day) - 1 == 0) {
        let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
        this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
        this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
        this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
      } else {
        this.myDatePickerOptions.disableUntil.day = Number(start_date.day) - 1;
        this.myDatePickerOptions.disableUntil.month = Number(start_date.month);
        this.myDatePickerOptions.disableUntil.year = Number(start_date.year);
      }

    } else {
      this.myaccountForm.controls['join_date'].setValue(event.singleDate.formatted);
      let start_date = event['singleDate'].date;
      console.log(start_date.day, start_date.month, start_date.year)
      // this.myDatePickerOptions = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
      //    this.myDatePickerOptions1 = {
      //    dateRange: false,
      //    dateFormat: 'dd-mm-yyyy',
      //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
      //  };
      if (Number(start_date.day) - 1 == 0) {
        let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
        this.myDatePickerOptions1.disableUntil.day = actualDate.getDate();
        this.myDatePickerOptions1.disableUntil.month = actualDate.getMonth() + 1;
        this.myDatePickerOptions1.disableUntil.year = actualDate.getFullYear();
      } else {
        this.myDatePickerOptions1.disableUntil.day = Number(start_date.day) - 1;
        this.myDatePickerOptions1.disableUntil.month = Number(start_date.month);
        this.myDatePickerOptions1.disableUntil.year = Number(start_date.year);
      }
    }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  deleteprofileImage() {
    this.profileimageshow = false;
    this.profileimageinput = true;
    this.profileimage_url = '';
    this.myaccountForm.get('profile_image').setValidators(Validators.required);
    this.myaccountForm.get('profile_image').updateValueAndValidity();
    this.myacser.deleteblog('deleteprofileimage/' + this.profileimage_name).then(res => {
      if (res['status'] == 'success') {
        Swal.fire({
          title: 'Deleted',
          text: res['message'],
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.value) {

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl('/add-blog');
          }
        })

      }
    }, error => {
      let err = error['error'];
      if (error['status'] == 401) {
        if (err['status'] == 'faile') {
          Swal.fire({
            title: 'Info',
            text: err['message'],
            icon: 'info',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.value) {

            } else if (result.dismiss === Swal.DismissReason.cancel) {
              this.router.navigateByUrl('/register');
            }
          })
        }
      }
      console.log(error);
    })
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

}
