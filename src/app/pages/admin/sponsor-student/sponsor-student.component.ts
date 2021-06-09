import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorsService } from 'src/app/dataservice/sponsors.service';
import { StudentService } from 'src/app/dataservice/student.service';
import Swal from 'sweetalert2';
import * as $ from 'jQuery';
@Component({
  selector: 'app-sponsor-student',
  templateUrl: './sponsor-student.component.html',
  styleUrls: ['./sponsor-student.component.css']
})
export class SponsorStudentComponent implements OnInit {
  @Input() headerContent: string;
  @Input() title: string;
  @Input() blockClass: string;
  @Input() cardClass: string;
  @Input() classHeader = false;
  cardToggle = 'expanded';
  cardClose = 'open';
  fullCard: string;
  fullCardIcon: string;
  loadCard = false;
  isCardToggled = false;
  cardLoad: string;
  sponsor_id: any;
  emtysponsorstudent: boolean = false;
  sponsorstudentsarray = [];
  feesdata = [];
  constructor(private Activate: ActivatedRoute, private studentserv: StudentService,
    private router: Router, private sponsorserv: SponsorsService) {
    this.Activate.queryParams.subscribe(res => {
      this.sponsor_id = res.id;
      if (this.sponsor_id) {
        this.getfeesdata(this.sponsor_id);
      }

    });
  }

  ngOnInit(): void {
  }

  getfeesdata(sponsorid) {
    this.studentserv.getdata('getsponsorstudent/' + sponsorid).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        let data = res['data'];
        this.sponsorstudentsarray = [];
        if (data != undefined && data != '' && data.length > 0) {
          data.forEach(s => {
            this.sponsorstudentsarray.push({
              id: s.id, name: s.name + '' + s.last_name, mobile: s.mobile, email: s.email,
            })
          })
        } else {
          this.emtysponsorstudent = true;
        }
        console.log(data);

      }
    });
  }

  view_fees_details(data) {
    this.studentserv.getdata('getstudentfeesdata/' + data.id).then(async res => {
      console.log(res);
      if (res['status'] == 'success') {
        var data = res['data'];
        this.feesdata = [];
        if (data != undefined && data != '' && data.length > 0) {
          // this.emtysponsorstudent = false;
          console.log(data);
          data.forEach(f => {
            this.feesdata.push({ id: f.id, fees_type: f.fees_type, fees: f.fees_per_semester });
          });

            (jQuery('#studenfeesmodal') as any).modal('show');
        } else {
          // this.emtysponsorstudent = true;
        }
        console.log(this.feesdata);
        console.log(data);







      }
    });
  }

  delete_sponsor_student(data) {
    Swal.fire({
      title: 'Delete',
      text: "Are You Sure Delete this student?",
      icon: 'info',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        this.sponsorserv.delete('deletesponsorstudent/' + data.id).then(res => {
          if (res['status'] == "success") {
            Swal.fire({
              title: 'Success',
              text: res['message'],
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.value) {
                this.feesdata = [];
                this.getfeesdata(this.sponsor_id);
                // this.router.navigateByUrl('sponsors-list', { skipLocationChange: true }).then(() => {
                //   this.router.navigate(['sponsors-list']);
                // });
              } else if (result.dismiss === Swal.DismissReason.cancel) {
                this.router.navigateByUrl('sponsors-list');
              }
            })
          }
        }, error => {
          console.log(error);
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigateByUrl('sponsors-list');
      }
    })
  }

}
