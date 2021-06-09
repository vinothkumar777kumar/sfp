import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { StudentService } from 'src/app/dataservice/student.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { MatStepper } from '@angular/material/stepper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  isShowwordmaxlengtherror:boolean = false;
  addstudentForm:FormGroup;
  submitted = false;
  parent_submitted = false;
  col_submitted = false;
  fees_submitted = false;
  public date = new Date(); 
  student_id:any;
  title = 'Add Student';
  submit_action = 'Save';
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
    // disableUntil: {day:1,month: 1,year: 1985},
    disableSince:{year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1}
  };
  public myDatePickerOptions1: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{ dates: [{ year: 1885, month: 1, day: 1 }, { year: 2011, month: 1, day: 1 }], styleClass: 'yoga' }],
    // disableUntil: {day:1,month: 1,year: 1985},
    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 }
  };

  public myDatePickerOptions2: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{ dates: [{ year: 1885, month: 1, day: 1 }, { year: 2011, month: 1, day: 1 }], styleClass: 'yoga' }],
    // disableUntil: {day: this.date.getDate(),month: this.date.getMonth(),year: this.date.getFullYear()}
  };
  profileimageinput: boolean = true;
  profileimageshow: boolean = false;
  profileimage_url: any;
  file: any = [];
  profileimage_name: any;
  profile_image_api: any;

  isLinear = true;
  personalDetailsFormGroup: FormGroup;
  parentDetailsFormGroup: FormGroup;
  collegeDetailsFormGroup:FormGroup;
  addfeesForm:FormGroup;
  isShoworganizationdetails:boolean = false;
  wordCount: any;

  @ViewChild("text") text: ElementRef;
  words: any;

  rtgsorneft:boolean = false;
  dd:boolean = false;
  transfer_option = 'RTGSORNEFT';
  isShowrtgsorneft:boolean = true;
  isShowdd:boolean = false;
  constructor(private fb:FormBuilder,private studentserv:StudentService,private router:Router,
    private Activate: ActivatedRoute,private myacser: MyaccountService,private toastr:ToastrService,
    private SpinnerService: NgxSpinnerService) { 
      this.profile_image_api = this.myacser.getprofileimageAPI();
    this.addstudentForm = this.fb.group({
      id:[''],
      profile_image: ['',Validators.required],
      name:['',Validators.required],
      last_name: ['',Validators.required],
      fatherorguardian_name: [''],
      gender:[''],
      dateofbirth:[''],
      mobile:[''],
      fatherorgardian_mobile: [''],
      email:['',[Validators.required,Validators.email]],
      address_one: [''],
      address_two: [''],
      city: [''],
      state: [''],
      zip_code: [''],
      collegeofstudy:[''],
      contact_person: [''],
      contact_person_mobile: [''],
      college_phone: [''],
      college_email: ['', [Validators.email]],
      college_address_one: [''],
      college_address_two: [''],
      college_city: [''],
      college_state: [''],
      college_zip_code: [''],
      course_name:[''],
      study_duration:[''],
      academic_year: [''],
      join_date: [''],
      role_type:[3],
      status:[1],
    });
    this.Activate.queryParams.subscribe(res => {
      this.student_id = res.id;
      if(this.student_id){
        
        this.title = "Edit Student";
        this.submit_action = "Update";
        this.studentserv.getdata('editstudent/'+res.id).then(async res => {
          console.log(res);
          if(res['status'] == 'success'){
            let data = res['data'][0];
            console.log(data);
          //  student this.personalDetailsFormGroupl details
            this.personalDetailsFormGroup.controls['id'].setValue(data.id);
            var profile_img = await this.urlToObject(data.profile_image);
        if(profile_img != null){
            this.personalDetailsFormGroup.get('profile_image').clearValidators();
        this.personalDetailsFormGroup.get('profile_image').updateValueAndValidity();
        this.profileimage_name = data.profile_image;
        this.profileimage_url = this.profile_image_api+''+data.profile_image;
        this.profileimageinput = false;
        this.profileimageshow = true;
        }else{
          this.profileimageinput = true;
          this.profileimageshow = false;
        }
            this.personalDetailsFormGroup.controls['name'].setValue(data.name);
            this.personalDetailsFormGroup.controls['last_name'].setValue(data.last_name);
            this.personalDetailsFormGroup.controls['gender'].setValue(data.gender);            
          if(data.dateofbirth != null && data.dateofbirth != ''){
            let dob = data.dateofbirth.split('-');
          let rplace = /^0+/;
          let dod = dob[0].replace(rplace,'');
          let dom = dob[1].replace(rplace,'');
          // alert(Number(dod) - 1 +''+'date');
            // if (Number(dod) - 1 == 0) {
            //   let actualDate = new Date(Number(new Date(dob[2] + "-" + dom + "-" + dod)) - 1);
            //   this.myDatePickerOptions.disableUntil.day = actualDate.getDate();
            //   this.myDatePickerOptions.disableUntil.month = actualDate.getMonth() + 1;
            //   this.myDatePickerOptions.disableUntil.year = actualDate.getFullYear();
            // } else {
              
            //   console.log(Number(dod) - 1,'date');
            //   this.myDatePickerOptions.disableUntil.day = Number(dod) - 1;
            //   this.myDatePickerOptions.disableUntil.month = Number(dom);
            //   this.myDatePickerOptions.disableUntil.year = Number(dob[2]);
            // }
            this.personalDetailsFormGroup.controls['dateofbirth'].setValue({isRange: false, singleDate: {date: { 
              year: dob[2], 
              month: dom, 
              day: dod
            }}});
          }

            this.personalDetailsFormGroup.controls['mobile'].setValue(data.mobile);
            this.personalDetailsFormGroup.controls['email'].setValue(data.email);
            this.personalDetailsFormGroup.controls['address_one'].setValue(data.address_one);
            this.personalDetailsFormGroup.controls['address_two'].setValue(data.address_two);
            this.personalDetailsFormGroup.controls['city'].setValue(data.city);
            this.personalDetailsFormGroup.controls['state'].setValue(data.state);
             // this.addstudentForm.controls['yearly_fees'].setValue(data.yearly_fees);
             this.personalDetailsFormGroup.controls['zip_code'].setValue(data.zip_code);
             // this.addstudentForm.controls['college_address'].setValue(data.college_address);
             this.personalDetailsFormGroup.controls['referred_by'].setValue(data.referred_by);
             this.personalDetailsFormGroup.controls['referred_contact'].setValue(data.referred_contact);
             this.personalDetailsFormGroup.controls['role_type'].setValue(data.role_type);
             this.personalDetailsFormGroup.controls['status'].setValue(data.status);
             
            //  parents details
            this.parentDetailsFormGroup.controls['fatherorguardian_name'].setValue(data.fatherorguardian_name);
            this.parentDetailsFormGroup.controls['parent_lastname'].setValue(data.parent_lastname);
            this.parentDetailsFormGroup.controls['parent_age'].setValue(data.parent_age);
            this.parentDetailsFormGroup.controls['fatherorguardian_name'].setValue(data.fatherorguardian_name);
            this.parentDetailsFormGroup.controls['fatherorgardian_mobile'].setValue(data.fatherorgardian_mobile);
            this.parentDetailsFormGroup.controls['parent_occupation'].setValue(data.parent_occupation);
            this.parentDetailsFormGroup.controls['parent_address_one'].setValue(data.parent_address_one);
            this.parentDetailsFormGroup.controls['parent_address_two'].setValue(data.parent_address_two);
            this.parentDetailsFormGroup.controls['parent_city'].setValue(data.parent_city);
            this.parentDetailsFormGroup.controls['parent_state'].setValue(data.parent_state);
             this.parentDetailsFormGroup.controls['parent_zip_code'].setValue(data.parent_zip_code);
             this.parentDetailsFormGroup.controls['work_status'].setValue(data.work_status);
             this.parentDetailsFormGroup.controls['why_need_sponsorship'].setValue(data.why_need_sponsorship);
             if(data.work_status == 'working' || data.work_status == 'retired'){
               this.isShoworganizationdetails = true;
               this.parentDetailsFormGroup.controls['name_of_organizations'].setValue(data.name_of_organizations);
               this.parentDetailsFormGroup.controls['contact_of_organizations'].setValue(data.contact_of_organizations);
               this.parentDetailsFormGroup.controls['organizations_address_one'].setValue(data.organizations_address_one);
               this.parentDetailsFormGroup.controls['organizations_address_two'].setValue(data.organizations_address_two);
               this.parentDetailsFormGroup.controls['organizations_city'].setValue(data.organizations_city);
               this.parentDetailsFormGroup.controls['organizations_state'].setValue(data.organizations_state);
               this.parentDetailsFormGroup.controls['organizations_pincode'].setValue(data.organizations_pincode);
               this.parentDetailsFormGroup.get('name_of_organizations').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('name_of_organizations').updateValueAndValidity();
               this.parentDetailsFormGroup.get('contact_of_organizations').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('contact_of_organizations').updateValueAndValidity();
               this.parentDetailsFormGroup.get('organizations_address_one').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('organizations_address_one').updateValueAndValidity();
               this.parentDetailsFormGroup.get('organizations_address_two').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('organizations_address_two').updateValueAndValidity();
               this.parentDetailsFormGroup.get('organizations_city').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('organizations_city').updateValueAndValidity();
               this.parentDetailsFormGroup.get('organizations_state').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('organizations_state').updateValueAndValidity();
               this.parentDetailsFormGroup.get('organizations_pincode').setValidators(Validators.required);
               this.parentDetailsFormGroup.get('organizations_pincode').updateValueAndValidity();
             }else{
              this.isShoworganizationdetails = false;
              this.parentDetailsFormGroup.get('name_of_organizations').clearValidators();
              this.parentDetailsFormGroup.get('name_of_organizations').updateValueAndValidity();
              this.parentDetailsFormGroup.get('contact_of_organizations').clearValidators();
              this.parentDetailsFormGroup.get('contact_of_organizations').updateValueAndValidity();
              this.parentDetailsFormGroup.get('organizations_address_one').clearValidators();
              this.parentDetailsFormGroup.get('organizations_address_one').updateValueAndValidity();
              this.parentDetailsFormGroup.get('organizations_address_two').clearValidators();
              this.parentDetailsFormGroup.get('organizations_address_two').updateValueAndValidity();
              this.parentDetailsFormGroup.get('organizations_city').clearValidators();
              this.parentDetailsFormGroup.get('organizations_city').updateValueAndValidity();
              this.parentDetailsFormGroup.get('organizations_state').clearValidators();
              this.parentDetailsFormGroup.get('organizations_state').updateValueAndValidity();
              this.parentDetailsFormGroup.get('organizations_pincode').clearValidators();
              this.parentDetailsFormGroup.get('organizations_pincode').updateValueAndValidity();
             }

            //  college details
            this.collegeDetailsFormGroup.controls['collegeofstudy'].setValue(data.collegeofstudy);
            this.collegeDetailsFormGroup.controls['contact_person'].setValue(data.contact_person);
            this.collegeDetailsFormGroup.controls['contact_person_mobile'].setValue(data.contact_person_mobile);
            this.collegeDetailsFormGroup.controls['college_phone'].setValue(data.college_phone);
            this.collegeDetailsFormGroup.controls['college_email'].setValue(data.college_email);
            this.collegeDetailsFormGroup.controls['college_address_one'].setValue(data.college_address_one);
            this.collegeDetailsFormGroup.controls['college_address_two'].setValue(data.college_address_two);
            this.collegeDetailsFormGroup.controls['college_city'].setValue(data.college_city);
            this.collegeDetailsFormGroup.controls['college_state'].setValue(data.college_state);
            this.collegeDetailsFormGroup.controls['college_zip_code'].setValue(data.college_zip_code);
            this.collegeDetailsFormGroup.controls['academic_year'].setValue(data.academic_year);
            console.log(data.join_date);
          if (data.join_date != null && data.join_date != '') {
            let job = data.join_date.split('-');
            let rplace = /^0+/;
            let dod = job[0].replace(rplace, '');
            let dom = job[1].replace(rplace, '');
            this.collegeDetailsFormGroup.controls['join_date'].setValue({
              isRange: false, singleDate: {
                date: {
                  year: job[2],
                  month: dom,
                  day: dod
                }
              }
            });
          }
            this.collegeDetailsFormGroup.controls['course_name'].setValue(data.course_name);
            this.collegeDetailsFormGroup.controls['study_duration'].setValue(data.study_duration);
            this.collegeDetailsFormGroup.controls['current_semester'].setValue(data.current_semester);
              // bank details
              this.transfer_option = data.transfer_option;
          if(data.transfer_option == 'RTGSORNEFT'){
            this.isShowrtgsorneft = true;
            this.isShowdd = false;
            $('#rtgsorneft').prop('checked',true);
      $('#dd').prop('checked',false);
          this.collegeDetailsFormGroup.controls['bank_name'].setValue(data.bank_name);
          this.collegeDetailsFormGroup.controls['branch_name'].setValue(data.branch_name);
          this.collegeDetailsFormGroup.controls['ifsc_code'].setValue(data.ifsc_code);
          this.collegeDetailsFormGroup.controls['bank_account_no'].setValue(data.bank_account_no);
          }else if(data.transfer_option == 'DD'){
            this.isShowrtgsorneft = false;
            this.isShowdd = true;
            $('#rtgsorneft').prop('checked',false);
      $('#dd').prop('checked',true);
            this.collegeDetailsFormGroup.controls['dd_favouring'].setValue(data.dd_favouring);
          }

          this.collegeDetailsFormGroup.controls['payment_type'].setValue(data.payment_type);
          console.log(data.due_date);
          if (data.due_date != null && data.due_date != '') {
            console.log(data.due_date);
            let sdd = data.due_date.split('-');
            let rplace = /^0+/;
            let dd = sdd[0].replace(rplace, '');
            let dm = sdd[1].replace(rplace, '');
            this.collegeDetailsFormGroup.controls['due_date'].setValue({
              isRange: false, singleDate: {
                date: {
                  year: sdd[2],
                  month: dm,
                  day: dd
                }
              }
            });
          }
           
            // fees details
            let feesdata = res['data'];
//             feesdata.forEach(d => {
// this.fees_array.push({fees_type:d.fees_type,per_sem:d.fees_per_semester});
//             });
            console.log(res['data'].length);
            if(res['data'] != undefined && res['data'] != '' && res['data'].length > 0){
            let fees_control_rem = this.addfeesForm.get('feestype_array') as FormArray;
            for(let i = fees_control_rem.length-1; i >= 0; i--) {
              fees_control_rem.removeAt(i)
      }
            console.log(res);
              
              // let data = res['data'];
              // console.log(data);
          
          let fees_control = this.addfeesForm.get('feestype_array') as FormArray;
          feesdata.forEach(p => {
            fees_control.push(
              this.fb.group({
                student_id: [data.id],
                fees_type: [p.fees_type],
                fees_per_semester: [p.fees_per_semester]
              })
            )
          })
          
        
       
              
            
          }
          }
        });
      }else{
        this.title = 'Add Student';
        this.submit_action = "Save";
      }
   
    });
  }

  ngOnInit(): void {
    this.personalDetailsFormGroup = this.fb.group({
      id:[''],
      profile_image: ['',Validators.required],
      name:['',Validators.required],
      last_name: ['',Validators.required],
      gender:['',Validators.required],
      dateofbirth:['',Validators.required],
      mobile:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      address_one: ['',Validators.required],
      address_two: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      zip_code: ['',Validators.required],
      referred_by:[],
      referred_contact:[],
      role_type:[3],
      status:[1],
    });
    this.parentDetailsFormGroup = this.fb.group({
      fatherorguardian_name: ['',Validators.required],
      parent_lastname:['',Validators.required],
      parent_age:['',Validators.required],
      fatherorgardian_mobile: ['',Validators.required],
      parent_occupation:[''],
      parent_address_one:['',Validators.required],
      parent_address_two:['',Validators.required],
      parent_city:['',Validators.required],
      parent_state:['',Validators.required],
      parent_zip_code:['',Validators.required],
      work_status:['',Validators.required],
      name_of_organizations:[''],
      contact_of_organizations:[''],
      organizations_address_one:[''],
      organizations_address_two:[''],
      organizations_city:[''],
      organizations_state:[''],
      organizations_pincode:[''],
      why_need_sponsorship:['',[Validators.required]]
    });
    this.collegeDetailsFormGroup = this.fb.group({
      collegeofstudy:['',Validators.required],
      contact_person: ['',Validators.required],
      contact_person_mobile: ['',Validators.required],
      college_phone: ['',Validators.required],
      college_email: ['', [Validators.required,Validators.email]],
      college_address_one: ['',Validators.required],
      college_address_two: ['',Validators.required],
      college_city: ['',Validators.required],
      college_state: ['',Validators.required],
      college_zip_code: ['',Validators.required],
      course_name:['',Validators.required],
      study_duration:['',Validators.required],
      academic_year: ['',Validators.required],
      join_date: ['',Validators.required],
      current_semester:[],
      bank_name:['',Validators.required],
      branch_name:['',Validators.required],
      ifsc_code:['',Validators.required],
      bank_account_no:['',Validators.required],
      dd_favouring:[],
      payment_type:['',Validators.required],
      due_date:['',Validators.required]
    });
    this.addfeesForm = this.fb.group({
      feestype_array: new FormArray([
        this.feestypes()
      ])
    })
    // this.addstudentForm.controls['dateofbirth'].setValue({isRange: false, singleDate: {date: { 
    //   year: this.date.getFullYear(), 
    //   month: this.date.getMonth()+1, 
    //   day: this.date.getDate()
    // }}});
    // if (Number(this.date.getDate()) - 1 == 0 || Number(this.date.getDate()) + 1 == 32) {
    //   let actualDate = new Date();
    //   let cd = new Date(actualDate);
    // cd.setDate(cd.getDate() - 1);
    //   // alert(cd.getDate())
    //   // alert(actualDate.getMonth() + 1);
    //   // alert(actualDate.getFullYear());
    //   this.myDatePickerOptions.disableUntil.day = cd.getDate();
    //   this.myDatePickerOptions.disableUntil.month = cd.getMonth() + 1;
    //   this.myDatePickerOptions.disableUntil.year = cd.getFullYear();
    // } else {
    //   this.myDatePickerOptions.disableUntil.day = Number(this.date.getDate()) - 1;
    //   this.myDatePickerOptions.disableUntil.month = Number(this.date.getMonth() + 1);
    //   this.myDatePickerOptions.disableUntil.year = Number(this.date.getFullYear());
    // }
  }
  submit(){
    console.log(this.personalDetailsFormGroup.value);
    console.log(this.parentDetailsFormGroup.value);
}

