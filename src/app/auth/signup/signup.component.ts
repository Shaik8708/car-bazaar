import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { catchError, finalize } from 'rxjs';
import urlConfig from './../../config/url.config.json';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { EmployeeDetails } from 'src/app/interface/common.interface';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  stateData: any;
  registerForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router,
    private baseApi: BaseApiService, private spinner: NgxSpinnerService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      accountType: "staff",
      type: "password",
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.stateData = navigation?.extras?.state || {};

    if (!this.stateData || Object.keys(this.stateData).length === 0) {
      this.stateData = history.state;
      let someKey = this.stateData?.someKey;
      this.registerForm.patchValue({
        fullName: someKey?.staffName,
        phoneNumber: someKey?.phoneNumber,
        city: someKey?.city,
        email: someKey?.email,
        accountType: "staff",
        type: "password",
      });
    }
  }

  onSubmit() {

    if (this.registerForm?.valid) {
      const data = this.registerForm.value;
      this.spinner.show();
      this.baseApi.post(urlConfig.staffRegisterPath, data)
        .pipe(
          catchError((error) => {
            alert(error?.error?.message);
            throw error
          }),
          finalize(() => {
            // this.spinner.hide();
          })
        )
        .subscribe((res: any) => {
          if (res?.status === "success") {
            this.updateStaffDetails(res?.data);
          }
        }
        )
    }
  }

  updateStaffDetails(RegisteredData:any) {

    let someKey = this.stateData?.someKey;
    // let staffId = this.stateData?.staffId;

    const employeeDetails = {
      staffName: someKey?.staffName,
      designation: someKey?.designation,
      qualification: someKey?.qualification,
      phoneNumber: someKey?.phoneNumber,
      city: someKey?.city,
      email: someKey?.email,
      address: someKey?.address,
      collectionName: someKey?.collectionName,
      dob: someKey?.dob,
      status: someKey?.status,
      isResgistered: true,
      staffId: RegisteredData?._id,
      username: RegisteredData?.username
    };
    console.log(employeeDetails)
    this.baseApi.post(urlConfig.createPath, employeeDetails)

      .pipe(
        catchError((error) => {
          alert(error?.error?.message);
          throw error
        }),
        finalize(() => {
          this.spinner.hide();

        })
      )
      .subscribe((res: any) => {
        if (res?.status === "success") {
          alert(`Staff Registered Successfully.`)

          this.router.navigateByUrl('/employees');
        }
      }
      )
  }
}
