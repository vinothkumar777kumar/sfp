import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/dataservice/auth.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerform:FormGroup;
  submitted = false;
  constructor(private toastr:ToastrService,private fb:FormBuilder,private auth:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.registerform = this.fb.group({
      username:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
      mobile:['',Validators.required],
      role_type:[3],
      status:[1]

    });
  }

   // convenience getter for easy access to form fields
   get c() { return this.registerform.controls; }

  signup(){
    this.submitted = true;
    if(this.registerform.invalid){
return;
    }else{
      // this.ngxService.start();
      let data  = this.registerform.value;
      // let data = new FormData();
      // data.append('name',this.registerForm.value.name);
      // data.append('email',this.registerForm.value.email);
      // data.append('password',this.registerForm.value.password);
      // data.append('mobile',this.registerForm.value.mobile);
      // console.log(this.registerForm.value);
this.auth.register(data).then(res => {
  // this.ngxService.stop();
 if(res['status'] == 'success'){
    this.router.navigateByUrl('/login')
    this.toastr.success(res['message'], 'Info', {
      progressBar:true
    });
  }
},error => {
  // this.ngxService.stop();
  // this.ngxService.stopLoader('loader-01');
  if(error['error']['status'] == 401){
    if(error['error']['validation_error'].email){
      // this.ngxService.stop();
      // this.ngxService.stopLoader('loader-01');
      this.toastr.error(error['error']['validation_error'].email, 'Info', {
        progressBar:true
      });
    }else if(error['error']['validation_error'].mobile){
      // this.ngxService.stop();
      // this.ngxService.stopLoader('loader-01');
      this.toastr.error(error['error']['validation_error'].mobile, 'Info', {
        progressBar:true
      });
    }
      }
  
})
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
