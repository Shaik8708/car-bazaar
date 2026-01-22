import {
  Component,
  Input
} from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/environments/environment';
import urlConfig from '../../../config/url.config.json';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-drivers',
  standalone: false,
  templateUrl: './drivers.component.html',
  styleUrl: './drivers.component.scss',
})
export class DriversComponent {
  loader = true;
  currentPageLimit: any;
  @Input() currentPage: any;
  pagination: any = null;
  lastpage: any;
  totalList: any;

  getList: any[] = [];

  constructor(
    private paginationService: PaginationService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private baseApi: BaseApiService
  ) {}

  ngOnInit(): void {
    this.setPaginationLimit();
    this.getAllLeads();
  }

  setPaginationLimit() {
    const cP = localStorage?.getItem('currentPage');
    const cPL = localStorage?.getItem('currentPageLimit');
    if (cP) {
      this.currentPageLimit = Number(cPL);
      this.currentPage = Number(cP);
    } else {
      this.currentPageLimit = environment.defaultPageLimit;
      this.currentPage = 1;
    }
  }


  getPage(data: any) {
    this.currentPage = data?.page;
    this.currentPageLimit = data?.limit;
    this.getAllLeads();
  }

  getAllLeads() {


    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };
    localStorage.setItem('currentPage', this.currentPage);
    localStorage.setItem('currentPageLimit', this.currentPageLimit.toString());


 
    const url = `${urlConfig.getDrivers}?page=${params.page}&limit=${params.limit}`;
    this.spinner.show();
    this.getList = [];
    this.totalList = [];

    this.baseApi
      .get(url)
      .pipe(
        finalize(() => {
          this.spinner.hide();
        }),
        catchError((err) => {
          this.pagination = null;
          if (err?.error?.message == 'jwt expired') {
            this.toastr.error('Token Expired, Loggin Again');
            this.router.navigateByUrl('/login');
          } else {
            this.toastr.error(err?.error?.message);
          }
          console.error('Error fetching products:', err); // Log the error for debugging
          return []; // Return an empty array to prevent further processing
        })
      )
      .subscribe((res: any) => {
        if (res?.data?.length != 0) {
          this.pagination = this.paginationService.getPager(
            res.data['totalDocs'],
            this.currentPage,
            this.currentPageLimit
          );
          this.getList = res?.data.docs;
          this.totalList = res?.data?.totalDocs;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          // this.isData = false;
          this.pagination = null;
        } else if (res?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.pagination = null;
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res?.message);
        }
      });
  }

    navigation(path: any, id: any) {
    this.router.navigate([path, id]);
  }

}
