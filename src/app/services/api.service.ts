import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit, SkipSelf } from '@angular/core';
import { ObservableService } from './observable.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ApiService implements OnInit {
  baseUrl = environment?.baseUrl;
  getData: any
  constructor(private http: HttpClient, private fetch: ObservableService) {
  }

  ngOnInit(): void {
  }

  postVehicle(data: any) {
    return this.http.post(`https://sheetdb.io/api/v1/fovjakpnx9d6c`, data)
  }

  postValuationForm(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/product/`, data)
  }
  postValuationFormSheetDb(data: any) {
    return this.http.post(`https://sheetdb.io/api/v1/m1pbsf0u6cpap`, data)
  }

  getValuationForm() {
    return this.http.get(`${this.baseUrl}/dev/admin/product`)
  }

  otpLogin(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/auth/login`, data)
  }

  otpRegister(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/auth/register`, data)
  }

  refreshOtp(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/auth/refresh-otp`, data)
  }

  addDealerForm(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/dealer/register`, data)
  }

  assignLeadToDealer(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/dealer/assign/${id}`, data)
  }
  removeAssignLeadToDealer(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/dealer/assign-remove/${id}`, data)
  }

  getAssignLeadToDealer() {
    return this.http.get(`${this.baseUrl}/dev/admin/dealer/assign`)
  }
















  getAllDealers() {
    return this.http.get(`${this.baseUrl}/dev/admin/dealer?pagination=false`)
  }

  getUsers() {
    return this.http.get(`${this.baseUrl}/dev/admin/user`)
  }

  blockuser(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/user/block/${id}`, data)
  }

  getCityListParams(params: any) {
    return this.http.get(`${this.baseUrl}/dev/address/location/get-locations/?page=${params.page}&limit=${params.limit}`)
  }

  getCityList() {
    return this.http.get(`${this.baseUrl}/dev/address/location/get-locations`)
  }

  createCity(data: any) {
    return this.http.post(`${this.baseUrl}/dev/address/location/craete`, data)
  }



  createDealerQuotation(data: any) {
    return this.http.post(`${this.baseUrl}/dev/dealer/dealer-quotation`, data)
  }

  getAllDealerQuotation() {
    return this.http.get(`${this.baseUrl}/dev/dealer/dealer-quotation`)
  }

  deleteDealerQuotation(id: any) {
    return this.http.delete(`${this.baseUrl}/dev/dealer/dealer-quotation/${id}`)
  }

  getDealerQuotation(id: any) {
    return this.http.get(`${this.baseUrl}/dev/dealer/dealer-quotation/${id}`)
  }

  //  filtered arrays leads start
  getFilteredLeads(params: any) {
let data = localStorage.getItem('leadValue')
 switch (data) {
      case 'null':
        console.log('null');
        return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}`);
      case 'NEW-DATA':
        console.log('newdata');
        return this.http.get(`${this.baseUrl}/dev/admin/product?type=${data}&page=${params.page}&limit=${params.limit}`);
      case 'vp':
        console.log('vp');
        return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=${params.page}&page=${params.page}&limit=${params.limit}`);
      case 'rc':
        return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=${params.page}&page=${params.page}&limit=${params.limit}`);
      case 'rce':
        return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=0&page=${params.page}&limit=${params.limit}`);

        case 'NotReachable&page':
        return this.http.get(`${this.baseUrl}/dev/admin/product?type=${data}=${params.page}&page=${params.page}&limit=${params.limit}`);

        case 'dqTddF':
        return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=0&page=${params.page}&limit=${params.limit}`);

        case 'vpe':
          return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=0&page=${params.page}&limit=${params.limit}`);
          case 'cp':
            return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=0&page=${params.page}&limit=${params.limit}`);
            case 'cpe':
              return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=${params.page}&page=${params.page}&limit=${params.limit}`);
      
      default:
        // You might want to add a default case to handle unexpected values of `data`
        return this.http.get(`${this.baseUrl}/dev/admin/product?type=${data}&page=${params.page}&limit=${params.limit}`);

      // You can also throw an error or return a specific value here
    }


  }
  //  filtered arrays leads ends
  getNewFormData(params: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}`)
  }

  getNewFormDataBydate(params: any, date: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}&date=${date}`)
  }

  getNewFormDataByPh(params: any, ph: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}&phoneNumber=${ph}`)
  }




  getLeadWithVehiclePicture(params: any, data: any) {
    console.log(data);

    return this.http.get(`${this.baseUrl}/dev/admin/product/filters?${data}=${params.page}&page=${params.page}&limit=${params.limit}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/product/?page=${params.page}&limit=${params.limit}`)
  }



  getNewFormDataByDate(params: any, filter: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/product?page=${params.page}&limit=${params.limit}&${filter}`)
  }
  getTest() {


    let s = "8008365366"

    return this.http.get(`${this.baseUrl}/dev/admin/product?${s}`)
  }

  getLeadById(id: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/product/${id}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/product/${id}`)
  }

  updateLeadById(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/product/${id}`, data)
  }

  verifyDealerById(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/admin/verify-dealer/${id}`, data)
  }

  verifyBussinessDetailsDealerById(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/dealer/verify-business-details/${id}`, data)
  }

  getLeadsAssignedTODealer(id: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/dealer?_id=${id}`)
  }

  deleteDealer(id: any) {
    return this.http.delete(`${this.baseUrl}/dev/admin/dealer?_id=${id}`)
  }

  getDealersByCityId(id: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/dealer?cityId=${id}`)
  }

  getLeadsByStatus(params: any, status: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }

  updateStatus(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/admin/product/${id}`, data)
  }



  getAllEmployees() {
    return this.http.get(`${this.baseUrl}/dev/admin/employee`)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }
  createEmployees(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/employee`, data)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }
  updateEmployees(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/employee/${id}`, data)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }
  deleteEmployees(id: any) {
    return this.http.delete(`${this.baseUrl}/dev/admin/employee/${id}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }
  getAllEmployeesById(id: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/employee/${id}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }





  ////// blogs


  getBlogs() {
    return this.http.get(`${this.baseUrl}/dev/admin/admin/blog`)
  }
  getBlogsById(id: any) {
    return this.http.get(`${this.baseUrl}/dev/admin/admin/blog/${id}`)
  }
  addBlogs(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/admin/blog`, data)
  }
  updateBlogs(id: any, data: any) {
    return this.http.patch(`${this.baseUrl}/dev/admin/admin/blog/${id}`, data)
  }
  deleteBlogs(id: any) {
    return this.http.delete(`${this.baseUrl}/dev/admin/admin/blog/${id}`)
    // return this.http.get(`${this.baseUrl}/dev/admin/admin/product?type=${status}&page=${params.page}&limit=${params.limit}`)
  }







































  createStaff(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/employee/createStuff`, data)
  }

  staffVerifyOtp(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/employee/verify-otp`, data)
  }

  staffResendOtp(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/employee/resend-otp`, data)
  }


  staffProfile(data: any) {
    return this.http.post(`${this.baseUrl}/dev/admin/employee/profile`, data)
  }
}

