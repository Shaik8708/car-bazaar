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
import urlConfig from '../../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';
import { DealerDetails } from 'src/app/interface/common.interface';
@Component({
  selector: 'app-update-dealer-details',
  templateUrl: './update-dealer-details.component.html',
  styleUrl: './update-dealer-details.component.css'
})
export class UpdateDealerDetailsComponent implements OnInit {
  addDealerForm: FormGroup = new FormGroup({});
  cityIdSelected: string = "";
  cityNameSelected: string = "";
  cityList: any;
  responseData:any;
  editId:any ="";
  selectedCity: { cityId: string; cityName: string } | null = null;




  aadharImg: any;
  bussinessCardImg: any;
  letterHeadImg: any;
  workLicenceImg: any;
  shopDetailImg: any;

  constructor(private fb: FormBuilder, private api: ApiService, private _activate: ActivatedRoute, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService,
    private router:Router
  ) {
    this.addDealerForm = this.fb.group({
      email: [''],
      username: [''],
      dealerId: [''],
      fullName: [''],
      phoneNumber: ['', [Validators.required]],
      cityId: [''],
      city: [''],
      shopRegisteredName: [''],
      aadharCardNumber: [''],
      dob: [''],
      // password: ['pass@123'],
      dealerPicture: [""],
      collectionName: "dealerDetails",
      isResgistered: "false",
      initialVerification: "false",
      bussinessDocumentVerification: "false",
      shopAddress: "",
      status: "false",



      aadharCard: [''],
      businessCard: [''],
      letterHead: [''],
      workLicense: [''],
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
      collectionName:urlConfig.dealerDetails,
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
          dealerId: res?.data?.dealerId,
          username: res?.data?.username,
          aadharCardNumber: res?.data?.aadharCardNumber,
          shopRegisteredName: res?.data?.shopRegisteredName,
          phoneNumber: res?.data?.phoneNumber,
          cityId: res?.data?.cityId,
          city: res?.data?.city,
          email: res?.data?.email,
          dealerPicture: res?.data?.dealerPicture,
          collectionName: "dealerDetails", 
          isResgistered: res?.data?.isResgistered || false,
          dob: res?.data?.dob,
          status: res?.data?.status,
          initialVerification: res?.data?.initialVerification,
          bussinessDocumentVerification: res?.data?.bussinessDocumentVerification,
          shopAddress: res?.data?.shopAddress,
        });
        this.selectedCity = {
          cityId: res?.data?.cityId,
          cityName: res?.data?.city
        };
        console.log(this.selectedCity)
        this.responseData = res?.data;

        this.aadharImg =  this.responseData?.aadharCard?.length > 0 ? this.responseData?.aadharCard[0]?.img :'';
        this.bussinessCardImg = this.responseData?.businessCard?.length > 0 ? this.responseData?.businessCard[0]?.img :'';
        this.letterHeadImg = this.responseData?.letterHead?.length > 0 ? this.responseData?.letterHead[0]?.img :'';
        this.workLicenceImg = this.responseData?.workLicense?.length > 0 ? this.responseData?.workLicense[0]?.img :'';
        this.shopDetailImg = this.responseData?.shopDetail?.length > 0 ? this.responseData?.shopDetail[0]?.img :'';
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
    // const data = this.addDealerForm.value;
    // data.username = data.fullName;
    // data.cityId = this.citySelected;

    // if (!this.addDealerForm.valid || !this.cityIdSelected) {
    if (!this.addDealerForm.valid) {
      // this.addDealerForm.markAllAsTouched();
      alert("You have missed our some fieds");
    }
    else {


      this.spinner.show();
      const dealerDetails: DealerDetails = {
        dealerPicture: this.addDealerForm.value.employeePicture, 
        arrayImages: this.addDealerForm.value.arrayImages,
        fullName: this.addDealerForm.value.fullName,
        shopRegisteredName: this.addDealerForm.value.shopRegisteredName,
        aadharCardNumber: this.addDealerForm.value.aadharCardNumber,
        phoneNumber: this.addDealerForm.value.phoneNumber,
        cityId: this.cityIdSelected,
        city: this.cityNameSelected,
        email: this.addDealerForm.value.email,
        collectionName:this.addDealerForm.value.collectionName,
        isResgistered:this.addDealerForm.value.isResgistered,
        dob:this.addDealerForm.value.dob,
        status:this.addDealerForm.value.status,
        initialVerification:this.addDealerForm.value.initialVerification,
        bussinessDocumentVerification:this.addDealerForm.value.bussinessDocumentVerification,
        shopAddress:this.addDealerForm.value.shopAddress,
        username:this.addDealerForm.value.username,
        dealerId:this.addDealerForm.value.dealerId,

        // dealerPicture: data?.employeePicture,
        aadharCard: [{ img: this.aadharImg }],
        businessCard: [{ img: this.bussinessCardImg }],
        workLicense: [{ img: this.workLicenceImg }],
        letterHead: [{ img: this.letterHeadImg }],
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
          this.router.navigateByUrl('/dealer-details-list');

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

  dynamicFileChangeEvent(fileInput: any, imageVariable: any) {
    this.fileChangeEvent(fileInput).then((base64:any) => {
      this[imageVariable] = base64;
    });
  }

  fileChangeEvent(fileInput: any) {
    return new Promise((res, rej) => {
      if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;

        // if (fileInput.target.files[0].size > max_size) {
        //   this.imageError =
        //     'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        //   return false;
        // }

        // if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        //     this.imageError = 'Only Images are allowed ( JPG | PNG )';
        //     return false;
        // }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            const img_height = rs.currentTarget['height'];
            const img_width = rs.currentTarget['width'];

            console.log(img_height, img_width);


            if (img_height > max_height && img_width > max_width) {
              return false;
            } else {
              const imgBase64Path = e.target.result;
              let resultImage;
              let max_size = 1.5e+6
              if (fileInput.target.files[0].size > max_size) {
                this.compressImage(imgBase64Path, 400, 400).then(compressed => {
                  resultImage = compressed;
                });
              } else {
                resultImage = imgBase64Path;
              }
              res(resultImage);
            }
          };
        };

        reader.readAsDataURL(fileInput.target.files[0]);
      }
    })

  }

  removeImg(imgVariable:any) {
    this[imgVariable] = null;
  }

  compressImage(src:any, newX:any, newY:any) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }
}