onFileSelected(){
  
}

feestypes() {
  return this.fb.group({
    fees_type: ['', Validators.required],
    fees_per_semester:['',Validators.required]
  });

 
}

addmorefees() {
  let product_control = this.addfeesForm.get('feestype_array') as FormArray;
  product_control.push(this.feestypes());
}

close_control(i){
  console.log(i);
  let c = this.addfeesForm.get('feestype_array') as FormArray;
  let controls = c.controls;
  console.log(controls)
  c.removeAt(i);
}

gotocollegedetailsform(stepper: MatStepper){
  this.submitted = true;
  // this.parent_submitted = true;
  stepper.next();
  console.log(this.personalDetailsFormGroup.value);
}
gotofeesform(stepper: MatStepper){
  this.col_submitted = true;
  // this.fees_submitted = true;
  if(this.transfer_option == 'RTGSORNEFT'){
    this.collegeDetailsFormGroup.controls['dd_favouring'].setValue('');
  }else if(this.transfer_option == 'DD'){
    this.collegeDetailsFormGroup.controls['bank_name'].setValue('');
    this.collegeDetailsFormGroup.controls['branch_name'].setValue('');
    this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
    this.collegeDetailsFormGroup.controls['ifsc_code'].setValue('');
    this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
  }
  stepper.next();
 
}

