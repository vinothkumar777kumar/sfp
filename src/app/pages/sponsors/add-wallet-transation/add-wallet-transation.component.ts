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
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-wallet-transation',
  templateUrl: './add-wallet-transation.component.html',
  styleUrls: ['./add-wallet-transation.component.css']
})
export class AddWalletTransationComponent implements OnInit {
  addsponsorwallettransactionForm:FormGroup;
  submitted = false;
  public date = new Date(); 
  student_id:any;
  title = 'Add Transaction';
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
  transaction_id:any;
  constructor(private fb:FormBuilder,private sponsorserv:SponsorsService,private router:Router,
    private Activate: ActivatedRoute,private myacser: MyaccountService,private SpinnerService: NgxSpinnerService) {
      this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    this.addsponsorwallettransactionForm = this.fb.group({
      id:[''],
      sponsor_id: [this.logininfo['user_id']],
      amount:['',Validators.required],
      prev_amt:[''],
      date: ['',Validators.required],
      status:['2']
    });
    this.Activate.queryParams.subscribe(res => {
      this.transaction_id = res.id;
      if(this.transaction_id){
        
        this.title = "Edit Transaction";
        this.submit_action = "Update";
        this.gettransactiondata(this.transaction_id)
      }else{
        this.title = 'Add Transaction';
        this.submit_action = "Save";
        // this.getallstudent();
      }
   
    });
  }

  ngOnInit(): void {
  }

  gettransactiondata(transactionid){
    this.sponsorserv.getdata('editsponsorwallet/'+''+transactionid).then(async res => {
      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'][0];
        let manager_data = res['data'];
        console.log(data);
        this.addsponsorwallettransactionForm.controls['id'].setValue(data.id);
        this.addsponsorwallettransactionForm.controls['amount'].setValue(data.amount);
        this.addsponsorwallettransactionForm.controls['prev_amt'].setValue(data.amount);
        if(data.date != null && data.date != ''){
          let dob = data.date.split('-');
        let rplace = /^0+/;
        let dod = dob[0].replace(rplace,'');
        let dom = dob[1].replace(rplace,'');
          this.addsponsorwallettransactionForm.controls['date'].setValue({isRange: false, singleDate: {date: { 
            year: dob[2], 
            month: dom, 
            day: dod
          }}});
        }
        this.addsponsorwallettransactionForm.controls['status'].setValue(data.status);
      }
    });
  }

    // convenience getter for easy access to form fields
    get c() { return this.addsponsorwallettransactionForm.controls; }

    addtransaction(){
      this.submitted = true;
      if(this.addsponsorwallettransactionForm.invalid){
        return;
      }else{
        if(this.addsponsorwallettransactionForm.value.id){
          let date = this.addsponsorwallettransactionForm.value.date;
          if(typeof(date) == 'object'){
          let jdate = date.singleDate.date;
          let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
          let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
          // console.log(dob);
          this.addsponsorwallettransactionForm.controls['date'].setValue(jd + '-' + jm + '-' + jdate.year);
          }
          this.SpinnerService.show();
          this.sponsorserv.postmethod('updatsponsorwallet',this.addsponsorwallettransactionForm.value,false).then(res => {
            this.SpinnerService.hide();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Updated',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/sponsor-wallet-details');
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                  // this.router.navigateByUrl('/register');
                }
              })
            }
      },error => {
        this.SpinnerService.hide();
        console.log(error);
      });
        }else{
          let date = this.addsponsorwallettransactionForm.value.date;
          if(typeof(date) == 'object'){
          let jdate = date.singleDate.date;
          let jd = (jdate.day < 10 ? '0' : '') + (jdate.day);
          let jm = (jdate.month < 10 ? '0' : '') + (jdate.month);
          // console.log(dob);
          this.addsponsorwallettransactionForm.controls['date'].setValue(jd + '-' + jm + '-' + jdate.year);
          }
          this.SpinnerService.show();
          this.sponsorserv.postmethod('addsponsorwallet',this.addsponsorwallettransactionForm.value,false).then(res => {
            this.SpinnerService.hide();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Success',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/sponsor-wallet-details');
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

  onDateChanged(event, text) {
    // let {date, jsDate, formatted, epoc} = event.singleDate;
    // console.log(event['singleDate'])
    if (text == 'transaction_date') {
      this.addsponsorwallettransactionForm.controls['date'].setValue(event.singleDate.formatted);
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
      this.addsponsorwallettransactionForm.controls['date'].setValue(event.singleDate.formatted);
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

}
