import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { StudentService } from 'src/app/dataservice/student.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-add-sponsors',
  templateUrl: './add-sponsors.component.html',
  styleUrls: ['./add-sponsors.component.css']
})
export class AddSponsorsComponent implements OnInit {
  addsponsorForm:FormGroup;
  submitted = false;
  sponsor_id:any;
  title = 'Add Sponsor';
  submit_action = 'Save';
  profileimageinput: boolean = true;
  profileimageshow: boolean = false;
  profileimage_url: any;
  file: any = [];
  profileimage_name: any;
  profile_image_api: any;
  studentsarray = [];
  dropdownSettings:IDropdownSettings = {};
  constructor(private fb:FormBuilder,private sponsorserv:SponsorsService,private router:Router,
    private Activate: ActivatedRoute,private myacser: MyaccountService) {
      this.profile_image_api = this.myacser.getprofileimageAPI();
      this.addsponsorForm = this.fb.group({
        id:[''],
        profile_image: ['',Validators.required],
        name:['',Validators.required],
        last_name: ['',Validators.required],
        mobile:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        role_type:[2],
        address_one: ['',Validators.required],
        address_two: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip_code: ['',Validators.required],
        status:[1],
        student:['',Validators.required]
      });

   
      this.Activate.queryParams.subscribe(res => {
        this.sponsor_id = res.id;
        if(this.sponsor_id){
          
          this.title = "Edit Sponsor";
          this.submit_action = "Update";
          this.getsponsordata(this.sponsor_id)
        }else{
          this.title = 'Add Sponsor';
          this.submit_action = "Save";
          // this.getallstudent();
        }
     
      });
     }

