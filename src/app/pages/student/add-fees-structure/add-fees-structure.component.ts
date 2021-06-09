import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-fees-structure',
  templateUrl: './add-fees-structure.component.html',
  styleUrls: ['./add-fees-structure.component.css']
})
export class AddFeesStructureComponent implements OnInit {
  submitted = false;
  addfeesForm: FormGroup;
  logininfo:any;
  constructor(private Activate: ActivatedRoute,private fb:FormBuilder,private router:Router,private myacser:MyaccountService,
    private toastr:ToastrService,private ds:DataserviceService) { 
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    if(this.logininfo == undefined){
      this.router.navigateByUrl('/admin-login')
      return;
  }
    this.addfeesForm = this.fb.group({
      id:[this.logininfo['user_id']],
      feestype_array: new FormArray([
        this.feestypes()
      ])
    })


        this.myacser.getdata('getfeestype/'+this.logininfo['user_id']).then(res => {
          console.log(res['data'].length);
          if(res['data'] != undefined && res['data'] != '' && res['data'].length > 0){
          let fees_control = this.addfeesForm.get('feestype_array') as FormArray;
          for(let i = fees_control.length-1; i >= 0; i--) {
            fees_control.removeAt(i)
    }
          console.log(res);
          if(res['status'] == 'success'){
            
            let data = res['data'];
            console.log(data);
        
        let fees_control = this.addfeesForm.get('feestype_array') as FormArray;
        data.forEach(p => {
          fees_control.push(
            this.fb.group({
              student_id: [p.student_id],
              fees_type: [p.fees_type],
              fees_per_semester: [p.fees_per_semester]
            })
          )
        })
        
      
     
            
          }
        }
        });
      
      
 
  }

  ngOnInit(): void {
  }
  get f(){
    return this.addfeesForm.controls;
  }

  get feesarray() {
    return this.addfeesForm.get('feestype_array') as FormArray;
 }

  feestypes() {
    return this.fb.group({
      student_id:[this.logininfo['user_id']],
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
    // controls.splice(i, 1);
    
    // this.feesarray.removeAt(this.feesarray.length - 1);
//     for(let i = c.length-1; i >= 0; i--) {
//       c.removeAt(i)
// }
    // controls.forEach(f => {
    //   c.push(
    //     this.fb.group({
    //       student_id: [f.get('student_id').value],
    //       fees_type: [f.get('fees_type').value],
    //       fees_per_semester: [f.get('fees_per_semester').value]
    //     })
    //   )
    //   // console.log(c.get('fees_per_semester').value);
    // })
    console.log(controls)
    // this.getimageItems.removeAt(i);
  }

  addfees(){
    console.log(this.addfeesForm.value);
// return;
    this.submitted = true;
    if(this.addfeesForm.invalid){      
      return;
    }else{
      if(this.addfeesForm.value.id){
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
        let data = {
          fees_type : JSON.stringify(this.addfeesForm.controls['feestype_array'].value)
           };
        // this.ngxService.start();
        this.myacser.postmethod('updatefees/'+this.addfeesForm.value.id,data).then(res => {
          // this.ngxService.stop();
          if(res['status'] == 'success'){
            Swal.fire({
              title: 'Updated',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.router.navigateByUrl('/fees-structure');
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                // this.router.navigateByUrl('/register');
              }
            })
          }
    },error => {
      // this.ngxService.stop();
      if(error['status'] == 401){
        let er = error['error'];
        if(er.error == 'Expired token'){
          this.toastr.error(er.message, er.error, {
            progressBar:true
          });
          this.ds.logout('user');
          return;
        }
      }
    });
      }
 
    }
  }

  numberOnly(evt): boolean {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;

  }

}
