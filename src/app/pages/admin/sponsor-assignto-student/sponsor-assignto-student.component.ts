import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAngularMyDpOptions } from 'angular-mydatepicker';
import { StudentService } from 'src/app/dataservice/student.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sponsor-assignto-student',
  templateUrl: './sponsor-assignto-student.component.html',
  styleUrls: ['./sponsor-assignto-student.component.css']
})
export class SponsorAssigntoStudentComponent implements OnInit {
  assignsponsorForm:FormGroup;
  submitted = false;
  student_id:any;
  sponsorarray = [];
  dropdownSettings:IDropdownSettings = {};
  constructor(private fb:FormBuilder,private studentserv:StudentService,private router:Router,
    private Activate: ActivatedRoute,private myacser: MyaccountService,private sponsorserv:SponsorsService) { 
      this.assignsponsorForm = this.fb.group({
        id:[''],
        student_name:['',Validators.required],
        mobile:['',Validators.required],
        email:['',[Validators.required,Validators.email]],
        sponsor:['',Validators.required]
      });
      this.Activate.queryParams.subscribe(res => {
        this.student_id = res.id;
        if(this.student_id){
          this.studentserv.getdata('getstudentassignedsponsordata/'+res.id).then(async res => {
            console.log(res);
            if(res['status'] == 'success'){
              let data = res['data'][0];
              let sponsordata = res['studentassignsponsor'];
              console.log(data);
              console.log(sponsordata);
             
              this.assignsponsorForm.controls['id'].setValue(data.id);         
              this.assignsponsorForm.controls['student_name'].setValue(data.name+' '+data.last_name);  
              this.assignsponsorForm.controls['mobile'].setValue(data.mobile);
              this.assignsponsorForm.controls['email'].setValue(data.email);
          
                let sponsors = [];
                sponsordata.forEach(s => {                
                  sponsors.push({id:s.id,name:s.sponsorfname+' '+s.sponsorlname});
                // }
              })
              this.assignsponsorForm.controls['sponsor'].setValue(sponsors); 
              console.log(sponsors);
              

              
              
            }
          });
        }
     
      });
    }

  ngOnInit(): void {
    this.sponsorserv.getdata('getallsponsors').then(res => {
      console.log(res);
      if(res['status'] == 'success'){
    let data = res['data']; 
    console.log(data);
    let sponsors = [];
    sponsors.push({id:'0',name:"General pool"});
      data.forEach(s => {
        sponsors.push({id:s.id,name:s.name+' '+s.last_name});
      }); 
      this.sponsorarray = sponsors;
      console.log(this.sponsorarray);
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

 

      // convenience getter for easy access to form fields
      get c() { return this.assignsponsorForm.controls; }

  assignsponsor(){
    this.submitted = true;
        if(this.assignsponsorForm.invalid){
          return;
        }else{
          let data = {
            id:this.assignsponsorForm.value.id,
            student_name:this.assignsponsorForm.value.student_name,
            mobile:this.assignsponsorForm.value.mobile,
            email:this.assignsponsorForm.value.email,
            sponsor:JSON.stringify(this.assignsponsorForm.value.sponsor)
          }
          this.sponsorserv.postmethod('updatestudentassignsponsor',data,false).then(res => {
            // this.ngxService.stop();
            if(res['status'] == 'success'){
              Swal.fire({
                title: 'Updated',
                text: res['message'],
                icon: 'success',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.value) {
                  this.router.navigateByUrl('/student-pending-approval-list');
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

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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
