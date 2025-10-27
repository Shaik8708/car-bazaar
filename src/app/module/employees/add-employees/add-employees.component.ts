import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs';
import { EmployeeDetails } from 'src/app/interface/common.interface';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from '../../../config/url.config.json';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-employees',
  templateUrl: './add-employees.component.html',
  styleUrls: ['./add-employees.component.css']
})
export class AddEmployeesComponent implements OnInit {
  loader = false;
  enableOtpInput = false;
  otp: any;
  editId:any ="";

  addStaffForm: FormGroup = new FormGroup({});
  images: any = []
  staffId:any;
  username:any;
  constructor(private fb: FormBuilder, private api: ApiService, private _activate: ActivatedRoute, private route: Router,
    private baseApi: BaseApiService, private spinner: NgxSpinnerService
  ) {
    this.addStaffForm = this.fb.group({
      staffName: ['', [Validators.required]],
      designation: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: ['', [Validators.required]],
      employeePicture: [""],
      collectionName: "staffDetails",
      isResgistered: "false",
      staffId: "",
      username: "",
      status: "true",
      dob: ['', [Validators.required]],

      // staffType:['', [Validators.required]],
      refferedBy:[''],
      refferedByPhoneNo:['']
    });
  }
  ngOnInit() {
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
      collectionName:urlConfig.staffDetailsList,
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
        this.addStaffForm.patchValue({
          staffName: res?.data?.staffName,
          designation: res?.data?.designation,
          qualification: res?.data?.qualification,
          phoneNumber: res?.data?.phoneNumber,
          city: res?.data?.city,
          email: res?.data?.email,
          address: res?.data?.address,
          employeePicture: res?.data?.employeePicture,
          collectionName: "staffDetails", // Static value if not from the API
          isResgistered: res?.data?.isResgistered || false,
          staffType: res?.data?.staffType,
          refferedBy: res?.data?.refferedBy,
          refferedByPhoneNo: res?.data?.refferedByPhoneNo,
          staffId: res?.data?.staffId,
          dob: res?.data?.dob,
          status: res?.data?.status,
          username: res?.data?.username,
        });

        this.staffId = res?.data?.staffId
        this.username = res?.data?.username
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


  generateOtp() {
    this.loader = true;
    const formData = this.addStaffForm.value;
    console.log(formData);


    const data = {
      phoneOTP: this.otp,
      phoneNumber: formData?.phoneNumber
    }
    this.api.staffVerifyOtp(data)
      .pipe(
        catchError(error => {
          alert(error?.error?.message);
          throw error
        }),
        finalize(() => {
          this.loader = false;
        })
      ).subscribe((res: any) => {

      })
  }


  onSubmit() {

    if (this.addStaffForm.valid) {
      console.log('working')
      // const data = this.addStaffForm.value;
      // console.log(data);
      this.loader = true;
      const employeeDetails: EmployeeDetails = {
        employeePicture: this.addStaffForm.value.employeePicture, 
        arrayImages: this.addStaffForm.value.arrayImages,
        staffName: this.addStaffForm.value.staffName,
        designation: this.addStaffForm.value.designation,
        qualification: this.addStaffForm.value.qualification,
        phoneNumber: this.addStaffForm.value.phoneNumber,
        city: this.addStaffForm.value.city,
        email: this.addStaffForm.value.email,
        address: this.addStaffForm.value.address,
        collectionName:this.addStaffForm.value.collectionName,
        isResgistered:this.addStaffForm.value.isResgistered,
        dob:this.addStaffForm.value.dob,
        status:this.addStaffForm.value.status
      };
      console.log(employeeDetails)

      let path = this.editId ?urlConfig.updatePath + this.editId :urlConfig.createPath
      let urlMethod:any = this.editId ? this.baseApi.patch.bind(this.baseApi): this.baseApi.post.bind(this.baseApi);
      // this.api.createStaff(employeeDetails)
      urlMethod(path, employeeDetails)
        .pipe(
          catchError((error) => {
            alert(error?.error?.message);
            throw error
          }),
          finalize(() => {
            this.loader = false;
          })
        )
        .subscribe((res: any) => {
          if (res?.status === "success") {
            let text = this.editId?'Updated':'Created'

            alert(`Staff Details ${text} Successfully.`)
            this.route.navigateByUrl('/employees');
          }
          // this.enableOtpInput = true;
          // alert("Successfully Staff Registered");
        }
        )
    }
  }

  nativateTo(){
    this.route.navigate(['/signup'], { state: { someKey: this.addStaffForm?.value, staffId:this.editId } });
  }
}
