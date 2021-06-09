import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/dataservice/auth.service';
// import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
import { NgxSpinnerService } from 'ngx-spinner';
// import { TeamService } from 'src/app/dataservice/team.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminloginform:FormGroup;
  submitted = false;
  uniid:any;
  disableBtn:boolean = false;
  constructor(private toastr:ToastrService,private fb: FormBuilder,private auth:AuthService,
    private router: Router,private Activate: ActivatedRoute,private SpinnerService: NgxSpinnerService) {
    // this.Activate.queryParams.subscribe(res => {
    //   this.uniid = res.uniid;
    //   console.log(this.uniid);
      // if(this.uniid){
      //   setTimeout(() => {
      //   this.tmsv.getdata('register/activate/'+res.uniid).then(res => {
      //     console.log(res);
      //     if(res['status'] == 'success'){
      //       this.toastr.success(res['message'], res['status'], {
      //         progressBar:true
      //       });
      //     return;
      //     }else if(res['status'] == 'faile'){
      //       this.toastr.success(res['message'], res['status'], {
      //         progressBar:true
      //       });
      //     return;
      //     }
      //   },error => {
      //     console.log(error);
      //     if(error['status'] == 401){
      //       let err = error['error'];
      //       this.toastr.info(err['message'], err['status'], {
      //         progressBar:true
      //       });
      //     return;
      //     }
      //   });
      // },1000);
     
      // }else{
        
      // }
   
    // },error => {
    //   console.log(error);
    //   if(error['status'] == 401){
    //   }
    // });

   }

  ngOnInit(): void {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');
    this.adminloginform = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{9,})/)]],
    })
  }


// convenience getter for easy access to form fields
get f() { return this.adminloginform.controls; }

  adminlogin(){
    this.submitted = true;
    if(this.adminloginform.invalid){
      return;
    }else{
      this.SpinnerService.show();
this.auth.login(this.adminloginform.value).then(res => {
  this.SpinnerService.hide();
  if(res['status'] == 'success'){
    this.auth.seesionuser_info(res);
    if(res['role_type'] == 1){
    this.toastr.success(res['message'], 'Info', {
      progressBar:true,
      timeOut:1000
    });
setTimeout(() => {
    this.router.navigateByUrl('admin-dashboard', { skipLocationChange: false }).then(() => {
      this.router.navigate(['admin-dashboard']);
  });
},1000);
}else if(res['role_type'] == 3){
  this.toastr.success(res['message'], 'Info', {
    progressBar:true,
    timeOut:1000
  });
  setTimeout(() => {
    this.router.navigateByUrl('student-profile', { skipLocationChange: false }).then(() => {
      this.router.navigate(['student-profile']);
  });
},3000);
}else if(res['role_type'] == 2){
  this.toastr.success(res['message'], 'Info', {
    progressBar:true,
    timeOut:1000
  });
  setTimeout(() => {
    this.router.navigateByUrl('sponsor-profile', { skipLocationChange: false }).then(() => {
      this.router.navigate(['sponsor-profile']);
  });
},3000);
}else if(res['role_type'] == 4){
  this.toastr.success(res['message'], 'Info', {
    progressBar:true,
    timeOut:1000
  });
setTimeout(() => {
  this.router.navigateByUrl('admin-dashboard', { skipLocationChange: false }).then(() => {
    this.router.navigate(['admin-dashboard']);
});
},1000);
}else{
  this.router.navigateByUrl('admin-login', { skipLocationChange: false }).then(() => {
    this.router.navigate(['admin-login']);
});
  }
}
  console.log(res);
},error => {
  this.SpinnerService.hide();
  console.log(error);
  if(error['error'].status == 401){
    this.toastr.error(error['error'].message, 'Login failed', {
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