  ngOnInit(): void {
    this.sponsorserv.getdata('getallstudent').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data']; 
    console.log(data);
    let students = [];
      data.forEach(s => {
        students.push({id:s.id,name:s.name+' '+s.last_name});
      }); 
      this.studentsarray = students;
      console.log(this.studentsarray);
    }     
            
    },error => {
      console.log(error);

     
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll:true,
      // selectAllText: 'Select All',
      // unSelectAllText: 'UnSelect All',
      // itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  getallstudent(){
       
  }

  getsponsordata(sponsorid){
    this.sponsorserv.getdata('editsponsor/'+''+sponsorid).then(async res => {
      console.log(res);
      if(res['status'] == 'success'){
        // let student_data = res['allstudent'];
        // let all_students = [];
        // student_data.forEach(s => {
        //   all_students.push({id:s.id,name:s.name+' '+s.last_name});
        //     }); 
        //     this.studentsarray = all_students;
        //     this.dropdownSettings = {
        //       singleSelection: false,
        //       idField: 'id',
        //       textField: 'name',
        //       enableCheckAll:true,
        //       // selectAllText: 'Select All',
        //       // unSelectAllText: 'UnSelect All',
        //       itemsShowLimit: 3,
        //       allowSearchFilter: true
        //     };
        let data = res['data'][0];
        let manager_data = res['data'];
        console.log(data);
        console.log(manager_data);
        let students = [];
        console.log(this.studentsarray);
        manager_data.forEach(t => {
          // if(t.student_id != null){
      // let stud = this.studentsarray.filter(s => s.id == t.student_id);
        
          students.push({id:t.student_id,name:t.studentfname+' '+t.studentlastname});
        // }
      })
      console.log(students);
      console.log(this.studentsarray);
        this.addsponsorForm.controls['id'].setValue(data.sponsor_id);
        var profile_img = await this.urlToObject(data.profile_image);
        console.log(profile_img);
        if(profile_img != null){
            this.addsponsorForm.get('profile_image').clearValidators();
        this.addsponsorForm.get('profile_image').updateValueAndValidity();
        this.profileimage_name = data.profile_image;
        this.profileimage_url = this.profile_image_api+''+data.profile_image;
        this.profileimageinput = false;
        this.profileimageshow = true;
        }else{
          this.profileimageinput = true;
          this.profileimageshow = false;
        }
        this.addsponsorForm.controls['name'].setValue(data.sponsorfname); 
        this.addsponsorForm.controls['student'].setValue(students); 
        this.addsponsorForm.controls['last_name'].setValue(data.sponsorlname);       
        this.addsponsorForm.controls['mobile'].setValue(data.mobile);
        this.addsponsorForm.controls['email'].setValue(data.email);
        this.addsponsorForm.controls['address_one'].setValue(data.address_one);
      this.addsponsorForm.controls['address_two'].setValue(data.address_two);
      this.addsponsorForm.controls['city'].setValue(data.city);
      this.addsponsorForm.controls['state'].setValue(data.state);
      this.addsponsorForm.controls['zip_code'].setValue(data.zip_code);
        this.addsponsorForm.controls['status'].setValue(data.status);
        this.addsponsorForm.controls['role_type'].setValue(data.role_type);
      }
    });
  }

  fileProgress(fileInput: any) {
    console.log(fileInput)
    let fileData = fileInput.target.files[0];
    this.file = fileData;
    // let arr = fileData.split('/'); 
    console.log(this.file);
  }

      // convenience getter for easy access to form fields
      get c() { return this.addsponsorForm.controls; }

      addsponsor(){
        this.submitted = true;
        if(this.addsponsorForm.invalid){
          return;
        }else{
          if(this.addsponsorForm.value.id){
            const myFormData = new FormData();
            myFormData.append('id', this.addsponsorForm.value.id);
        if (this.file == '') {

          myFormData.append('profile_image', this.profileimage_name);
        } else {
          myFormData.append('profile_image', this.file, this.file.name);
        }
        myFormData.append('name', this.addsponsorForm.value.name);
        myFormData.append('last_name', this.addsponsorForm.value.last_name);
       
        myFormData.append('email', this.addsponsorForm.value.email);
        myFormData.append('mobile', this.addsponsorForm.value.mobile);
        myFormData.append('address_one', this.addsponsorForm.value.address_one);
        myFormData.append('address_two', this.addsponsorForm.value.address_two);
        myFormData.append('city', this.addsponsorForm.value.city);
        myFormData.append('state', this.addsponsorForm.value.state);
        myFormData.append('zip_code', this.addsponsorForm.value.zip_code);
        myFormData.append('role_type', this.addsponsorForm.value.role_type);
        myFormData.append('status', this.addsponsorForm.value.status);
        myFormData.append('student', JSON.stringify(this.addsponsorForm.value.student));
            // this.ngxService.start();
            this.sponsorserv.postmethod('updatsponsor',myFormData,true).then(res => {
              // this.ngxService.stop();
              if(res['status'] == 'success'){
                Swal.fire({
                  title: 'Updated',
                  text: res['message'],
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.value) {
                    this.router.navigateByUrl('/sponsors-list');
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // this.router.navigateByUrl('/register');
                  }
                })
              }
        },error => {
          // this.ngxService.stop();
          console.log(error);
        });
          }else{
            const myFormData = new FormData();
            myFormData.append('id', this.addsponsorForm.value.id);
        if (this.file == '') {

          myFormData.append('profile_image', this.profileimage_name);
        } else {
          myFormData.append('profile_image', this.file, this.file.name);
        }
        myFormData.append('name', this.addsponsorForm.value.name);
        myFormData.append('last_name', this.addsponsorForm.value.last_name);
       
        myFormData.append('email', this.addsponsorForm.value.email);
        myFormData.append('mobile', this.addsponsorForm.value.mobile);
        myFormData.append('address_one', this.addsponsorForm.value.address_one);
        myFormData.append('address_two', this.addsponsorForm.value.address_two);
        myFormData.append('city', this.addsponsorForm.value.city);
        myFormData.append('state', this.addsponsorForm.value.state);
        myFormData.append('zip_code', this.addsponsorForm.value.zip_code);
        myFormData.append('role_type', this.addsponsorForm.value.role_type);
        myFormData.append('status', this.addsponsorForm.value.status);
        myFormData.append('student', JSON.stringify(this.addsponsorForm.value.student));
            // this.ngxService.start();
            this.sponsorserv.postmethod('addsponsor',myFormData,true).then(res => {
              // this.ngxService.stop();
              if(res['status'] == 'success'){
                Swal.fire({
                  title: 'Success',
                  text: res['message'],
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.value) {
                    this.router.navigateByUrl('/sponsors-list');
                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    // this.router.navigateByUrl('/register');
                  }
                })
              }
        },error => {
          // this.ngxService.stop();
          console.log(error);
        });
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

      deleteprofileImage() {
        this.profileimageshow = false;
        this.profileimageinput = true;
        this.profileimage_url = '';
        this.addsponsorForm.get('profile_image').setValidators(Validators.required);
        this.addsponsorForm.get('profile_image').updateValueAndValidity();
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

      onSelectAll(eve){

      }
      
      onItemSelect(e){
        //  let data = this.teamsarray.filter(t => t.id == e.id);
        // console.log(data);
        // let td = data[0];
        // if(td.team_order == '1'){
        //   this.isshowfirsteam = true;
        //   this.addmanagerForm.get('sponsored_by').setValidators(Validators.required);
        //   this.addmanagerForm.get('sponsored_by').updateValueAndValidity();
        // }else{
        //   this.isshowfirsteam = false;
        //   this.addmanagerForm.get('sponsored_by').clearValidators();
        //   this.addmanagerForm.get('sponsored_by').updateValueAndValidity();
        // }
      
      }
      
      onItemDeSelect(e){
        // let data = this.teamsarray.filter(t => t.id == e.id);
        // console.log(data);
        // let td = data[0];
        // if(td.team_order == '1'){
        //   this.isshowfirsteam = false;
        //   this.addmanagerForm.get('sponsored_by').clearValidators();
        //   this.addmanagerForm.get('sponsored_by').updateValueAndValidity();
        // }else{
        //   this.isshowfirsteam = false;
        //   this.addmanagerForm.get('sponsored_by').clearValidators();
        //   this.addmanagerForm.get('sponsored_by').updateValueAndValidity();
        // }
      }
      onCheck(e){
      
      }



}
