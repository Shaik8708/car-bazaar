import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent {
  allDealers:any;
loader=false
  constructor(private api:ApiService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
   this.get()

  }
get(){
  this.loader=true
  this.api.getBlogs().subscribe((res:any) => {
    console.log(res);
    
   this.loader=false
    if(res?.message == "Successfully All Blogs Fetched"){
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
this.api.deleteBlogs(id).subscribe((res:any)=>{
  this.get()
  Swal.fire({
    text:'Successfully deleted',
    icon:'success',
  })
})
  } else if (result.isDenied) {

  }
});
  }
}
