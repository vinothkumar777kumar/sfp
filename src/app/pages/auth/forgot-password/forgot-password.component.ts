import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotpasswordform:FormGroup;
  submitted = false;
  uniid:any;
  constructor(private toastr:ToastrService,private fb: FormBuilder,private auth:AuthService,private router: Router,private Activate: ActivatedRoute) {
   

   }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.forgotpasswordform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
    })
  }


// convenience getter for easy access to form fields
get f() { return this.forgotpasswordform.controls; }

forgotpassword(){
    this.submitted = true;
    if(this.forgotpasswordform.invalid){
      return;
    }else{
      // this.ngxService.start();
this.auth.login(this.forgotpasswordform.value).then(res => {
  // this.ngxService.stop();
  if(res['status'] == 'success'){
    this.toastr.success(res['message'], 'Info', {
      progressBar:true,
      timeOut:1000
    });
  this.router.navigateByUrl('admin-login', { skipLocationChange: false }).then(() => {
    this.router.navigate(['admin-login']);
});
  
}
  console.log(res);
},error => {
  // this.ngxService.stop();
  console.log(error);
  if(error['error'].status == 401){
    this.toastr.error(error['error'].message, 'Failed', {
      progressBar:true
    });
  }else{
    // this.toastr.error('net::ERR_CONNECTION_REFUSED', 'Login failed', {
    //   progressBar:true
    // });
  }
});
    }
  }

}
