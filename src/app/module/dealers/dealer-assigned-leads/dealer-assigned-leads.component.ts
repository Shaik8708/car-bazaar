import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/environments/environment';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-dealer-assigned-leads',
  templateUrl: './dealer-assigned-leads.component.html',
  styleUrls: ['./dealer-assigned-leads.component.css']
})
export class DealerAssignedLeadsComponent implements OnInit {
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  pagination: any = null;
  lastpage: any;
  totalList: any;
  dealerQuotation: any;
  userFinalAmount: any;
  dealerName: any = "";

  dealerQuotaionDetails: any;
  dealerDetails: any;

  constructor(private api: ApiService, private paginationService: PaginationService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService,
    private fetch: ObservableService, private _activated: ActivatedRoute,
    private baseApi: BaseApiService) { }

  ngOnInit(): void {
    this._activated.params.subscribe((res: any) => {
      console.log("res", res)
      this.getDealersData(res?.id);
      this.getDealerQuotationData(res?.id);
    })

  }

  getDealersData(Id: any) {
    // let payload = {
    //   collectionName: urlConfig.dealerDetails,
    //   dealerid: Id
    // }
    this.spinner.show();

    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.dealerDetails}&dealerId=${Id}`)
    // this.baseApi.post(urlConfig.getOnePath, payload)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
        catchError(error => {
          throw error;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == "success") {
          this.dealerDetails= res?.data?.docs[0];
         }
      })
  }

  getDealerQuotationData(Id: any) {
    this.spinner.show();

    this.baseApi.get(`${urlConfig.getAllPath}?collectionName=${urlConfig.dealerLeadStatus}&dealerId=${Id}`)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
        catchError(error => {
          throw error;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == "success") {
          this.dealerQuotaionDetails= res?.data?.docs;
         }
      })
  }
}
