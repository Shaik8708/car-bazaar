import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leads-verification',
  templateUrl: './leads-verification.component.html',
  styleUrls: ['./leads-verification.component.css']
})
export class LeadsVerificationComponent  implements OnInit {


  showDate:any
   getList:any[]=[]
   constructor(private api:ApiService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService) { }

   ngOnInit(): void {
    this.spinner.show();
     this.api.getUsers().subscribe((res:any) => {
       this.getList = res.data.reverse();

       this.getList.forEach(element => {
         var abc = element.createdAt
         var s = abc.split('T')


         element.createdAtVariable = s[0]
       });


       if(res?.message == "jwt expired"){
         this.toastr.error("Token Expired, Loggin Again");
         this.router.navigateByUrl('/login');

       }
       this.spinner.hide();
     },
     (err:any) => {
      this.spinner.hide();
       if(err?.error?.message == "jwt expired"){
         this.toastr.error("Token Expired, Loggin Again");
         this.router.navigateByUrl('/login');

       }
     }
     )

     var da = new Date();
     var datesss:any = da.toLocaleDateString();


     var rev = datesss.split('/')
     this.showDate = rev[2]+"-"+rev[1]+"-"+rev[0]

   }


   reset(){

     var da = new Date();
     var datesss:any = da.toLocaleDateString();


     var rev = datesss.split('/')
     this.showDate = rev[2]+"-"+rev[1]+"-"+rev[0]

   }
}
