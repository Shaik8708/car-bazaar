import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  allUsers: any;
  cityList: any;
  currentPageLimit: any;
  currentPage: any;

  constructor(private api: ApiService, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
  this.getAllUsers();

  }

  getAllUsers(){
    // this.api.getUsers()
    
    const params = {
      page: 1,
      limit: 10,
    };

    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.users}`)
      .pipe(
        finalize(() => {
          // this.loaderVal = false;
        }),
        catchError(error => {
          // this.loaderVal = false; 
          console.error('Error fetching products:', error); // Log the error for debugging
          return []; // Return an empty array to prevent further processing
        })
      )
    
    .subscribe((res: any) => {
      console.log(res);
      if (res?.status == "success") {
        this.allUsers = res?.data?.docs.reverse();
      }
      else {
        alert("Something went wrong, Try again");
      }
      this.spinner.hide();
    }, (err: any) => {
      this.spinner.hide();
      alert(err.error.message);
    }
    )
  }
  
  verifyUser(id: any, data: any) {
    let isBlock;
    if(data?.value == 'true'){
      isBlock = true
    }else{
      isBlock = false 
    }
    
    let payload = {
      "isBlocked": isBlock
    }
    this.spinner.show();
    this.api.blockuser(id, payload).subscribe((res: any) => {
      console.log(res);
      if(res?.message == "Successfully Dealer Verified"){
        this.getAllUsers();
      }
      else{
        alert("Somethig went wrong!");
      }
      this.spinner.hide();
    }
    , (err: any) => {
      this.spinner.hide();
      alert(err.error.message);
    }
    
    )
  }

  getDealersByCity(id: any) {
    console.log(id?.value);
    this.allUsers = []
    this.api.getDealersByCityId(id?.value).subscribe((res: any) => {
      console.log(res)
      this.allUsers = res?.data?.docs;
    })
  }

  deleteDealer(id: any) {
    this.api.deleteDealer(id).subscribe((res: any) => {
      console.log(res)
    })
  }
}
