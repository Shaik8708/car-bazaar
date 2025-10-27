import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, SkipSelf } from '@angular/core';
import { environment } from 'src/environments/environment';


// const header = new HttpHeaders({
//   Authorization: 'Bearer ' + localStorage.getItem('kju23ui34'),
// });

// const headerToken = { headers: header };

@Injectable({
  providedIn: 'root'
})

export class AuthService  implements OnInit{
  baseUrl = environment?.baseUrl;
  constructor(private http: HttpClient,) {
  }

  ngOnInit(): void {

  }



  adminLogin(data:any) {

    return this.http.post(`${this.baseUrl}/admin/login`,data)
    // return this.http.post(`${this.baseUrl}/staff/login`,data)
  }

  staffLogin(data:any) {
    return this.http.post(`${this.baseUrl}/dev/employee/login`,data)
  }

  otpRegister(data:any) {
    return this.http.post(`${this.baseUrl}/admin/register`,data)
  }


}
