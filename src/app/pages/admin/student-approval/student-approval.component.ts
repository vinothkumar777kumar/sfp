import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-student-approval',
  templateUrl: './student-approval.component.html',
  styleUrls: ['./student-approval.component.css'],
   animations: [
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class StudentApprovalComponent implements OnInit {
  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();
  dtOptions1: DataTables.Settings = {};
  dtTrigger1:Subject<any> = new Subject();
  dtOptions2: DataTables.Settings = {};
  dtTrigger2:Subject<any> = new Subject();

  approvalstudent:any;
  pendingstudentsarray:any;
  rejectedstudentsarray:any;
isShowapproval:boolean = false;
isShowpending:boolean = false;
  isShowreject:boolean = false;

  studentsarray = [];
  constructor(private router:Router,private studenser:StudentService,private studentserv: StudentService) {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
  
    // this.dtOptions2 = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5
    // }
      this.studenser.getdata('getallstudent').then(res => {
        console.log(res);
        if(res['status'] == 'success'){
      let data = res['data'];
      if(data == ''){
  // this.emptystudentsarray = true;
      }else{
        this.studentsarray = [];
        data.forEach(s => {
          this.studentsarray.push({id:s.id,name:s.name,dateofbirth:s.dateofbirth,email:s.email,
            gender:s.gender,dob:s.dateofbirth,collegeofstudy:s.collegeofstudy,mobile:s.mobile,study_duration:s.study_duration,
            yearly_fees:s.yearly_fees,zip_code:s.zip_code,address:s.address,status:s.status,approval:s.approval,pending:s.pending,reject:s.reject
          });
        });
        
        this.approvalstudent = this.studentsarray.filter(s => s.approval == '1');
        // this.isShowapproval = true;
        // this.pendingstudentsarray = studentsarray.filter(s => s.pending == '1');
        // this.isShowpending = true;
        // this.rejectedstudentsarray = studentsarray.filter(s => s.reject == '1');
        // this.isShowreject = true;
        console.log(this.approvalstudent);
        console.log(this.pendingstudentsarray);
        console.log(this.rejectedstudentsarray);
    
      }
       this.dtTrigger.next();
     
              }
      },error => {
        console.log(error);
       if(error['error']){
        // this.toastr.error(error['error'].message, 'Error', {
        //   progressBar:true
        // });
        return;
       }
       
      })
    
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
    this.dtTrigger1.unsubscribe();
    this.dtTrigger2.unsubscribe();
  }

  fetchNews(eve){
       this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    // this.approvalstudent = this.studentsarray.filter(s => s.approval == '1');
    //     this.isShowapproval = true;
        this.pendingstudentsarray = this.studentsarray.filter(s => s.pending == '1');
        this.isShowpending = true;
        // this.rejectedstudentsarray = this.studentsarray.filter(s => s.reject == '1');
        // this.isShowreject = true;
      this.dtTrigger1.next();
    console.log(eve);
  }

}
