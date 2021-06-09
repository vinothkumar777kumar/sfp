import { Component,Input,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from 'src/app/dataservice/dataservice.service';
import { MyaccountService } from 'src/app/dataservice/myaccount.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-fees-structure',
  templateUrl: './fees-structure.component.html',
  styleUrls: ['./fees-structure.component.css']
})
export class FeesStructureComponent implements OnInit {
  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;

    @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject();

  logininfo:any;
  feesdata = [];
  emptyfeesdataarray:boolean = false;
  constructor(private router:Router,private myacser:MyaccountService,
    private toastr:ToastrService,private ds:DataserviceService) {
    this.logininfo = JSON.parse(sessionStorage.getItem('login_details'));
    if(this.logininfo == undefined){
      this.router.navigateByUrl('/admin-login')
      return;
  }
   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    }
    this.myacser.getdata('getfeestype/'+this.logininfo['user_id']).then(res => {
          

      console.log(res);
      if(res['status'] == 'success'){
        let data = res['data'];
        if(data == ''){
this.emptyfeesdataarray = true;
        }else{
        data.forEach(f => {
          this.feesdata.push({id:f.id,student_id:f.student_id,fees_type:f.fees_type,fees_per_semester:f.fees_per_semester})
        });
        this.dtTrigger.next();
      }
  
    
  
 
        
      }
    });
   }

  ngOnInit(): void {
  }

   ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
      }

}
