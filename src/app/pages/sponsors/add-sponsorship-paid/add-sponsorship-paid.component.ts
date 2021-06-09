import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { StudentService } from 'src/app/dataservice/student.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';


@Component({
  selector: 'app-add-sponsorship-paid',
  templateUrl: './add-sponsorship-paid.component.html',
  styleUrls: ['./add-sponsorship-paid.component.css']
})
export class AddSponsorshipPaidComponent implements OnInit {
  paysponsorshipform:FormGroup;
  submitted = false;
  public date = new Date(); 
  student_id:any;
  title = 'Add Student';
  submit_action = 'Save';
  public myDatePickerOptions: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'dd-mm-yyyy',
    disableDates: [{dates: [{year: 1885, month: 1, day: 1}, {year: 2011, month: 1, day: 1}], styleClass: 'yoga'}],
    disableUntil: {day: this.date.getDate()-1,month: this.date.getMonth()+1,year: this.date.getFullYear()}
  };
  feesdata = [];
  total_fee = 0;
  logininfo:any;
  sponsor_balance:any;
  constructor(private fb:FormBuilder,private Activate: ActivatedRoute,private studentserv:StudentService,
    private toastr:ToastrService,private sponsorser:SponsorsService,private router:Router) { 
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.paysponsorshipform = this.fb.group({
      student_id:[''],
      sponsor_id:[this.logininfo['user_id']],
      pay_date:['',Validators.required],
      paid: ['',Validators.required],
      total_fees:[],
      paid_status:[1]
    });

    this.Activate.queryParams.subscribe(res => {
      this.student_id = res.id;
      this.paysponsorshipform.controls['student_id'].setValue(res.id);
      if(this.student_id){
        this.studentserv.getdata('getstudentfeesdata/' + res.id+'/'+this.logininfo['user_id']).then(async res => {
          console.log(res);
          if (res['status'] == 'success') {
            var data = res['data'];
            var sponsr_data = res['sponsordata'];
            this.sponsor_balance = sponsr_data[0].opening_bal;
            this.feesdata = [];
            if (data != undefined && data != '' && data.length > 0) {
              // this.emtysponsorstudent = false;
              console.log(data);
              let tf = 0;
              data.forEach(f => {
                let fees = f.fees_per_semester;
                tf += +fees;
                this.feesdata.push({ id: f.id, fees_type: f.fees_type, fees: this.convertcurruncytype(f.fees_per_semester)});
              });
              this.total_fee = this.convertcurruncytype(tf);
    this.paysponsorshipform.controls['total_fees'].setValue(tf);
                // (jQuery('#studenfeesmodal') as any).modal('show');
            } else {
              // this.emtysponsorstudent = true;
            }
            console.log(this.feesdata);
            console.log(data);
    
          }
        });
      }
   
    });
  }

  ngOnInit(): void {
  }

  // convenience getter for easy access to form fields
  get c() { return this.paysponsorshipform.controls; }

  paysponsorship(){
    this.submitted = true;
    if(this.paysponsorshipform.invalid){
      return;
    }else{
      let paydate = this.paysponsorshipform.value.pay_date;
        if(typeof(paydate) == 'object'){
        let jdate = paydate.singleDate.date;
        let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
        let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
        // console.log(dob);
        this.paysponsorshipform.controls['pay_date'].setValue(jd + '-' + jm + '-' + jdate.year);
        }
        console.log(this.total_fee +''+this.convertcurruncytype(this.paysponsorshipform.value.paid));
        if(this.total_fee > this.convertcurruncytype(this.paysponsorshipform.value.paid)){
          this.paysponsorshipform.controls['paid_status'].setValue(2);
          // this.toastr.info('Paid amount have less than total fees', 'info', {
          //   progressBar:true
          // });
          // return;
        }else if(this.total_fee < this.convertcurruncytype(this.paysponsorshipform.value.paid)){
        this.toastr.info('Paid amount have greater than total fees', 'info', {
          progressBar:true
        });
        return;
      }else if(this.paysponsorshipform.value.paid == 0){
        this.toastr.info('paid amount should be greater than zero', 'info', {
          progressBar:true
        });
        return;
      }else if(this.sponsor_balance < this.paysponsorshipform.value.paid){
        this.toastr.info('your balance amount is less than paid amount', 'info', {
          progressBar:true
        });
        return;
      }
      console.log(this.paysponsorshipform.value);
      // this.ngxService.start();
      this.sponsorser.postjson('paysponsorship',this.paysponsorshipform.value).then(res => {
        // this.ngxService.stop();
        if(res['status'] == 'success'){
          Swal.fire({
            title: 'Success',
            text: res['message'],
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.value) {
              this.router.navigateByUrl('/sponsor-students-list');
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

  onDateChanged(event, text) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
    if (text == 'pay_date') {
      this.paysponsorshipform.controls['pay_date'].setValue(event.singleDate.formatted);
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
      this.paysponsorshipform.controls['join_date'].setValue(event.singleDate.formatted);
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
      // if (Number(start_date.day) - 1 == 0) {
      //   let actualDate = new Date(Number(new Date(start_date.year + "-" + start_date.month + "-" + start_date.day)) - 1);
      //   this.myDatePickerOptions1.disableUntil.day = actualDate.getDate();
      //   this.myDatePickerOptions1.disableUntil.month = actualDate.getMonth() + 1;
      //   this.myDatePickerOptions1.disableUntil.year = actualDate.getFullYear();
      // } else {
      //   this.myDatePickerOptions1.disableUntil.day = Number(start_date.day) - 1;
      //   this.myDatePickerOptions1.disableUntil.month = Number(start_date.month);
      //   this.myDatePickerOptions1.disableUntil.year = Number(start_date.year);
      // }
    }

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
