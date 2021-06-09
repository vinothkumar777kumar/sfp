import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetpasswordform:FormGroup;
  submitted = false;
  uniid:any;
  constructor(private toastr:ToastrService,private fb: FormBuilder,private auth:AuthService,private router: Router,private Activate: ActivatedRoute) {
   

   }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.resetpasswordform = this.fb.group({
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
      confirm_password:['',Validators.required]
    })
  }


// convenience getter for easy access to form fields
get c() { return this.resetpasswordform.controls; }

resetpassword(){
    this.submitted = true;
    if(this.resetpasswordform.invalid){
      return;
    }else{
      let n_p = this.resetpasswordform.value.password;
  let con_p = this.resetpasswordform.value.confirm_password;
  if(n_p != con_p){
    this.toastr.info("New password and confirm password does not match", 'Info', {
      progressBar:true
    });
  }else{
      // this.ngxService.start();
this.auth.login(this.resetpasswordform.value).then(res => {
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

}
