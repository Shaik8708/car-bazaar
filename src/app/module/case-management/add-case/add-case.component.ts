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
  selector: 'app-add-case',
  templateUrl: './add-case.component.html',
  styleUrl: './add-case.component.css'
})

export class AddCaseComponent implements OnInit {
  loader = false;
  enableOtpInput = false;
  otp: any;
  editId:any ="";

  addStaffForm: FormGroup = new FormGroup({});
  images: any = []
  staffId:any;
  leadId:any;
  constructor(private fb: FormBuilder, private api: ApiService, private _activate: ActivatedRoute, private route: Router,
    private baseApi: BaseApiService, private spinner: NgxSpinnerService
  ) {
    this.addStaffForm = this.fb.group({
      staffName: ['', [Validators.required]],
      caseIssueBy: ['', [Validators.required]],
      calledDate: ['', [Validators.required]],
      caseType: ['', [Validators.required]],
      userPhoneNo: ['', [Validators.required]],
      city: ['', [Validators.required]],
      dealerName: ['', [Validators.required]],
      dealerUserName: ['', [Validators.required]],
      // employeePicture: [""],
      // collectionName: "staffDetails",
      // staffUserName: "false",
      staffId: "",
      username: "",
      status: "true",
      comment: ['', [Validators.required]],

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
      collectionName:urlConfig.scrapLeadCase,
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
          staffName: res?.data?.caseData[0]?.staffName,
          caseIssueBy: res?.data?.createdAt,
          calledDate: res?.data?.caseData[0]?.calledDate,
          caseType: res?.data?.caseData[0]?.caseType,
          userPhoneNo: res?.data?.caseData[0]?.userPhoneNo,
          city: res?.data?.caseData[0]?.city,
          dealerName: res?.data?.caseData[0]?.dealerName,
          dealerUserName: res?.data?.caseData[0]?.dealerUserName,
          employeePicture: res?.data?.caseData[0]?.employeePicture,
          // collectionName: , 
          staffUserName: res?.data?.caseData[0]?.staffUserName || false,
          staffType: res?.data?.caseData[0]?.staffType,
          refferedBy: res?.data?.caseData[0]?.refferedBy,
          refferedByPhoneNo: res?.data?.caseData[0]?.refferedByPhoneNo,
          staffId: res?.data?.caseData[0]?.staffId,
          comment: res?.data?.caseData[0]?.comment,
          status: res?.data?.caseData[0]?.status,
          username: res?.data?.caseData[0]?.username,
        });

        this.staffId = res?.data?.caseData[0]?.staffId
        this.leadId = res?.data?.leadId
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
      userPhoneNo: formData?.userPhoneNo
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
      const employeeDetails = {
        // employeePicture: this.addStaffForm.value.employeePicture, 
        // arrayImages: this.addStaffForm.value.arrayImages,
        staffName: this.addStaffForm.value.staffName,
        caseIssueBy: this.addStaffForm.value.caseIssueBy,
        calledDate: this.addStaffForm.value.calledDate,
        caseType: this.addStaffForm.value.caseType,
        userPhoneNo: this.addStaffForm.value.userPhoneNo,
        city: this.addStaffForm.value.city,
        dealerName: this.addStaffForm.value.dealerName,
        dealerUserName: this.addStaffForm.value.dealerUserName,
        collectionName:this.addStaffForm.value.collectionName,
        staffUserName:this.addStaffForm.value.staffUserName,
        comment:this.addStaffForm.value.comment,
        status:this.addStaffForm.value.status
      };

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

  openLead(id:any){
    const baseUrl = window.location.origin; // auto-detects current domain + port
    const fullUrl = `${baseUrl}/edit-lead/${id}`;
    window.open(fullUrl, '_blank');
  }
}
