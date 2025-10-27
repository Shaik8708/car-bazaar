import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import Swal from 'sweetalert2';
import urlConfig from '../../../config/url.config.json';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-logout-logs',
  templateUrl: './login-logout-logs.component.html',
  styleUrl: './login-logout-logs.component.css'
})
export class LoginLogoutLogsComponent {
  allDealers:any;
loader=false
  constructor(private api:ApiService, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService, private _activate: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let username = "";
    this._activate.paramMap.subscribe(params => {
      username = params.get('id') || '';
    });

    if(username){
      this.getLoginLogoutList(username)
    }else{
      this.getLoginLogoutList();
    }

  }
  getLoginLogoutList(username?:any){
  this.loader=true;
  let getDataByUserId = username ? `&username=${username}` : ""

  // this.api.getAllEmployees()
  this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.loginLogs}${getDataByUserId}`)
  .subscribe((res:any) => {
   this.loader=false
    if(res?.status == "success"){
      this.allDealers = res?.data?.docs;
      console.log(this.allDealers);
      
    }
    else{
      alert("Something went wrong, Try again");
    }
    this.spinner.hide();
  },(err:any)=>{
    this.spinner.hide();
    alert(err.error.message);
  }
  )
}
  deleteItem(id:any){

Swal.fire({
  text: 'Are you sure you want to delete.',
  showDenyButton: true,
  showCancelButton: false,
allowOutsideClick:false,
  confirmButtonText: 'Ok',
  denyButtonText: `Cancel`,
  icon:"warning"
}).then((result:any) => {
  if (result.isConfirmed) {
this.api.deleteEmployees(id)
let payload ={
  collectionName :urlConfig.staffDetailsList
}
this.baseApi.delete(`${urlConfig.deletePath}/${id}`, payload)
.subscribe((res:any)=>{
  if(res?.status == "success"){
    this.getLoginLogoutList()
    Swal.fire({
      text:'Successfully deleted',
      icon:'success',
    })
  }
})
  } else if (result.isDenied) {

  }
});
  }
}
