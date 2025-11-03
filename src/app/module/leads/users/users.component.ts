import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  loginType: any;
  @Input()
  @Input()
  apiUrlFromOther: any;
  @Input() apiUrlPathFromOther: any;
  public name: string;
  loader = true;
  currentPageLimit: any;
  @Input() currentPage: any;
  pagination: any = null;
  lastpage: any;
  totalList: any;
  listView: boolean = true;
  sideData: any;
  click: any;
  dropdownIndex: any;
  showDate: any;
  isData: boolean = true;
  getList: any[] = [];
  andFilter: any = [];
  orFilter: any = [];
  sortFieldName: any;
  searchFilter: any;
  phoneNo: any;
  localValue: any;
  searchTerm: any;
  prods: any = [];
  filterArray: any = [];
  myLeadsId: any;
  startDate: Date | null = null;
  endDate: Date | null = null;
  dateError: boolean = false;
  convertedStartDate: any;
  convertedEndDate: any;
  partnerUrl: string = '';

  userList1 = [
    'Car',
    'Bike',
    'Yamaha',
    'Royal_Enfield',
    'Suzuki',
    'Mahindra',
    'TVS',
    'Bajaj',
    'Honda',
    'Hero',
    'Other_Brand',
    'Ford',
    'Nissan',
    'Volkswagen',
    'Chevrolet',
    'Toyota',
    'Honda',
    'Hyundai',
    'Mahindra',
    'Tata',
    'Renault',
    'Ambassador',
    'Mercedes',
    'BMW',
    'Datsun',
    'Land_Rover',
    'Bajaj',
    'Maruthi',
    'Skoda',
    'Fiat',
    'Mitsubishi',
    'Opel',
    'Other_Brand',
    'Mahindra',
    'Swaraj',
    'Massey_Ferguson',
    'Sonalika',
    'Powertrac',
    'Eicher',
    'John_Deere',
    'Farmtrac',
    'New_Holland',
    'Kubota',
    'Solis',
    'Preet',
    'VST',
    'Indo Farm',
    'Captain',
    'ACE',
    'Digitrac',
    'Force',
    'Trakstar',
    'Hindustan',
    'Kartar',
    'Same Deutz Fahr',
    'Escorts',
    'Other_Brand',
    'Omni',
    'Gypsy',
    'Esteem',
    'Baleno',
    'Zen_Estilo',
    'Ritz',
    'Swift_Dzire',
    '1000',
    '800',
    'Alto',
    'Zen',
    'Wagon_R',
    'Versa',
    'Swift',
    'Ciaz',
    'Ertiga',
    'A_Star',
    'S_Presso',
    'Vitara',
    'Breeza',
    'Sonata',
    'Accent',
    'Tucson',
    'Terracan',
    'Accent',
    'i10',
    'i20',
    'Verna',
    'Creta',
    'Venue',
    'Santro',
    'Elantra',
    'Santa_FE',
    'Jazz',
    'City',
    'Amaze',
    'Accord',
    'Civic',
    'WR_V',
    'Brio',
    'BR_V',
    'CR_V',
    'Estate',
    'Sierra',
    'Sumo',
    'Safari',
    'Indica',
    'Sumo_Grande',
    'Vista',
    'Nano',
    'Manza',
    'Aria',
    'Zest',
    'Bolt',
    'Indigo',
    'Indigo_Marina',
    'Beat',
    'Tavera',
    'Aveo',
    'Optra',
    'Sail',
    'UVA',
    'Cruze',
    'Spark',
    'Other_Model',
    'Innova',
    'Corolla',
    'Fortuner',
    'Etios',
    'Xylo',
    'Scorpio',
    'Bolero',
    'Endeavour',
    'Fusion',
    'Figo',
    'Ikon',
    'Escort',
    'Mondeo',
    'Fiesta',
    'EcoSport',
    'Aspire',
    'Kicks',
    'Sunny',
    'Micra',
    'Magnite',
    'Vento',
    'Jetta',
    'Tiguan',
    'Polo',
    'Rapid',
    'Fabia',
    'Laura',
    'Superb',
    'Octavia',
    'Palio',
    'Punto',
    'Uno',
    'Siena',
    'Evo',
    'Premier_118',
    'Linea',
    'Padmini',
    'Cedia',
    'Challenger',
    'Pajero',
    'Lancer',
    'Montero',
    'Astra',
    'Vectra',
    'Corsa',
    'Duster',
    'Contessa',
    'Ambassador',
    '300_D',
    'Benz_C',
    ,
    'C_200',
    'Benz_S',
    'Benz_E',
    '525',
    'M_5',
    'Datsun_Go',
    'Redi_Go',
    'Defender',
    'Discovery',
    'Range_Rover',
    'Qute',
    'Auto',
    'Mastro',
    'Xtreme',
    'Splender',
    'Passion',
    'Pleasure',
    'Maestro',
    'Super_Splender',
    'Hf_Deluxe',
    'CBZ',
    'Glamour',
    'Destini',
    'X_Pulse',
    'Jupitor',
    'Rider',
    'i_Qube_EV',
    'Radeon',
    'Apache',
    'XL_100',
    'Super_XL',
    'Fiero',
    'Victor',
    'N_Torq',
    'Scooty_Pep',
    'Star_City',
    'Sport',
    'Scooty_Zest',
    'Platina',
    'CT_100',
    'Dominar',
    'Avenger',
    'Pulsar',
    'Priya',
    'CUB',
    'Discover',
    'Chetak',
    'CB_(Series)',
    'Aviator',
    'Eterno',
    'Unicorn',
    'Livo',
    'Shine',
    'Grazia',
    'SP',
    'X_Blade',
    'Hornet',
    'CD_100',
    'Dio',
    'Activa',
    'CB_200',
    'HNESS',
    'Kinetic',
    'CRB_(Series)',
    'Aerox',
    'Fazer',
    'FZ',
    'RX_100',
    'Libero',
    'R_15',
    'Ray_ZR',
    'Fascino',
    'Fiero',
    'Heat',
    'Gixxer',
    'Access_125',
    'Burgman',
    'Avenis',
    'Samuri',
    'Shogun',
    'Thunderbird',
    'Bullet_350cc',
    'Bullet_500cc',
    'RoyalEnfield',
    'Rodeo',
    'Mojo',
    'Gusto',
    'Centuro',
    'Mahindra_575_DI',
    'Mahindra_Arjun_555_DI',
    'Petrol',
    'Diesel',
    'Petrol_CNG',
    'Alloy_Mag_Wheel',
    'Spoxes_Wheel',
    'Drum_Wheel',
    'Running',
    'Not_Running',
    'Bangalore',
    'Delhi',
    'Delhi NCR',
    'Kolkata',
    'Indore',
    'Chennai',
    'Ahmedabad',
    'Jaipur',
    'Mumbai',
    'Pune',
    'Patna',
    'Hyderabad',
    'Kochi',
    'Bhubaneshwar',
    'Mysore',
    'Guwahati',
    'Lucknow',
    'Meerut',
    'Kanpur',
    'Belgaum',
    'Bellary',
    'Hubli/Dharwad',
    'Srinagar',
    'Noida',
    'Faridabad',
    'Ghaziabad',
    'Mohali',
    'Chandigarh',
    'Gurgaon',
    'Surat',
    'Vadodara',
    'Nagpur',
    'Agra',
    'Bhopal',
    'Vizag',
    'Secunderabad',
    'Guntur',
    'Coimbatore',
    'Madurai',
    'Raipur',
    'Ranchi',
    'Bilaspur',
    'Howrah',
  ];

  column = [
    {
      col: 'Phone No',
      name: 'phoneNumber',
      forFilter: true,
      forColumn: true,
    },
    // {
    //   col: 'Unique Id',
    //   name: 'uniqueProductName',
    //   forFilter: true,
    //   forColumn: true,
    // },
    {
      col: 'Email',
      name: 'email',
      forFilter: true,
      forColumn: true,
    },
    {
      col: 'Username',
      name: 'username',
      forFilter: false,
      forColumn: true,
    },
    // {
    //   col: 'Brand',
    //   name: 'brandName',
    //   forFilter: false,
    //   forColumn: true,
    // },
    // {
    //   col: 'Model',
    //   name: 'modelName',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: 'Condition',
    //   name: 'condition',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: 'Type',
    //   name: 'fuleWhellType',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: 'Mfg Year',
    //   name: 'manufactureYear',
    //   forFilter: false,
    //   forColumn: true,
    // },
    {
      col: 'Created At',
      name: 'createdAt',
      forFilter: false,
      forColumn: true,
    },
    {
      col: 'Updated At',
      name: 'updatedAt',
      forFilter: false,
      forColumn: true,
    },
    // {
    //   col: 'City',
    //   name: 'location',
    //   forFilter: false,
    //   forColumn: true,
    // },
    // {
    //   col: 'Customer Response',
    //   name: 'teleCaller',
    //   forFilter: false,
    //   forColumn: true,
    // },
    // {
    //   col: 'Lead Date',
    //   name: 'createdAt',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: 'Vehicle Type',
    //   name: 'vehicleType',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: 'Attempts',
    //   name: 'guestUserCount',
    //   forFilter: true,
    //   forColumn: true,
    // },
    // {
    //   col: "Amount Due",
    //   name: "dueAmount",
    //   forFilter: false,
    //   forColumn: true,
    // },
    // {
    //   col: "Payment Status",
    //   name: "eventStatus",
    //   forFilter: false,
    //   forColumn: true,
    // },
  ];

  value: any;
  createdDate: string | null = '';
  originalCreatedDateSelected: string | null = '';
  phoneNoSearch: any = '';

  constructor(
    private api: ApiService,
    private _activated: ActivatedRoute,
    private paginationService: PaginationService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private fetch: ObservableService,
    private baseApi: BaseApiService
  ) {}

  ngOnInit(): void {
    this.getFilterLeads();
    this.setPaginationLimit();
    this.loginType = localStorage?.getItem('loiu0ac');
    this.fetch.navSerachBar('');
    this.reset();
    this.fetch.getarameters.subscribe((res: any) => {
      this.sideData = res;
      if (res != 0) {
        this.getAllLeadsWithParametrs();
      }
    });

    this.fetch.get.subscribe((res: any) => {
      if (res) {
        this.loader = true;
        this.getAllLeads();
      }
    });
    this.fetch.click.subscribe((res: any) => {
      this.click = res;
    });
    const filterOptions = localStorage?.getItem('filterOptions');
    if (filterOptions) {
      this.selectedColumn = JSON.parse(filterOptions);
    }
  }

  getFilterLeads() {
    this.filterArray = [
      {
        name: 'All Leads',
        value: 'null',
      },
      {
        name: 'New Leads',
        value: 'NEW-LEAD',
      },
      {
        name: 'Quotation Given',
        value: 'QuotationGiven',
      },
      {
        name: 'Sold To Others',
        value: 'SoldToOthers',
      },
      {
        name: 'Duplicate Lead',
        value: 'DuplicateLead',
      },
      {
        name: 'Not Reachable',
        value: 'NotReachable',
      },
      {
        name: 'Call Me Later',
        value: 'CallMeLater',
      },
      {
        name: 'Asking High Price',
        value: 'AskingHighPrice',
      },

      {
        name: 'Not Responding',
        value: 'NotResponding',
      },
      {
        name: 'Deal Cancelled',
        value: 'DealCancelled',
      },
      {
        name: 'Deal Accepted',
        value: 'DealAccepted',
      },
      {
        name: 'Not interested',
        value: 'NotInterested',
      },
      {
        name: 'Received Images',
        value: 'ReceivedImages',
      },
      {
        name: 'Sending Images',
        value: 'SendingImages',
      },
      {
        name: 'Checking price',
        value: 'CheckingPrice',
      },
      {
        name: 'Line Busy',
        value: 'LineBusy',
      },
      {
        name: 'Assigned To Dealer',
        value: 'AssignedToDealer',
      },
      {
        name: 'SCHEDULED',
        value: 'SCHEDULED',
      },
      {
        name: 'PICKEDUP',
        value: 'PICKEDUP',
      },
      {
        name: 'SCRAPPED',
        value: 'SCRAPPED',
      },
      {
        name: 'Received Scrapped Images/videos',
        value: 'ReceivedScrappedImagesVideos',
      },
      {
        name: 'Scrapped Verified',
        value: 'ScrappedVerified',
      },
      {
        name: 'Sent Scrapped Images/videos to Customer',
        value: 'SentScrappedImagesVideosToCustomer',
      },
      {
        name: 'Sent Declaration Certificate to Customer',
        value: 'SentDeclarationCertificateToCustomer',
      },
      {
        name: 'Completed',
        value: 'Completed',
      },
      {
        name: 'Other',
        value: 'OTHER',
      },
    ];
  }

  getValue(data: any) {
    localStorage.setItem('leadStatusValue', data?.target?.value);
    this.currentPage = 1;
    this.getAllLeads('', data?.target?.value);
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

  phoneNumber() {
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };
    this.api.getNewFormDataByPh(params, this.phoneNo).subscribe(
      (res: any) => {
        if (res?.data?.length != 0) {
          this.pagination = this.paginationService.getPager(
            res?.totals?.count,
            this.currentPage,
            this.currentPageLimit
          );

          this.getList = [];
          this.isData = true;

          this.getList = res?.data;
          this.totalList = res?.totals?.count;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          this.isData = false;
          this.pagination = null;
        } else if (res?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.pagination = null;
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res?.message);
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.pagination = null;
        if (err?.error?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err?.error?.message);
        }
      }
    );
  }

  getByDate(date: any) {
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };
    this.api.getNewFormDataBydate(params, date?.value).subscribe(
      (res: any) => {
        if (res?.data?.length != 0) {
          this.pagination = this.paginationService.getPager(
            res?.totals?.count,
            this.currentPage,
            this.currentPageLimit
          );

          this.getList = [];
          this.isData = true;

          this.getList = res?.data;
          this.totalList = res?.totals?.count;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          this.isData = false;
          this.pagination = null;
        } else if (res?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.pagination = null;
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res?.message);
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.pagination = null;
        if (err?.error?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err?.error?.message);
        }
      }
    );
  }

  getPage(data: any) {
    this.currentPage = data?.page;
    this.currentPageLimit = data?.limit;
    this.getAllLeads();
  }

  reset() {
    this.getAllLeads();
    var da = new Date();
    var datesss: any = da.toLocaleDateString();
    var rev = datesss.split('/');
    this.showDate = rev[2] + '-' + rev[1] + '-' + rev[0];
  }

  getAllLeads(data?: any, tele?: any) {
    this.value = tele = localStorage.getItem('leadStatusValue');
    this.createdDate = localStorage.getItem('searchByCreatedDate');
    this.originalCreatedDateSelected = localStorage.getItem(
      'searchByoriginalCreatedDate'
    );

    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };
    localStorage.setItem('currentPage', this.currentPage);
    localStorage.setItem('currentPageLimit', this.currentPageLimit.toString());

    // this.api.getFilteredLeads(params)

    // const params = {
    //   page: this.currentPage,
    //   limit: this.currentPageLimit,
    // };
    let query = data
      ? `&userName=${data}&modelName=${data}&brandName=${data}&uniqueProductName=${data}`
      : '';
    let customSelectedDates =
      this.startDate && this.endDate
        ? `&startDate=${this.convertedStartDate}&endDate=${this.convertedEndDate}`
        : '';
    let teleCaller = tele && tele != 'null' ? `&teleCaller=${tele}` : '';
    let phoneNumber =
      this.phoneNoSearch && this.phoneNoSearch != 'null'
        ? `&phoneNumber=${this.phoneNoSearch}`
        : '';
    let byDate =
      this.createdDate && this.createdDate != 'null'
        ? `&createdDate=${this.createdDate}`
        : '';

    this._activated.paramMap.subscribe((params) => {
      this.myLeadsId =
        params.get('id') && params.get('id') != 'null'
          ? `&teleCallerData.id=${params.get('id')}`
          : '';
    });

    const collectionName = this.apiUrlFromOther
      ? `?collectionName=${this.apiUrlPathFromOther}`
      : `?collectionName=${urlConfig.user}`;
    const url = `${urlConfig.getAllPath}${collectionName}${teleCaller}${phoneNumber}${this.myLeadsId}${query}${customSelectedDates}${byDate}&page=${params.page}&limit=${params.limit}`;
    // const url = `${urlConfig.getAllPathDealerLatestQuotations}${collectionName}${teleCaller}${phoneNumber}${this.myLeadsId}${query}${customSelectedDates}${byDate}&page=${params.page}&limit=${params.limit}`;
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

          this.isData = true;

          // this.getList = res?.data?.docs;
          this.getList = res?.data.docs;
          this.totalList = res?.data?.totalDocs;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          this.isData = false;
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

  getAllLeadsWithParametrs() {
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };

    this.spinner.show();
    this.api.getLeadWithVehiclePicture(params, 'vp').subscribe(
      (res: any) => {
        if (res?.data?.length != 0) {
          this.pagination = this.paginationService.getPager(
            res.data['totalDocs'],
            this.currentPage,
            this.currentPageLimit
          );

          this.getList = [];
          this.isData = true;

          this.getList = res?.data?.docs;
          this.totalList = res?.data?.totalDocs;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          this.isData = false;
          this.pagination = null;
        } else if (res?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.pagination = null;
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res?.message);
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.pagination = null;
        if (err?.error?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err?.error?.message);
        }
      }
    );
  }

  // get sortData() {
  //   return this.getList.sort((a, b) => {
  //     return <any>new Date(b.updatedAt) - <any>new Date(a.updatedAt);
  //   });
  // }

  updateList(data: any, teleCallerStatus: any) {
    data.teleCaller = teleCallerStatus?.value;
    data.adminSeen = true;
    this.spinner.show();

    // this.api.updateStatus(id, dataToSend)
    this.baseApi
      .patch(urlConfig.updatePath + data._id, data)
      .pipe(
        finalize(async () => {
          // await this.loaderService.dismissLoading();
        }),
        catchError((error) => {
          throw error;
        })
      )

      .subscribe((res: any) => {
        if (res?.status == 'success') {
          this.dropdownIndex = null;
          this.reset();
        }
        this.spinner.hide();
      });
  }

  showDropdown(i: any) {
    this.dropdownIndex = i;
  }

  selectedColumn = [
    'phoneNumber',
    'brandName',
    'modelName',
    'location',
    'manufactureYear',
    'fuleWhellType',
    'condition',
    'createdAt',
    'teleCaller',
    'vehicleType',
    'guestUserCount',
  ];

  addFilter(type: any) {
    if (type == 'and') {
      this.andFilter.push({ type: '', value: '' });
    } else {
      this.orFilter.push({ type: '', value: '' });
    }
  }

  clearFilter() {
    this.getPage({
      page: this.currentPage,
      limit: this.currentPageLimit,
    });
    this.andFilter = [];
    this.orFilter = [];
    this.sortFieldName = '';
    this.searchFilter = [];
    this.selectedColumn = [
      'phoneNumber',
      'brandName',
      'modelName',
      'location',
      'manufactureYear',
      'fuleWhellType',
      'condition',
      'createdAt',
      'teleCaller',
      'vehicleType',
      'guestUserCount',
    ];
    this.getFilterData();
  }

  searchFilters() {
    this.currentPage = 1;
    let blankAndValue = this.andFilter.filter((x: any) => x.value == '');
    let blankAndType = this.andFilter.filter((x: any) => x.type == '');
    let blankOrValue = this.orFilter.filter((x: any) => x.value == '');
    let blankOrType = this.orFilter.filter((x: any) => x.type == '');

    if (blankAndValue.length > 0 || blankOrValue.length > 0) {
      this.toastr.error('Value Field is Required');
    } else if (blankAndType.length > 0 || blankOrType.length > 0) {
      this.toastr.error('Filter Field is Required');
    } else {
      this.getFilterData();
    }
  }

  getFilterData() {
    let abc: any = [];
    this.andFilter.forEach((element: any) => {
      let obj: any;
      // if(element.type == "vehiclePictures"){
      //   obj =  (`${element.type}=[{_id}]`);

      // }else{
      obj = `${element.type}=${element.value}`;

      // }
      abc.push(obj);
    });

    let ty = abc.join('&');
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };

    this.spinner.show();
    // this.api.getNewFormDataByDate(params, ty)
    const url = `${urlConfig.getAllPath}?collectionName=${urlConfig.user}&${ty}&page=${params.page}&limit=${params.limit}`;

    this.baseApi.get(url).subscribe(
      (res: any) => {
        if (res?.data?.length != 0) {
          this.pagination = this.paginationService.getPager(
            res.data['totalDocs'],
            this.currentPage,
            this.currentPageLimit
          );

          this.getList = [];
          this.isData = true;

          this.getList = res?.data?.docs;
          this.totalList = res?.data?.totalDocs;

          this.getList.forEach((element) => {
            var abc = element?.createdAt;
            var s = abc.split('T');

            element.createdAtVariable = s[0];
          });
        } else if (res?.data?.length == 0) {
          this.isData = false;
          this.pagination = null;
        } else if (res?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.pagination = null;
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(res?.message);
        }
        this.spinner.hide();
      },
      (err: any) => {
        this.spinner.hide();
        this.pagination = null;
        if (err?.error?.message == 'jwt expired') {
          this.toastr.error('Token Expired, Loggin Again');
          this.router.navigateByUrl('/login');
        } else {
          this.toastr.error(err?.error?.message);
        }
      }
    );
  }

  selection(type: any, index: any, event: any) {
    if (type == 'and') {
      this.andFilter[index].type = event.value;
    } else {
      this.orFilter[index].type = event.value;
    }
  }

  deleteFilter(type: any, index: any) {
    if (type == 'and') {
      this.andFilter.splice(index, 1);
    } else {
      this.orFilter.splice(index, 1);
    }
  }

  setValue(event: any, index: any, type: any) {
    const str = event.target.value.trim();
    // const modStr = str[0].toUpperCase() + str.slice(1);
    if (type == 'and') {
      this.andFilter[index].value = str;
    } else {
      this.orFilter[index].value = str;
    }
  }

  downloadExcel() {}

  changeValue(event: any) {
    if (!event.selected) {
      let i = this.selectedColumn.findIndex((x) => x == event.value);
      if (i >= 0) {
        this.selectedColumn.splice(i, 1);
      }
    } else {
      this.selectedColumn.push(event.value);
    }
    const jsonString = JSON.stringify(this.selectedColumn);
    localStorage.setItem('filterOptions', jsonString);
  }

  checkColumn(columnName: any) {
    let i = this.selectedColumn.findIndex((x) => x == columnName);

    if (i == -1) {
      return false;
    } else {
      return true;
    }
  }

  changeView() {
    this.listView = !this.listView;
  }

  notify(id: any) {
    this.name = `http://dealer.carbasket.in/product-data/${id}`;
    let message = `Link has been copied to clipboard`;

    this.toastr.success('Link has been copied to clipboard');
  }

  navigation(path: any, id: any) {
    this.router.navigate([path, id]);
  }

  searchItem() {
    this.getAllLeads(this.searchTerm);
  }

  onDateChange(event: any) {
    this.startDate = null;
    this.endDate = null;
    this.convertedStartDate = '';
    this.convertedEndDate = '';
    let selectedDate = new Date(event?.value);
    localStorage.setItem(
      'searchByoriginalCreatedDate',
      this.originalCreatedDateSelected
    );
    const formattedDate = `${selectedDate
      .getDate()
      .toString()
      .padStart(2, '0')}/${(selectedDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${selectedDate.getFullYear()}`;
    localStorage.setItem('searchByCreatedDate', formattedDate);
    this.createdDate = formattedDate;
    this.currentPage = 1;
    this.getAllLeads();
  }

  clearSelected(clearData: any) {
    if (clearData == 'phoneNumber') {
      this.phoneNoSearch = '';
    } else if (clearData == 'partnerUrl') {
      this.partnerUrl = '';
    } else {
      localStorage.setItem('searchByoriginalCreatedDate', '');
      localStorage.setItem('searchByCreatedDate', '');
      this.createdDate = '';
      this.originalCreatedDateSelected = '';
    }
    this.currentPage = 1;
    this.getAllLeads();
  }

  // Method to validate dates
  validateDates() {
    if (this.startDate && this.endDate) {
      this.dateError = this.endDate < this.startDate;
    } else {
      this.dateError = false;
    }
  }

  getDates() {
    this.convertedStartDate = this.convertToDDMMYYYY(this.startDate);
    this.convertedEndDate = this.convertToDDMMYYYY(this.endDate);
    this.createdDate = '';
    this.originalCreatedDateSelected = '';
    localStorage.removeItem('searchByCreatedDate');
    localStorage.removeItem('searchByoriginalCreatedDate');
    this.getAllLeads();
  }

  clearDates() {}

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

  handlePartnerUrl() {
    console.log('calling api');
    if (!this.partnerUrl) return;

    const parts = this.partnerUrl.trim().split('-');
    const uniqueCode = parts[parts.length - 1];

    if (uniqueCode) {
      console.log('Extracted code:', uniqueCode);
      // &uniqueProductName=PRC846
      // Call your API with the code
      // this.fetchPartnerLeadByCode(uniqueCode);
      const params = {
        page: this.currentPage,
        limit: this.currentPageLimit,
      };
      this.spinner.show();
      // this.api.getNewFormDataByDate(params, ty)
      const url = `${urlConfig.getAllPath}?collectionName=${urlConfig.products}&uniqueProductName=${uniqueCode}&page=${params.page}&limit=${params.limit}`;

      this.baseApi.get(url).subscribe(
        (res: any) => {
          if (res?.data?.length != 0) {
            this.pagination = this.paginationService.getPager(
              res.data['totalDocs'],
              this.currentPage,
              this.currentPageLimit
            );

            this.getList = [];
            this.isData = true;

            this.getList = res?.data?.docs;
            this.totalList = res?.data?.totalDocs;

            this.getList.forEach((element) => {
              var abc = element?.createdAt;
              var s = abc.split('T');

              element.createdAtVariable = s[0];
            });
          } else if (res?.data?.length == 0) {
            this.isData = false;
            this.pagination = null;
          } else if (res?.message == 'jwt expired') {
            this.toastr.error('Token Expired, Loggin Again');
            this.pagination = null;
            this.router.navigateByUrl('/login');
          } else {
            this.toastr.error(res?.message);
          }
          this.spinner.hide();
        },
        (err: any) => {
          this.spinner.hide();
          this.pagination = null;
          if (err?.error?.message == 'jwt expired') {
            this.toastr.error('Token Expired, Loggin Again');
            this.router.navigateByUrl('/login');
          } else {
            this.toastr.error(err?.error?.message);
          }
        }
      );
    } else {
      console.error('Could not extract lead code from URL');
    }
  }

  private pasteTimeout: any;

  onUrlChange() {
    // Wait a short delay to let the full paste finish
    clearTimeout(this.pasteTimeout);

    this.pasteTimeout = setTimeout(() => {
      this.handlePartnerUrl();
    }, 300); // 300ms delay after paste
  }

  cleanPhoneNumber() {
    if (!this.phoneNoSearch) return;

    // Remove all spaces and non-digit characters
    let cleaned = this.phoneNoSearch.replace(/\D/g, '');

    // Remove country code if present
    if (cleaned.startsWith('91')) {
      cleaned = cleaned.slice(2);
    }

    // Optional: only keep 10 digits
    if (cleaned.length > 10) {
      cleaned = cleaned.slice(-10);
    }
    this.phoneNoSearch = cleaned;

    this.getAllLeads();
  }
}
