import { Component, OnInit, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sponsor-profile',
  templateUrl: './sponsor-profile.component.html',
  styleUrls: ['./sponsor-profile.component.css']
})
export class SponsorProfileComponent implements OnInit {
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
    email: '',
    gender: '',
    mobile: '',
    name: '',
    last_name:'',
    address_one:'',
    address_two:'',
    city:'',
    state:'',
    zip_code: ''
  }
  
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
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      address_one: ['', Validators.required],
      address_two: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip_code: ['', Validators.required],
      role_type:[''],
      status: ['']
    })
    this.myacser.getdata('myaccount/' + this.logininfo['user_id']).then(async res => {
      if (res['status'] == 'success') {
        this.profileimageinput = false;
        this.profileimageshow = true;
        console.log(res);
        let data = res['data'][0];
        this.profiledata.name = data.name;
        this.profiledata.last_name = data.last_name;
        this.profiledata.address_one = data.address_one;
        this.profiledata.address_two = data.address_two;
        this.profiledata.email = data.email;
        this.profiledata.mobile = data.mobile;
        this.profiledata.zip_code = data.zip_code;
        this.profiledata.city = data.city;
        this.profiledata.state = data.state;
        this.myaccountForm.controls['id'].setValue(data.sponsor_id);
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
        this.myaccountForm.controls['email'].setValue(data.email);
        this.myaccountForm.controls['zip_code'].setValue(data.zip_code);
        this.myaccountForm.controls['mobile'].setValue(data.mobile);
        this.myaccountForm.controls['address_one'].setValue(data.address_one);
        this.myaccountForm.controls['address_two'].setValue(data.address_two);
        this.myaccountForm.controls['city'].setValue(data.city);
        this.myaccountForm.controls['state'].setValue(data.state);
        // if (data.dateofbirth != null) {
        //   let dob = data.dateofbirth.split('-');
        //   let rplace = /^0+/;
        //   let dod = dob[0].replace(rplace, '');
        //   let dom = dob[1].replace(rplace, '');
        //   this.myaccountForm.controls['dateofbirth'].setValue({
        //     isRange: false, singleDate: {
        //       date: {
        //         year: dob[2],
        //         month: dom,
        //         day: dod
        //       }
        //     }
        //   });
        // }

        // if (data.join_date != null) {
        //   let job = data.join_date.split('-');
        //   let rplace = /^0+/;
        //   let dod = job[0].replace(rplace, '');
        //   let dom = job[1].replace(rplace, '');
        //   this.myaccountForm.controls['join_date'].setValue({
        //     isRange: false, singleDate: {
        //       date: {
        //         year: job[2],
        //         month: dom,
        //         day: dod
        //       }
        //     }
        //   });
        // }
        this.myaccountForm.controls['role_type'].setValue(data.role_type);
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

//         let dob = this.myaccountForm.value.dateofbirth;
// if(typeof(dob) == 'object'){
//         let pd = dob.singleDate.date;
//         let d = (pd.day < 10 ? '0' : '') + (pd.day);
//         let m = (pd.month < 10 ? '0' : '') + (pd.month);
//         // console.log(dob);
//         this.myaccountForm.controls['dateofbirth'].setValue(d + '-' + m + '-' + pd.year);
// }

        // let jod = this.myaccountForm.value.join_date;
        // if(typeof(jod) == 'object'){
        // let jdate = jod.singleDate.date;
        // let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
        // let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
        // // console.log(dob);
        // this.myaccountForm.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
        // }
        const myFormData = new FormData();
        myFormData.append('id', this.myaccountForm.value.id);
        if (this.file == '') {

          myFormData.append('profile_image', this.profileimage_name);
        } else {
          myFormData.append('profile_image', this.file, this.file.name);
        }
        myFormData.append('name', this.myaccountForm.value.name);
        myFormData.append('last_name', this.myaccountForm.value.last_name);
        myFormData.append('gender', this.myaccountForm.value.gender);
        
        myFormData.append('email', this.myaccountForm.value.email);
        myFormData.append('mobile', this.myaccountForm.value.mobile);
        myFormData.append('address_one', this.myaccountForm.value.address_one);
        myFormData.append('address_two', this.myaccountForm.value.address_two);
        myFormData.append('city', this.myaccountForm.value.city);
        myFormData.append('state', this.myaccountForm.value.state);
        myFormData.append('zip_code', this.myaccountForm.value.zip_code);
        myFormData.append('role_type', this.myaccountForm.value.role_type);
        myFormData.append('status', this.myaccountForm.value.status);
        

        // this.ngxService.start();
        this.ds.apipostRecords('updatsponsor', myFormData,true).then(res => {
          // this.ngxService.stop();
          if (res['status'] == 'success') {
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
                // this.router.navigateByUrl('/sponsor-profile');
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

  // onDateChanged(event, text) {
  //   // let {date, jsDate, formatted, epoc} = event.singleDate;
  //   // console.log(event['singleDate'])
  //   if (text == 'birth_date') {
  //     this.myaccountForm.controls['dateofbirth'].setValue(event.singleDate.formatted);
  //     let start_date = event['singleDate'].date;
  //     console.log(start_date.day, start_date.month, start_date.year)
  //     // this.myDatePickerOptions = {
  //     //    dateRange: false,
  //     //    dateFormat: 'dd-mm-yyyy',
  //     //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
  //     //  };
  //     //    this.myDatePickerOptions1 = {
  //     //    dateRange: false,
  //     //    dateFormat: 'dd-mm-yyyy',
  //     //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
  //     //  };
  //     if (Number(start_date.day) - 1 == 0) {
  //       let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
  //       this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
  //       this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
  //       this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
  //     } else {
  //       this.myDatePickerOptions.disableUntil.day = Number(start_date.day) - 1;
  //       this.myDatePickerOptions.disableUntil.month = Number(start_date.month);
  //       this.myDatePickerOptions.disableUntil.year = Number(start_date.year);
  //     }

  //   } else {
  //     this.myaccountForm.controls['join_date'].setValue(event.singleDate.formatted);
  //     let start_date = event['singleDate'].date;
  //     console.log(start_date.day, start_date.month, start_date.year)
  //     // this.myDatePickerOptions = {
  //     //    dateRange: false,
  //     //    dateFormat: 'dd-mm-yyyy',
  //     //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
  //     //  };
  //     //    this.myDatePickerOptions1 = {
  //     //    dateRange: false,
  //     //    dateFormat: 'dd-mm-yyyy',
  //     //    disableUntil: {day:start_date.day - 1,month: start_date.month,year: start_date.year}
  //     //  };
  //     if (Number(start_date.day) - 1 == 0) {
  //       let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
  //       this.myDatePickerOptions1.disableUntil.day = actualDate.getDate();
  //       this.myDatePickerOptions1.disableUntil.month = actualDate.getMonth() + 1;
  //       this.myDatePickerOptions1.disableUntil.year = actualDate.getFullYear();
  //     } else {
  //       this.myDatePickerOptions1.disableUntil.day = Number(start_date.day) - 1;
  //       this.myDatePickerOptions1.disableUntil.month = Number(start_date.month);
  //       this.myDatePickerOptions1.disableUntil.year = Number(start_date.year);
  //     }
  //   }

  // }

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

}
