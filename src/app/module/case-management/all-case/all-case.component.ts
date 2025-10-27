import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import Swal from 'sweetalert2';
import urlConfig from '../../../config/url.config.json';

@Component({
  selector: 'app-all-case',
  templateUrl: './all-case.component.html',
  styleUrl: './all-case.component.css'
})
export class AllCaseComponent {
  allCase:any;
loader=false
  constructor(private api:ApiService, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService
  ) {}

  ngOnInit(): void {
   this.get()

  }
get(){
  this.loader=true
  // this.api.getAllEmployees()
  this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.scrapLeadCase}`)
  .subscribe((res:any) => {
   this.loader=false
    if(res?.status == "success"){
      this.allCase = res?.data?.docs;
      
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
    this.get()
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

  openLead(id:any){
    const baseUrl = window.location.origin; // auto-detects current domain + port
    const fullUrl = `${baseUrl}/edit-lead/${id}`;
    window.open(fullUrl, '_blank');
  }
}
