import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import urlConfig from '../../../../config/url.config.json';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';

@Component({
  selector: 'app-dealer-details-list',
  templateUrl: './dealer-details-list.component.html',
  styleUrl: './dealer-details-list.component.css'
})
export class DealerDetailsListComponent implements OnInit {
  allDealers: any;
  cityList: any;

  constructor(private api: ApiService, private spinner: NgxSpinnerService,
    private baseApi: BaseApiService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getAllDealers();
    this.getCityList();
  }

  getAllDealers() {
    // this.api.getAllDealers()
    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.dealerDetails}`)

      .subscribe((res: any) => {
        console.log(res);
        if (res?.status == "success") {
          this.allDealers = res?.data?.docs;
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
  verifyBussinessDetails(id: any, data: any) {

    let payload = {
      "isBusinessDetailsVerified": data?.value
    }
    this.spinner.show();
    this.api.verifyBussinessDetailsDealerById(id, payload).subscribe((res: any) => {
      console.log(res);
      if (res?.message == "Successfully Business Details Verified") {
        alert("successfully changes updated")
        this.getAllDealers();
      }
      else {
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
  verifyDealer(id: any, data: any) {

    let payload = {
      "verifyDealer": data?.value
    }
    this.spinner.show();
    this.api.verifyDealerById(id, payload).subscribe((res: any) => {
      console.log(res);
      if (res?.message == "Successfully Dealer Verified") {
        alert("successfully changes updated")

        this.getAllDealers();
      }
      else {
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
    this.allDealers = [];
    const cityid = id?.value == 'allCities' ? "": `&cityId=${id?.value}`
    // this.api.getDealersByCityId(id?.value)
    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.dealerDetails}${cityid}`)

    .subscribe((res: any) => {
      console.log(res)
      this.allDealers = res?.data?.docs;
    })
  }

  deleteDealer(id: any) {
    this.api.deleteDealer(id).subscribe((res: any) => {
      console.log(res)
    })
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



}