gotopersonaldetailsform(stepper: MatStepper){
  // this.submitted = true;
  this.parent_submitted = true;
  // this.col_submitted = true;
  // this.fees_submitted = true;
  this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
  this.words = this.wordCount ? this.wordCount.length : 0;
  console.log(this.words);
  
  if(this.words > 150){
    console.log(this.words);
    // this.word_max_error_msg = "Description Must be Maximum 150 words.";
    this.isShowwordmaxlengtherror = true;
    console.log(this.isShowwordmaxlengtherror);
  // console.log(this.word_max_error_msg);
    return false;
  }else{
    this.isShowwordmaxlengtherror = false;
    stepper.next();
  }
  console.log(this.personalDetailsFormGroup.value);
}
  
  fileProgress(fileInput: any) {
    console.log(fileInput)
    let fileData = fileInput.target.files[0];
    this.file = fileData;
    // let arr = fileData.split('/'); 
    console.log(this.file);
  }

    // convenience getter for easy access to form fields
    get c() { return this.personalDetailsFormGroup.controls; }
    get p() { return this.parentDetailsFormGroup.controls; }
    get col() { return this.collegeDetailsFormGroup.controls; }
    get f() { return this.addfeesForm.controls; }

    savestudentdetails(){
      this.fees_submitted = true;
  // this.parent_submitted = true;
  // this.col_submitted = true;
  // this.fees_submitted = true;
  if(this.addfeesForm.invalid){
    return false;
  }else{
  if(this.personalDetailsFormGroup.value.id){
    if(this.personalDetailsFormGroup.value.dateofbirth){
      let dob = this.personalDetailsFormGroup.value.dateofbirth;
      if(typeof(dob) == 'object'){
      let pd = dob.singleDate.date;
  let d= (pd.day < 10 ? '0' : '')+(pd.day);
  let m = (pd.month < 10 ? '0' : '')+(pd.month);
  // console.log(dob);
      this.personalDetailsFormGroup.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);
      }
    }

    let jod = this.collegeDetailsFormGroup.value.join_date;
    if(typeof(jod) == 'object'){
    let jdate = jod.singleDate.date;
    let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
    let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
    // console.log(dob);
    this.collegeDetailsFormGroup.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
    }

    let dud = this.collegeDetailsFormGroup.value.due_date;
      if(typeof(dud) == 'object'){
      let dudate = dud.singleDate.date;
      let dd = (dudate.day < 10 ? '0' : '') + (dudate.day);
      let dm = (dudate.month < 10 ? '0' : '') + (dudate.month);
      // console.log(dob);
      this.collegeDetailsFormGroup.controls['due_date'].setValue(dd + '-' + dm + '-' + dudate.year);
      }

    const myFormData = new FormData();
    // personal details
    myFormData.append('id', this.personalDetailsFormGroup.value.id);
    if (this.file == '') {

      myFormData.append('profile_image', this.profileimage_name);
    } else {
      myFormData.append('profile_image', this.file, this.file.name);
    }
    myFormData.append('name', this.personalDetailsFormGroup.value.name);
    myFormData.append('last_name', this.personalDetailsFormGroup.value.last_name);
    myFormData.append('gender', this.personalDetailsFormGroup.value.gender);
    myFormData.append('dateofbirth', this.personalDetailsFormGroup.value.dateofbirth);
    myFormData.append('email', this.personalDetailsFormGroup.value.email);
    myFormData.append('mobile', this.personalDetailsFormGroup.value.mobile);
    myFormData.append('status', this.personalDetailsFormGroup.value.status);
    myFormData.append('address_one', this.personalDetailsFormGroup.value.address_one);
    myFormData.append('address_two', this.personalDetailsFormGroup.value.address_two);
    myFormData.append('city', this.personalDetailsFormGroup.value.city);
    myFormData.append('state', this.personalDetailsFormGroup.value.state);
    myFormData.append('zip_code', this.personalDetailsFormGroup.value.zip_code);
    myFormData.append('referred_by', this.personalDetailsFormGroup.value.referred_by);
    myFormData.append('referred_contact', this.personalDetailsFormGroup.value.referred_contact);
    myFormData.append('role_type', this.personalDetailsFormGroup.value.role_type);

    // parentdetails
    myFormData.append('fatherorgardian_mobile', this.parentDetailsFormGroup.value.fatherorgardian_mobile);
    myFormData.append('fatherorguardian_name', this.parentDetailsFormGroup.value.fatherorguardian_name);
    myFormData.append('parent_lastname', this.parentDetailsFormGroup.value.parent_lastname);
    myFormData.append('parent_age', this.parentDetailsFormGroup.value.parent_age);
    myFormData.append('parent_occupation', this.parentDetailsFormGroup.value.parent_occupation);
    myFormData.append('parent_address_one', this.parentDetailsFormGroup.value.parent_address_one);
    myFormData.append('parent_address_two', this.parentDetailsFormGroup.value.parent_address_two);
    myFormData.append('parent_city', this.parentDetailsFormGroup.value.parent_city);
    myFormData.append('parent_state', this.parentDetailsFormGroup.value.parent_state);
    myFormData.append('parent_zip_code', this.parentDetailsFormGroup.value.parent_zip_code);
    myFormData.append('work_status', this.parentDetailsFormGroup.value.work_status);
    myFormData.append('name_of_organizations', this.parentDetailsFormGroup.value.name_of_organizations);
    myFormData.append('contact_of_organizations', this.parentDetailsFormGroup.value.contact_of_organizations);
    myFormData.append('organizations_address_one', this.parentDetailsFormGroup.value.organizations_address_one);
    myFormData.append('organizations_address_two', this.parentDetailsFormGroup.value.organizations_address_two);
    myFormData.append('organizations_city', this.parentDetailsFormGroup.value.organizations_city);
    myFormData.append('organizations_state', this.parentDetailsFormGroup.value.organizations_state);
    myFormData.append('organizations_pincode', this.parentDetailsFormGroup.value.organizations_pincode);
    myFormData.append('why_need_sponsorship', this.parentDetailsFormGroup.value.why_need_sponsorship);

    // college details
    myFormData.append('collegeofstudy', this.collegeDetailsFormGroup.value.collegeofstudy);
    myFormData.append('contact_person', this.collegeDetailsFormGroup.value.contact_person);
    myFormData.append('contact_person_mobile', this.collegeDetailsFormGroup.value.contact_person_mobile);
    myFormData.append('college_phone', this.collegeDetailsFormGroup.value.college_phone);
    myFormData.append('college_email', this.collegeDetailsFormGroup.value.college_email);
    myFormData.append('college_address_one', this.collegeDetailsFormGroup.value.college_address_one);
    myFormData.append('college_address_two', this.collegeDetailsFormGroup.value.college_address_two);
    myFormData.append('college_city', this.collegeDetailsFormGroup.value.college_city);
    myFormData.append('college_state', this.collegeDetailsFormGroup.value.college_state);
    myFormData.append('college_zip_code', this.collegeDetailsFormGroup.value.college_zip_code);
    myFormData.append('course_name', this.collegeDetailsFormGroup.value.course_name);
    myFormData.append('study_duration', this.collegeDetailsFormGroup.value.study_duration);
    myFormData.append('academic_year', this.collegeDetailsFormGroup.value.academic_year);
    myFormData.append('current_semester', this.collegeDetailsFormGroup.value.current_semester);
    myFormData.append('join_date', this.collegeDetailsFormGroup.value.join_date);
    myFormData.append('transfer_option', this.transfer_option);
    if(this.transfer_option == 'RTGSORNEFT'){
      myFormData.append('bank_name', this.collegeDetailsFormGroup.value.bank_name);
    myFormData.append('branch_name', this.collegeDetailsFormGroup.value.branch_name);
    myFormData.append('ifsc_code', this.collegeDetailsFormGroup.value.ifsc_code);
    myFormData.append('bank_account_no', this.collegeDetailsFormGroup.value.bank_account_no);
    myFormData.append('dd_favouring', '');
      // this.collegeDetailsFormGroup.controls['dd_favouring'].setValue('');
    }else if(this.transfer_option == 'DD'){
      myFormData.append('bank_name', '');
    myFormData.append('branch_name', '');
    myFormData.append('ifsc_code', '');
    myFormData.append('bank_account_no', '');
    myFormData.append('dd_favouring', this.collegeDetailsFormGroup.value.dd_favouring);
      // this.collegeDetailsFormGroup.controls['bank_name'].setValue('');
      // this.collegeDetailsFormGroup.controls['branch_name'].setValue('');
      // this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
      // this.collegeDetailsFormGroup.controls['ifsc_code'].setValue('');
      // this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
    }
    myFormData.append('due_date', this.collegeDetailsFormGroup.value.due_date);
    myFormData.append('payment_type', this.collegeDetailsFormGroup.value.payment_type);

    // fees details
    
      let fd = this.addfeesForm.controls['feestype_array'].value;
      var erro_count = 0;
      fd.forEach(d => {
        if(d.fees_per_semester == 0){
          erro_count ++;
        }
      });
      console.log(erro_count);
      if(erro_count > 0){
        this.toastr.info("Fees per semester should be greater than zero" , 'Info', {
          progressBar:true
        });
        return;
      }
      
      myFormData.append('fees_type',JSON.stringify(this.addfeesForm.controls['feestype_array'].value));
        this.SpinnerService.show();
        this.studentserv.postmethod('updatestudent',myFormData,true).then(res => {
          this.SpinnerService.hide();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/students-list');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      this.SpinnerService.hide();
      console.log(error);
    });
  } else{
      if(this.personalDetailsFormGroup.value.dateofbirth){
        let dob = this.personalDetailsFormGroup.value.dateofbirth;
        if(typeof(dob) == 'object'){
        let pd = dob.singleDate.date;
    let d= (pd.day < 10 ? '0' : '')+(pd.day);
    let m = (pd.month < 10 ? '0' : '')+(pd.month);
    // console.log(dob);
        this.personalDetailsFormGroup.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);
        }
      }

      let jod = this.collegeDetailsFormGroup.value.join_date;
      if(typeof(jod) == 'object'){
      let jdate = jod.singleDate.date;
      let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
      let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
      // console.log(dob);
      this.collegeDetailsFormGroup.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
      }

      let dud = this.collegeDetailsFormGroup.value.due_date;
      if(typeof(dud) == 'object'){
      let dudate = dud.singleDate.date;
      let dd = (dudate.day < 10 ? '0' : '') + (dudate.day);
      let dm = (dudate.month < 10 ? '0' : '') + (dudate.month);
      // console.log(dob);
      this.collegeDetailsFormGroup.controls['due_date'].setValue(dd + '-' + dm + '-' + dudate.year);
      }

      const myFormData = new FormData();
      // personal details
      myFormData.append('id', this.personalDetailsFormGroup.value.id);
      if (this.file == '') {

        myFormData.append('profile_image', this.profileimage_name);
      } else {
        myFormData.append('profile_image', this.file, this.file.name);
      }
      myFormData.append('name', this.personalDetailsFormGroup.value.name);
      myFormData.append('last_name', this.personalDetailsFormGroup.value.last_name);
      myFormData.append('gender', this.personalDetailsFormGroup.value.gender);
      myFormData.append('dateofbirth', this.personalDetailsFormGroup.value.dateofbirth);
      myFormData.append('email', this.personalDetailsFormGroup.value.email);
      myFormData.append('mobile', this.personalDetailsFormGroup.value.mobile);
      myFormData.append('status', this.personalDetailsFormGroup.value.status);
      myFormData.append('address_one', this.personalDetailsFormGroup.value.address_one);
      myFormData.append('address_two', this.personalDetailsFormGroup.value.address_two);
      myFormData.append('city', this.personalDetailsFormGroup.value.city);
      myFormData.append('state', this.personalDetailsFormGroup.value.state);
      myFormData.append('zip_code', this.personalDetailsFormGroup.value.zip_code);
      myFormData.append('referred_by', this.personalDetailsFormGroup.value.referred_by);
      myFormData.append('referred_contact', this.personalDetailsFormGroup.value.referred_contact);
      myFormData.append('role_type', this.personalDetailsFormGroup.value.role_type);
      myFormData.append('why_need_sponsorship', this.addfeesForm.value.why_need_sponsorship);

      // parentdetails
      myFormData.append('fatherorgardian_mobile', this.parentDetailsFormGroup.value.fatherorgardian_mobile);
      myFormData.append('fatherorguardian_name', this.parentDetailsFormGroup.value.fatherorguardian_name);
      myFormData.append('parent_lastname', this.parentDetailsFormGroup.value.parent_lastname);
      myFormData.append('parent_age', this.parentDetailsFormGroup.value.parent_age);
      myFormData.append('parent_occupation', this.parentDetailsFormGroup.value.parent_occupation);
      myFormData.append('parent_address_one', this.parentDetailsFormGroup.value.parent_address_one);
      myFormData.append('parent_address_two', this.parentDetailsFormGroup.value.parent_address_two);
      myFormData.append('parent_city', this.parentDetailsFormGroup.value.parent_city);
      myFormData.append('parent_state', this.parentDetailsFormGroup.value.parent_state);
      myFormData.append('parent_zip_code', this.parentDetailsFormGroup.value.parent_zip_code);
      myFormData.append('work_status', this.parentDetailsFormGroup.value.work_status);
      myFormData.append('name_of_organizations', this.parentDetailsFormGroup.value.name_of_organizations);
      myFormData.append('contact_of_organizations', this.parentDetailsFormGroup.value.contact_of_organizations);
      myFormData.append('organizations_address_one', this.parentDetailsFormGroup.value.organizations_address_one);
      myFormData.append('organizations_address_two', this.parentDetailsFormGroup.value.organizations_address_two);
      myFormData.append('organizations_city', this.parentDetailsFormGroup.value.organizations_city);
      myFormData.append('organizations_state', this.parentDetailsFormGroup.value.organizations_state);
      myFormData.append('organizations_pincode', this.parentDetailsFormGroup.value.organizations_pincode);
      myFormData.append('why_need_sponsorship', this.parentDetailsFormGroup.value.why_need_sponsorship);

      // college details
      myFormData.append('collegeofstudy', this.collegeDetailsFormGroup.value.collegeofstudy);
      myFormData.append('contact_person', this.collegeDetailsFormGroup.value.contact_person);
      myFormData.append('contact_person_mobile', this.collegeDetailsFormGroup.value.contact_person_mobile);
      myFormData.append('college_phone', this.collegeDetailsFormGroup.value.college_phone);
      myFormData.append('college_email', this.collegeDetailsFormGroup.value.college_email);
      myFormData.append('college_address_one', this.collegeDetailsFormGroup.value.college_address_one);
      myFormData.append('college_address_two', this.collegeDetailsFormGroup.value.college_address_two);
      myFormData.append('college_city', this.collegeDetailsFormGroup.value.college_city);
      myFormData.append('college_state', this.collegeDetailsFormGroup.value.college_state);
      myFormData.append('college_zip_code', this.collegeDetailsFormGroup.value.college_zip_code);
      myFormData.append('course_name', this.collegeDetailsFormGroup.value.course_name);
      myFormData.append('study_duration', this.collegeDetailsFormGroup.value.study_duration);
      myFormData.append('academic_year', this.collegeDetailsFormGroup.value.academic_year);
      myFormData.append('current_semester', this.collegeDetailsFormGroup.value.current_semester);
      myFormData.append('join_date', this.collegeDetailsFormGroup.value.join_date);
      myFormData.append('transfer_option', this.transfer_option);
      if(this.transfer_option == 'RTGSORNEFT'){
        myFormData.append('bank_name', this.collegeDetailsFormGroup.value.bank_name);
      myFormData.append('branch_name', this.collegeDetailsFormGroup.value.branch_name);
      myFormData.append('ifsc_code', this.collegeDetailsFormGroup.value.ifsc_code);
      myFormData.append('bank_account_no', this.collegeDetailsFormGroup.value.bank_account_no);
      myFormData.append('dd_favouring', '');
        // this.collegeDetailsFormGroup.controls['dd_favouring'].setValue('');
      }else if(this.transfer_option == 'DD'){
        myFormData.append('bank_name', '');
      myFormData.append('branch_name', '');
      myFormData.append('ifsc_code', '');
      myFormData.append('bank_account_no', '');
      myFormData.append('dd_favouring', this.collegeDetailsFormGroup.value.dd_favouring);
        // this.collegeDetailsFormGroup.controls['bank_name'].setValue('');
        // this.collegeDetailsFormGroup.controls['branch_name'].setValue('');
        // this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
        // this.collegeDetailsFormGroup.controls['ifsc_code'].setValue('');
        // this.collegeDetailsFormGroup.controls['bank_account_no'].setValue('');
      }

      myFormData.append('due_date', this.collegeDetailsFormGroup.value.due_date);
      myFormData.append('payment_type', this.collegeDetailsFormGroup.value.payment_type);
      

      // fees details
      
        let fd = this.addfeesForm.controls['feestype_array'].value;
        var erro_count = 0;
        fd.forEach(d => {
          if(d.fees_per_semester == 0){
            erro_count ++;
          }
        });
        console.log(erro_count);
        if(erro_count > 0){
          this.toastr.info("Fees per semester should be greater than zero" , 'Info', {
            progressBar:true
          });
          return;
        }
        
        myFormData.append('fees_type',JSON.stringify(this.addfeesForm.controls['feestype_array'].value));
          this.SpinnerService.show();
          this.studentserv.postmethod('addstudent',myFormData,true).then(res => {
            this.SpinnerService.hide();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Success',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/students-list');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // this.router.navigateByUrl('/register');
                }
              })
            }
      },error => {
        this.SpinnerService.hide();
        console.log(error);
      });
    } 
  }  
    }

    addstudent(){
      this.submitted = true;
      if(this.addstudentForm.invalid){
        return;
      }else{
        if(this.addstudentForm.value.id){
          console.log(this.addstudentForm.value.dateofbirth);
        if(this.addstudentForm.value.dateofbirth){
          let dob = this.addstudentForm.value.dateofbirth;
          if(typeof(dob) == 'object'){
          let pd = dob.singleDate.date;
      let d= (pd.day < 10 ? '0' : '')+(pd.day);
      let m = (pd.month < 10 ? '0' : '')+(pd.month);
      // console.log(dob);
          this.addstudentForm.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);
          }
        }

        let jod = this.addstudentForm.value.join_date;
        if(typeof(jod) == 'object'){
        let jdate = jod.singleDate.date;
        let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
        let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
        // console.log(dob);
        this.addstudentForm.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
        }

        const myFormData = new FormData();
        myFormData.append('id', this.addstudentForm.value.id);
        if (this.file == '') {

          myFormData.append('profile_image', this.profileimage_name);
        } else {
          myFormData.append('profile_image', this.file, this.file.name);
        }
        myFormData.append('name', this.addstudentForm.value.name);
        myFormData.append('last_name', this.addstudentForm.value.last_name);
        myFormData.append('fatherorguardian_name', this.addstudentForm.value.fatherorguardian_name);
        myFormData.append('gender', this.addstudentForm.value.gender);
        myFormData.append('dateofbirth', this.addstudentForm.value.dateofbirth);
        myFormData.append('email', this.addstudentForm.value.email);
        myFormData.append('mobile', this.addstudentForm.value.mobile);
        myFormData.append('fatherorgardian_mobile', this.addstudentForm.value.fatherorgardian_mobile);
        myFormData.append('address_one', this.addstudentForm.value.address_one);
        myFormData.append('address_two', this.addstudentForm.value.address_two);
        myFormData.append('city', this.addstudentForm.value.city);
        myFormData.append('state', this.addstudentForm.value.state);
        myFormData.append('zip_code', this.addstudentForm.value.zip_code);
        myFormData.append('collegeofstudy', this.addstudentForm.value.collegeofstudy);
        myFormData.append('contact_person', this.addstudentForm.value.contact_person);
        myFormData.append('contact_person_mobile', this.addstudentForm.value.contact_person_mobile);
        myFormData.append('college_phone', this.addstudentForm.value.college_phone);
        myFormData.append('college_email', this.addstudentForm.value.college_email);
        myFormData.append('college_address_one', this.addstudentForm.value.college_address_one);
        myFormData.append('college_address_two', this.addstudentForm.value.college_address_two);
        myFormData.append('college_city', this.addstudentForm.value.college_city);
        myFormData.append('college_state', this.addstudentForm.value.college_state);
        myFormData.append('college_zip_code', this.addstudentForm.value.college_zip_code);
        myFormData.append('course_name', this.addstudentForm.value.course_name);
        myFormData.append('study_duration', this.addstudentForm.value.study_duration);
        myFormData.append('academic_year', this.addstudentForm.value.academic_year);
        myFormData.append('join_date', this.addstudentForm.value.join_date);
        myFormData.append('role_type', this.addstudentForm.value.role_type);
        myFormData.append('status', this.addstudentForm.value.status);
        
          console.log(this.addstudentForm.value);
     
          // this.ngxService.start();
          this.studentserv.postmethod('updatestudent',myFormData,true).then(res => {
            // this.ngxService.stop();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Updated',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/students-list');
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
          if(this.addstudentForm.value.dateofbirth){
            let dob = this.addstudentForm.value.dateofbirth;
            if(typeof(dob) == 'object'){
            let pd = dob.singleDate.date;
        let d= (pd.day < 10 ? '0' : '')+(pd.day);
        let m = (pd.month < 10 ? '0' : '')+(pd.month);
        // console.log(dob);
            this.addstudentForm.controls['dateofbirth'].setValue(d+'-'+m+'-'+pd.year);
            }
          }
  
          let jod = this.addstudentForm.value.join_date;
          if(typeof(jod) == 'object'){
          let jdate = jod.singleDate.date;
          let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
          let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
          // console.log(dob);
          this.addstudentForm.controls['join_date'].setValue(jd + '-' + jm + '-' + jdate.year);
          }
  
          const myFormData = new FormData();
          myFormData.append('id', this.addstudentForm.value.id);
          if (this.file == '') {
  
            myFormData.append('profile_image', this.profileimage_name);
          } else {
            myFormData.append('profile_image', this.file, this.file.name);
          }
          myFormData.append('name', this.addstudentForm.value.name);
          myFormData.append('last_name', this.addstudentForm.value.last_name);
          myFormData.append('fatherorguardian_name', this.addstudentForm.value.fatherorguardian_name);
          myFormData.append('gender', this.addstudentForm.value.gender);
          myFormData.append('dateofbirth', this.addstudentForm.value.dateofbirth);
          myFormData.append('email', this.addstudentForm.value.email);
          myFormData.append('mobile', this.addstudentForm.value.mobile);
          myFormData.append('fatherorgardian_mobile', this.addstudentForm.value.fatherorgardian_mobile);
          myFormData.append('address_one', this.addstudentForm.value.address_one);
          myFormData.append('address_two', this.addstudentForm.value.address_two);
          myFormData.append('city', this.addstudentForm.value.city);
          myFormData.append('state', this.addstudentForm.value.state);
          myFormData.append('zip_code', this.addstudentForm.value.zip_code);
          myFormData.append('collegeofstudy', this.addstudentForm.value.collegeofstudy);
          myFormData.append('contact_person', this.addstudentForm.value.contact_person);
          myFormData.append('contact_person_mobile', this.addstudentForm.value.contact_person_mobile);
          myFormData.append('college_phone', this.addstudentForm.value.college_phone);
          myFormData.append('college_email', this.addstudentForm.value.college_email);
          myFormData.append('college_address_one', this.addstudentForm.value.college_address_one);
          myFormData.append('college_address_two', this.addstudentForm.value.college_address_two);
          myFormData.append('college_city', this.addstudentForm.value.college_city);
          myFormData.append('college_state', this.addstudentForm.value.college_state);
          myFormData.append('college_zip_code', this.addstudentForm.value.college_zip_code);
          myFormData.append('course_name', this.addstudentForm.value.course_name);
          myFormData.append('study_duration', this.addstudentForm.value.study_duration);
          myFormData.append('academic_year', this.addstudentForm.value.academic_year);
          myFormData.append('join_date', this.addstudentForm.value.join_date);
          myFormData.append('role_type', this.addstudentForm.value.role_type);
          myFormData.append('status', this.addstudentForm.value.status);
         
         
          console.log(this.addstudentForm.value);
          // this.ngxService.start();
          this.studentserv.postmethod('addstudent',myFormData,true).then(res => {
            // this.ngxService.stop();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Success',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/students-list');
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

    onDateChanged(event, text) {
      // let {date, jsDate, formatted, epoc} = event.singleDate;
      // console.log(event['singleDate'])
      if (text == 'birth_date') {
        this.addstudentForm.controls['dateofbirth'].setValue(event.singleDate.formatted);
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
  
      }else if(text == 'due_date'){
        console.log('due date');
        this.collegeDetailsFormGroup.controls['due_date'].setValue(event.singleDate.formatted);
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
          this.myDatePickerOptions2.disableUntil.day = actualDate.getDate();
          this.myDatePickerOptions2.disableUntil.month = actualDate.getMonth() + 1;
          this.myDatePickerOptions2.disableUntil.year = actualDate.getFullYear();
        } else {
          this.myDatePickerOptions2.disableUntil.day = Number(start_date.day) - 1;
          this.myDatePickerOptions2.disableUntil.month = Number(start_date.month);
          this.myDatePickerOptions2.disableUntil.year = Number(start_date.year);
        }
      }else {
        this.addstudentForm.controls['join_date'].setValue(event.singleDate.formatted);
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
      this.personalDetailsFormGroup.get('profile_image').setValidators(Validators.required);
      this.personalDetailsFormGroup.get('profile_image').updateValueAndValidity();
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

    onchangeworkstatis(event){
      let w = event.target.value;
      if(w == 'working' || w == 'retired'){
        this.isShoworganizationdetails = true;
        this.parentDetailsFormGroup.get('name_of_organizations').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('name_of_organizations').updateValueAndValidity();
        this.parentDetailsFormGroup.get('contact_of_organizations').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('contact_of_organizations').updateValueAndValidity();
        this.parentDetailsFormGroup.get('organizations_address_one').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('organizations_address_one').updateValueAndValidity();
        this.parentDetailsFormGroup.get('organizations_address_two').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('organizations_address_two').updateValueAndValidity();
        this.parentDetailsFormGroup.get('organizations_city').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('organizations_city').updateValueAndValidity();
        this.parentDetailsFormGroup.get('organizations_state').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('organizations_state').updateValueAndValidity();
        this.parentDetailsFormGroup.get('organizations_pincode').setValidators(Validators.required);
        this.parentDetailsFormGroup.get('organizations_pincode').updateValueAndValidity();
      }else{
        this.isShoworganizationdetails = false;
   

      this.parentDetailsFormGroup.get('name_of_organizations').clearValidators();
      this.parentDetailsFormGroup.get('name_of_organizations').updateValueAndValidity();
      this.parentDetailsFormGroup.get('contact_of_organizations').clearValidators();
      this.parentDetailsFormGroup.get('contact_of_organizations').updateValueAndValidity();
      this.parentDetailsFormGroup.get('organizations_address_one').clearValidators();
      this.parentDetailsFormGroup.get('organizations_address_one').updateValueAndValidity();
      this.parentDetailsFormGroup.get('organizations_address_two').clearValidators();
      this.parentDetailsFormGroup.get('organizations_address_two').updateValueAndValidity();
      this.parentDetailsFormGroup.get('organizations_city').clearValidators();
      this.parentDetailsFormGroup.get('organizations_city').updateValueAndValidity();
      this.parentDetailsFormGroup.get('organizations_state').clearValidators();
      this.parentDetailsFormGroup.get('organizations_state').updateValueAndValidity();
      this.parentDetailsFormGroup.get('organizations_pincode').clearValidators();
      this.parentDetailsFormGroup.get('organizations_pincode').updateValueAndValidity();
      }
    }

    wordCounter() {
      //alert(this.text.nativeElement.value)
      this.wordCount = this.text ? this.text.nativeElement.value.split(/\s+/) : 0;
      this.words = this.wordCount ? this.wordCount.length : 0;
      console.log(this.words);
      if(this.words > 150){
        // this.word_max_error_msg = "Description Must be Maximum 150 words.";
        this.isShowwordmaxlengtherror = true;
        // return false;
      }else{
      this.isShowwordmaxlengtherror = false;
      }
    }

    onlyOneValue(e){
      console.log(e.target.id);
      console.log(e);
      
    if (e.target.id == "rtgsorneft") {
      console.log(e.target.id);
        // this.rtgsorneft= true;
        // this.dd = false;
        $('#rtgsorneft').prop('checked',true);
        $('#dd').prop('checked',false);
        this.transfer_option = 'RTGSORNEFT';
        this.isShowrtgsorneft = true;
        this.isShowdd = false;
        this.collegeDetailsFormGroup.get('dd_favouring').clearValidators();
        this.collegeDetailsFormGroup.get('dd_favouring').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('bank_name').setValidators(Validators.required);
        this.collegeDetailsFormGroup.get('bank_name').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('branch_name').setValidators(Validators.required);
        this.collegeDetailsFormGroup.get('branch_name').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('bank_account_no').setValidators(Validators.required);
        this.collegeDetailsFormGroup.get('bank_account_no').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('ifsc_code').setValidators(Validators.required);
        this.collegeDetailsFormGroup.get('ifsc_code').updateValueAndValidity();
        // this.collegeDetailsFormGroup.controls['transfer_option'].setValue('');
      }
   else  if (e.target.id == "dd") {
    console.log(e.target.id);
        // this.rtgsorneft= false;
        // this.dd = true;
        $('#rtgsorneft').prop('checked',false);
        $('#dd').prop('checked',true);
        this.transfer_option = 'DD';
        this.isShowrtgsorneft = false;
        this.isShowdd = true;
        this.collegeDetailsFormGroup.get('dd_favouring').setValidators(Validators.required);
        this.collegeDetailsFormGroup.get('dd_favouring').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('bank_name').clearValidators();
        this.collegeDetailsFormGroup.get('bank_name').updateValueAndValidity();
  
        this.collegeDetailsFormGroup.get('branch_name').clearValidators();
        this.collegeDetailsFormGroup.get('branch_name').updateValueAndValidity();
  
        this.collegeDetailsFormGroup.get('bank_account_no').clearValidators();
        this.collegeDetailsFormGroup.get('bank_account_no').updateValueAndValidity();
       
        this.collegeDetailsFormGroup.get('ifsc_code').clearValidators();
        this.collegeDetailsFormGroup.get('ifsc_code').updateValueAndValidity();
        this.collegeDetailsFormGroup.get('bank_account_no').clearValidators();
        this.collegeDetailsFormGroup.get('bank_account_no').updateValueAndValidity();
        // this.collegeDetailsFormGroup.controls['transfer_option'].setValue('DD');
      }
      console.log(this.transfer_option);
  }

}
