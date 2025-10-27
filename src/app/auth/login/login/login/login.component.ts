import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ObservableService } from 'src/app/services/observable.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from '../../../../config/url.config.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  isLoading = false;
  ph: any = "";
  em: any = "";
  pass: any = "";
  // selectedType: any = 'staff';

  constructor(
    private fb: FormBuilder,
    private api: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private fetch: ObservableService,
    private baseApi:BaseApiService
  ) { }

  ngOnInit(): void {
    this.fetch.navSerachBar("");

    this.ph = localStorage.getItem('phoneNumber');
    this.pass = localStorage.getItem('pass');
    this.em = localStorage.getItem('emailSt');

    this.loginForm = this.fb.group({
      email: this.em,
      phoneNumber: [this.ph],
      password: [this.pass, [Validators.required]],
    });
  }



  onSubmit() {
    const data = this.loginForm.value;
    data.loginMethod = "password";
    this.isLoading = true;
    // if (this.selectedType == 'other') {
    localStorage.setItem('phoneNumber', data?.phoneNumber);
    localStorage.setItem('pass', data?.password);
    this.api.adminLogin(data).subscribe(
      (res: any) => {
        if (res?.status == 'success') {
          if (res?.data?.accountType == "admin" || res?.data?.accountType == "staff") {
            this.toastr.success('Login Successfull');
            localStorage.setItem('oju23ui34', res?.data?.accessToken);

            // localStorage.setItem('typeAcce', 'other');
            localStorage.setItem('loiuy324re', res?.data?.fullName);
            localStorage.setItem('loiuy09un', res?.data?.username);
            localStorage.setItem('loiuid', res?.data?._id);
            localStorage.setItem('loiu0ac', res?.data?.accountType);
            // this.logLoginData(res?.data?._id, res?.data?.accountType, res?.data?.fullName, res?.data?.username);

            this.fetch.setLoginStatus(true);
            this.fetch.fetchData(res?.data?.username);
            this.fetch.navSerachBar("");
            this.router.navigateByUrl('/leads');
          } else {
            this.toastr.error('Login with correct credentials');
          }
        } else if (res?.message == 'Required Parameters!') {
          this.toastr.error('Required Parameters!');
        } else {
          this.toastr.error(res?.message);
        }
        this.isLoading = false;
      },
      (err: any) => {
        console.log(err)
        this.isLoading = false;
        this.toastr.error(err?.error?.message);

      }
    );
    // } else {
    //   localStorage.setItem('emailSt', data?.email);
    //   this.api.staffLogin(data).subscribe(
    //     (res: any) => {
    //       if (res?.status == 'success') {
    //         this.fetch.setLoginStatus(true);
    //         if (res?.data?.accountType == "stuff") {
    //           this.toastr.success('Login Successfull');
    //           localStorage.setItem('oju23ui34', res?.data?.accessToken);
    //           localStorage.setItem('loiuy324re', res?.data?.username);
    //           localStorage.setItem('employeeName', res?.data?.employeeName);
    //           localStorage.setItem('loiuid', res?.data?._id);
    //           localStorage.setItem('typeAcce', 'staff');
    //           this.fetch.fetchData(res?.data?.username);
    //           this.fetch.navSerachBar("");
    //           this.router.navigateByUrl('/leads');
    //         } else {
    //           this.toastr.error('Login with staff credentials');
    //         }
    //       } else if (res?.message == 'Required Parameters!') {
    //         this.toastr.error('Required Parameters!');
    //       } else {
    //         this.toastr.error(res?.message);
    //       }

    //       this.isLoading = false;
    //     },
    //     (err: any) => {
    //       console.log(err)
    //       this.isLoading = false;
    //       this.toastr.error(err?.error?.message);
    //     }
    //   );
    // }
  }

  logLoginData(staffId:any, accountType:any, fullName:any, username:any){
    let createdDate = this.convertToDDMMYYYY(new Date());
    let payload = {
      collectionName:urlConfig.loginLogs,
      id:staffId,
      accountType:accountType,
      createdDate:createdDate,
      fullName:fullName,
      username:username,
      logType:'login'
    }

    this.baseApi.post(`${urlConfig.createPath}`,payload)
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
    }, (err: any) => {
      alert(err.error.message);
    }
    )
  }

  convertToDDMMYYYY(dateString: any): any {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
