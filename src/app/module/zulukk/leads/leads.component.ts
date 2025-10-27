import { Component } from '@angular/core';
import { AllLeadsComponent } from '../../leads/all-leads/all-leads.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from 'src/app/services/pagination.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ObservableService } from 'src/app/services/observable.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from '../../../config/url.config.json';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent extends AllLeadsComponent {
  constructor(
    api: ApiService,
    _activated: ActivatedRoute,
    paginationService: PaginationService,
    toastr: ToastrService,
    router: Router,
    spinner: NgxSpinnerService,
    fetch: ObservableService,
    baseApi: BaseApiService
  ) {
    super(api, _activated, paginationService, toastr, router, spinner, fetch, baseApi);
    this.currentPage = 1;
    this.apiUrlFromOther = "zulukk";
    this.apiUrlPathFromOther = `${urlConfig.used_vehicle_leads}`;

  }

  navigateTo(data:any){
    window.open(`https://www.zulukk.com/product-detail/${data?.bookedVehicleId}`, '_blank');
  }
}
