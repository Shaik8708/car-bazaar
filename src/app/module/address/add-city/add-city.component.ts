import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/environments/environment';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit{
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  pagination: any = null;
  lastpage: any;
  totalList: any;
  
  addCityForm: FormGroup = new FormGroup({});
  cityList:any;


  constructor(private fb: FormBuilder, private api:ApiService, private spinner: NgxSpinnerService,private paginationService: PaginationService,private toastr: ToastrService,
    private router: Router, private baseApi: BaseApiService) {


    this.addCityForm = this.fb.group({
      cityName: [''],  
    });

   
   



  }

  ngOnInit(): void {
    this.getCityList();
    this.addCityForm.get('cityName').valueChanges.subscribe((event) => {
      this.addCityForm.get('cityName').setValue(event.toLowerCase(), {emitEvent: false});
   })


  }

 

  onSubmit() {
    const data = this.addCityForm.value;


    if(!this.addCityForm.valid) {
        alert("Please add the city name");
      }
    else{
      this.baseApi.post(urlConfig.locations, data)
      .pipe(
        finalize(() => {
         
        }),
        catchError(error => {
          throw error;
        })
      )

      //  this.api.createCity(data)
       .subscribe((res:any) => {
        console.log(res)

         if(res?.status == "success"){
          alert("Successfully Location Created!");
          this.addCityForm.reset();
     

         }else {
        alert(res?.message);

         }

       }
      //  ,
      //  (err:any) => {
      //   alert(err?.error?.message);

      //  }
      )





    }

  }

  getPage(data: any) {
    this.currentPage = data?.page;
    console.log("data", this.currentPage);
    this.currentPageLimit = data?.limit;
    this.getCityList();
  }

  getCityList(){
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };
    this.spinner.show();
    // this.api.getCityListParams(params)
    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.locations}`)

    .subscribe((res:any) => {
      console.log(res);
      // if(res?.message == "Successfully All Locations Fetched"){
      //   this.cityList = res?.data?.docs;
      // }
      // else{
      //   alert("Something went wrong, Try again");
      // }


      if(res?.data?.length != 0){
        this.pagination = this.paginationService.getPager(
          res.data["totalDocs"],
          this.currentPage,
          this.currentPageLimit
        );
  
        this.cityList = [];
  
      this.cityList = res?.data?.docs;
        this.totalList = res?.data?.totalDocs;
  
       
       }
       else if(res?.data?.length == 0){
  
  
      this.pagination = null;
       }
  
        else if(res?.message == "jwt expired"){
          this.toastr.error("Token Expired, Loggin Again");
          this.pagination = null;
          this.router.navigateByUrl('/login');
  
  
        }
        else{
          this.toastr.error(res?.message);
        }
      this.spinner.hide();
    },(err:any)=>{
      this.spinner.hide();
      alert(err.error.message);
    }
    )
  }

}
