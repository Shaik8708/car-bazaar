import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';
import { DealerDetails } from 'src/app/interface/common.interface';
@Component({
  selector: 'app-add-dealers',
  templateUrl: './add-dealers.component.html',
  styleUrls: ['./add-dealers.component.css']
})
export class AddDealersComponent implements OnInit {
  addDealerForm: FormGroup = new FormGroup({});
  cityIdSelected: string = "";
  cityNameSelected: string = "";
  cityList: any;
  editId:any ="";
  selectedCity: { cityId: string; cityName: string } | null = null;

  constructor(private fb: FormBuilder, private api: ApiService, private _activate: ActivatedRoute, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService,
    private router:Router
  ) {
    this.addDealerForm = this.fb.group({
      email: [''],
      // username: [''],
      fullName: [''],
      phoneNumber: ['', [Validators.required]],
      cityId: [''],
      cityName: [''],
      businessName: [''],
      businessAddress: [''],
      businessPincode: [''],
      address: [''],
      aadharCardNumber: [''],
      dob: [''],
      // password: ['pass@123'],
      dealerPicture: [""],
      collectionName: "dealer",
      isResgistered: "false",
      status: "true"
    });
  }

  ngOnInit() {
    this.getCityList();
    this._activate.paramMap.subscribe(params => {
      this.editId = params.get('id') || '';
    });

    if(this.editId){
      this.getDetailsById()
    }
  }

  getDetailsById(){
    // this.api.getUsers()
    
    this.spinner.show();
    let payload = {
      collectionName:urlConfig.dealer,
      id:this.editId
    }

    this.baseApi.post(`${urlConfig.getOnePath}`,payload)
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
        this.addDealerForm.patchValue({
          fullName: res?.data?.fullName,
          aadharCardNumber: res?.data?.aadharCardNumber,
          businessName: res?.data?.businessName,
          businessAddress: res?.data?.businessAddress,
          businessPincode: res?.data?.businessPincode,
          phoneNumber: res?.data?.phoneNumber,
          cityId: res?.data?.cityId,
          cityName: res?.data?.cityName,
          email: res?.data?.email,
          address: res?.data?.address,
          dealerPicture: res?.data?.dealerPicture,
          collectionName: "dealer", 
          isResgistered: res?.data?.isResgistered || false,
          // dealerId: res?.data?.dealerId,
          dob: res?.data?.dob,
          status: res?.data?.status
        });
        this.selectedCity = {
          cityId: res?.data?.cityId,
          cityName: res?.data?.city
        };
        console.log(this.selectedCity)
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


  getDealersByCity() {
    if (this.selectedCity) {
      this.cityIdSelected = this.selectedCity.cityId;
      this.cityNameSelected = this.selectedCity.cityName;
    } else {
      console.log("No city selected");
    }
  }

  getCityList() {

    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.locations}`)
    .subscribe((res: any) => {
      console.log(res);
      if (res?.status == "success") {
        this.cityList = res?.data?.docs;
      }
      else {
        alert("Something went wrong, Try again");
      }



    }, (err: any) => {
      alert(err.error.message);
    }
    )
  }

  onSubmit() {
    const data = this.addDealerForm.value;
    // data.username = data.fullName;
    // data.cityId = this.citySelected;

    // if (!this.addDealerForm.valid || !this.cityIdSelected) {
    if (!this.addDealerForm.valid) {
      // this.addDealerForm.markAllAsTouched();
      alert("You have missed our some fieds");
    }
    else {


      this.spinner.show();
      const dealerDetails = {
        dealerPicture: this.addDealerForm.value.employeePicture, 
        arrayImages: this.addDealerForm.value.arrayImages,
        fullName: this.addDealerForm.value.fullName,
        shopRegisteredName: this.addDealerForm.value.shopRegisteredName,
        aadharCardNumber: this.addDealerForm.value.aadharCardNumber,
        phoneNumber: this.addDealerForm.value.phoneNumber,
        cityId: this.cityIdSelected,
        cityName: this.cityNameSelected,
        email: this.addDealerForm.value.email,
        businessName: this.addDealerForm.value.businessName,
        businessAddress: this.addDealerForm.value.businessAddress,
        businessPincode: this.addDealerForm.value.businessPincode,
        collectionName:this.addDealerForm.value.collectionName,
        isResgistered:this.addDealerForm.value.isResgistered,
        dob:this.addDealerForm.value.dob,
        status:this.addDealerForm.value.status,
        initialVerification:this.addDealerForm.value.initialVerification,
        bussinessDocumentVerification:this.addDealerForm.value.bussinessDocumentVerification
      };
      console.log(dealerDetails)

      let path = this.editId ?urlConfig.updatePath + this.editId :urlConfig.createPath
      let urlMethod:any = this.editId ? this.baseApi.patch.bind(this.baseApi): this.baseApi.post.bind(this.baseApi);
      // this.api.createStaff(employeeDetails)
      urlMethod(path, dealerDetails)
      .pipe(
        finalize(() => {
         
        }),
        catchError(error => {
          throw error;
        })
      )
      
      .subscribe((res: any) => {
        this.spinner.hide();
        if (res?.status == "success") {
          let text = this.editId?'Updated':'Created'

            alert(`Successfully Dealer Details ${text}.`)

          // window.location.reload();
          this.router.navigateByUrl('/dealers');

        } else {
          this.spinner.hide();

          alert(res?.message);

        }

      },
        (err: any) => {
          this.spinner.hide();

          alert(err.error.message);

        })





    }

  }

  nativateTo(){
    this.router.navigate(['/signup'], { state: { someKey: this.addDealerForm?.value, staffId:this.editId } });
  }

}
