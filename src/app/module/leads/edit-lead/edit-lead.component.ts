import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import urlConfig from '../../../config/url.config.json';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.css'],
})
export class EditLeadComponent implements OnInit {
  loginType: any;

  @Input()
  public name: string;

  public status: string;

  leadForm: FormGroup = new FormGroup({});
  cityList: any = [
    { cityName: 'Bengaluru', _id: '1' },
    { cityName: 'Chennai', _id: '2' },
    { cityName: 'Hyderabad', _id: '3' },
    { cityName: 'Mumbai', _id: '4' },
    { cityName: 'Pune', _id: '5' },
    { cityName: 'Delhi', _id: '6' },
    { cityName: 'Kolkata', _id: '7' },
    { cityName: 'Ahmedabad', _id: '8' },
  ];
  citySelected: string = '';
  allDrivers: any;
  assignIndex: any;
  vehiclePic: any;
  scrapLetterPic: any;
  teleCallerData: any = 'Nobody update yet';
  assignedDealerData: any;
  callTrackingId: any;
  rcPictures: any;
  towingPic: any;
  scrapedPic: any;
  enginePic: any;
  userDocPic: any;
  chasisPictures: any;
  isAssigned: any;
  assignedDealerId: any;
  adminSeen: boolean = false;
  adminHasSeenQuotation: boolean = false;

  delearSingleQuote: any;
  dealerQuotation: any;
  userFinalAmount: any = '';
  leadIsVerified: any = '';
  dealerName: any = '';
  leadId: any;
  selectedDriverAssigned: any;
  driverId: any;
  driverAssignmentList: any;
  vehImage: any;
  rcImage: any;
  chasisImage: any;
  scrapGetImages: any;
  towingImage: any;
  scrapedImage: any;
  engineImage: any;
  userDocImage: any;
  confirmedByUser: any;
  confirmedByDealer: any;
  scheduledDate: any;
  leadStatus: any;
  uniqueLeadName: any;
  originalDriverStatusData: any;
  userComment: any;
  callTrackingList: any[] = [];
  caseTrackingList: any[] = [];
  callTrackingStatus: any = '';
  caseTrackingStatus: any = '';
  caseIssueBy: any = '';
  caseType: any = '';
  caseComment: any = '';
  askingPrice: any;
  givenPrice: any;
  leadResponse: any = [];
  dealerQuotationId: any = [];
  caseTrackingId: any;
  assignedTo: any;
  phoneNumber: any;
  enableEdit: boolean = false;

  caseTypeOptions: { value: string; label: string }[] = [
    {
      value: 'VehicleSoledInsteadOfScrapping',
      label: 'Vehicle Soled Instead Of Scrapping',
    },
    {
      value: 'VehicleScrappingDelayByDealer',
      label: 'Vehicle Scrapping Delay By Dealer',
    },
    { value: 'ChasisNotGivenByDealer', label: 'Chasis Not Given By Dealer' },
    { value: 'Other', label: 'Other' },
  ];
  caseStatusOptions: { value: string; label: string }[] = [
    { value: 'Active', label: 'Active' },
    { value: 'Reopened', label: 'Reopened' },
    { value: 'Closed', label: 'Closed' },
  ];

  leadStatusOptions: { value: string; label: string }[] = [
    { value: 'NotReachable', label: 'Not reachable' },
    { value: 'DuplicateLead', label: 'Duplicate Lead' },
    { value: 'SoldToOthers', label: 'Sold To Others' },
    { value: 'CallMeLater', label: 'Call me later' },
    { value: 'AskingHighPrice', label: 'Asking high price' },
    { value: 'NotResponding', label: 'Not responding' },
    { value: 'NotInterested', label: 'Not interested' },
    { value: 'LineBusy', label: 'Line Busy' },
    { value: 'DealCancelled', label: 'Deal cancelled' },
    { value: 'DealAccepted', label: 'Deal accepted' },
    { value: 'CheckingPrice', label: 'Checking price' },
    { value: 'QuotationGiven', label: 'Quotation Given' },
    { value: 'SendingImages', label: 'Sending Images' },
    { value: 'ReceivedImages', label: 'Received Images' },
    { value: 'AssignedToDealer', label: 'Assigned to dealer' },
    { value: 'PROCESSING', label: 'Processing' },
    { value: 'SCHEDULED', label: 'Scheduled' },
    { value: 'PICKEDUP', label: 'Pickedup' },
    { value: 'SCRAPPED', label: 'Scrapped' },
    {
      value: 'ReceivedScrappedImagesVideos',
      label: 'Received Scrapped Images/videos',
    },
    { value: 'ScrappedVerified', label: 'Scrapped Verified' },
    {
      value: 'SentScrappedImagesVideosToCustomer',
      label: 'Sent Scrapped Images/videos to Customer',
    },
    {
      value: 'SentDeclarationCertificateToCustomer',
      label: 'Sent Declaration Certificate to Customer',
    },
    { value: 'Completed', label: 'Completed' },
    { value: 'OTHER', label: 'Other' },
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private _activated: ActivatedRoute,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private baseApi: BaseApiService
  ) {
    this.leadForm = this.fb.group({
      username: [''],
      phoneNumber: [''],
      email: [''],
      fullName: [''],
      createdAt: [''],
      pickUpDate: [''],
      pickUpTime: [''],
      locationList: [''],
      // brandName: [''],
      condition: [''],
      totalKm: [''],
      // fuleWhellType: [''],
      guestUserCount: [''],
      userCity: [''],
      // location: [''],
      manufactureYear: [''],
      totalAmount: [''],
      // modelName: [''],
      price: [''],
      teleCaller: [''],
      vehicleType: [''],
      dealerQuotationId: [''],
      userFinalAmount: [''],
      isAssigned: [''],
      adminSeen: '',
      leadIsVerified: [''],
      vehiclePictures: this.fb.array([]),

      chasisNumber: [''],
      dealerdata: [''],
      userAddress: [''],
      userDocumentType: [''],
      userDocumentNumber: [''],
      vehicleNumber: [''],
      leadStatus: [''],
      comment: [''],
      schedulePickUp: {
        dealerId: '',
        date: '',
        confirmedByDealer: '',
        confirmedByUser: '',
      },
      teleCallerData: [''],
      canclePickupReason: [''],
      rcPictures: this.fb.array([]),
      chasisPictures: this.fb.array([]),
      scrapLetterPictures: this.fb.array([]),
      towingPictures: this.fb.array([]),

      userDocumentsPictures: this.fb.array([]),
      scrapPictures: this.fb.array([]),
      enginePictures: this.fb.array([]),
      engineNumber: [''],
      userAddressGoogleMapLink: [''],
      callTrackingId: '',
      tripType: '',
      // whatsAppNumber: '',
      uniqueLeadName: '',
      assignedTo: '',

      items: this.fb.array([this.newFeilds()]),
    });
  }

  ngOnInit(): void {
    this.loginType = localStorage?.getItem('loiu0ac');
    // this.getDealerList();
    this.getLeadById();
  }

  goBack(): void {
    this.location.back();
  }

  notify(event: string) {
    let message = `'${event}' has been copied to clipboard`;
    this.status = message;

    this.toastr.success('Link has been copied to clipboard');
  }

  getCityList() {
    this.baseApi
      .get(`${urlConfig.getAllPath}?collectionName=${urlConfig.locations}`)
      // this.api.getCityList()
      .subscribe(
        (res: any) => {
          if (res?.status == 'success') {
            this.cityList = res?.data?.docs;
          } else {
            alert('Something went wrong, Try again');
          }
        },
        (err: any) => {
          alert(err.error.message);
        }
      );
  }

  removeQuotation(
    id: any,
    dealerId: any,
    index: any,
    quotationId: any,
    unAssign?: any
  ) {
    let isAssigned = unAssign ? false : true;

    // this.getLeadById();

    // console.log('id',id)

    Swal.fire({
      text: 'Are you sure you want to delete Quotation.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        let payload = {
          collectionName: urlConfig.driverLeadStatus,
        };
        this.baseApi.delete(`${urlConfig.deletePath}/${id}`, payload).subscribe(
          (res: any) => {
            if (res?.status == 'success') {
              this.updateDealerQuotationStatusInMainApi(
                dealerId,
                quotationId,
                isAssigned,
                true
              );
            } else {
              alert(res?.message);
            }
          },
          (err: any) => {
            alert(err?.error?.message);
          }
        );
      } else if (result.isDenied) {
      }
    });
  }

  getLeadById() {
    this._activated.params.subscribe((res: any) => {
      this.leadId = res?.id;
    });
    this.spinner.show();
    // this.api.getLeadById(this.leadId)
    let payload = {
      collectionName: urlConfig.leads,
      id: this.leadId,
    };
    this.baseApi
      .get(urlConfig.getSingleLeadData + `/${this.leadId}`)
      .pipe(
        finalize(() => {}),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res?.status == 'success') {
            this.uniqueLeadName = res?.data?.uniqueLeadName;
            this.leadResponse = res?.data;
            this.getDriversByCity();

            const data = {
              username: res?.data?.username,
              phoneNumber: res?.data?.userId?.phoneNumber,
              email: res?.data?.userId?.email,
              createdAt: res?.data?.createdAt,
              locationList: res?.data?.locations.join('\n'),
              // brandName: res?.data?.brandName,
              pickUpDate: res?.data?.pickUpDate,
              pickUpTime: res?.data?.pickUpTime,
              condition: res?.data?.condition,
              totalKm: res?.data?.totalKm,
              // fuleWhellType: res?.data?.fuleWhellType,
              guestUserCount: res?.data?.guestUserCount,
              userCity: res?.data?.userCity,
              fullName: res?.data?.userId?.fullName,

              // location: res?.data?.location,
              // manufactureYear: res?.data?.manufactureYear,
              totalAmount: res?.data?.totalAmount,
              // modelName: res?.data?.modelName,
              price: res?.data?.price,
              teleCaller: res?.data?.teleCaller,
              vehicleType: res?.data?.vehicleType,
              dealerQuotationId: res?.data?.dealerQuotationId,
              userFinalAmount: res?.data?.userFinalAmount,
              leadIsVerified: res?.data?.leadIsVerified,
              vehiclePictures: res?.data?.vehiclePictures,
              rcPictures: res?.data?.rcPictures,
              towingPictures: res?.data?.towingPictures,
              userDocumentsPictures: res?.data?.userDocumentsPictures,
              scrapPictures: res?.data?.scrapPictures,
              enginePictures: res?.data?.enginePictures,
              chasisPictures: res?.data?.chasisPictures,
              scrapLetterPictures: res?.data?.scrapLetterPictures,
              dealerdata: res?.data?.dealerdata,

              chasisNumber: res?.data?.chasisNumber,
              userAddress: res?.data?.userAddress,
              userDocumentType: res?.data?.userDocumentType,
              userDocumentNumber: res?.data?.userDocumentNumber,
              vehicleNumber: res?.data?.vehicleNumber,
              comment: res?.data?.comment,
              engineNumber: res?.data?.engineNumber,
              userAddressGoogleMapLink: res?.data?.userAddressGoogleMapLink,
              canclePickupReason: res?.data?.canclePickupReason,
              schedulePickUp: res?.data?.schedulePickUp,
              leadStatus: res?.data?.leadStatus,
              isAssigned: res?.data?.isAssigned,
              assignedTo: res?.data?.assignedTo,
              teleCallerData: res?.data?.teleCallerData,
              adminSeen: res?.data?.adminSeen,
              adminHasSeenQuotation: res?.data?.adminHasSeenQuotation,
              items: res?.data?.items,
              callTrackingId: res?.data?.callTrackingId,
              caseTrackingId: res?.data?.caseTrackingId,
              tripType: res?.data?.tripType,
              // whatsAppNumber: res?.data?.whatsAppNumber,
              uniqueLeadName: res?.data?.uniqueLeadName,
              clientId: res?.data?.clientId,
              clientUsername: res?.data?.clientUsername,
            };

            this.name = `https://partner.carbasket.in/v/${encodeURIComponent(
              res?.data?.totalAmount
            ).replace(/%20/g, '-')}-${
              res?.data?.manufactureYear
            }-${encodeURIComponent(res?.data?.userCity).replace(
              /%20/g,
              '-'
            )}-${encodeURIComponent(res?.data?.uniqueProductName).replace(
              /%20/g,
              '-'
            )}`;

            this.adminSeen = data?.adminSeen;
            this.adminHasSeenQuotation = data?.adminHasSeenQuotation;
            this.leadStatus = data?.leadStatus;
            (this.teleCallerData = res?.data?.teleCallerData?.fullName),
              (this.isAssigned = data?.isAssigned);
            this.assignedTo = data?.assignedTo;
            this.scheduledDate = data?.schedulePickUp?.date;
            this.confirmedByDealer = data?.schedulePickUp?.confirmedByDealer;
            this.confirmedByUser = data?.schedulePickUp?.confirmedByUser;
            this.userFinalAmount = data?.userFinalAmount;
            this.leadIsVerified = data?.leadIsVerified;
            this.vehiclePic = data?.vehiclePictures;
            this.rcPictures = data?.rcPictures;
            this.towingPic = data?.towingPictures;
            this.userDocPic = data?.userDocumentsPictures;
            this.enginePic = data?.enginePictures;
            this.scrapedPic = data?.scrapPictures;
            this.chasisPictures = data?.chasisPictures;
            this.scrapLetterPic = data?.scrapLetterPictures;
            this.assignedDealerData = data?.isAssigned;
            this.callTrackingId = data?.callTrackingId;
            this.caseTrackingId = data?.caseTrackingId;
            this.askingPrice = data?.userFinalAmount;
            this.callTrackingStatus = data?.teleCaller;
            this.dealerQuotationId = data?.dealerQuotationId;
            this.phoneNumber = data?.phoneNumber;

           
            // if (data?.callTrackingId) {
              // this.getCallTrackingData();
            // }
            // if (data?.caseTrackingId) {
              // this.getCaseTrackingData();
            // }

            if (this.chasisPictures) {
              const imagesArray = this.leadForm.get(
                'chasisPictures'
              ) as FormArray;
              this.chasisPictures.forEach((imageUrl: any) => {
                imagesArray.push(this.fb.control(imageUrl?.img));
              });
            }

            if (this.vehiclePic) {
              const imagesArray = this.leadForm.get(
                'vehiclePictures'
              ) as FormArray;
              this.vehiclePic.forEach((imageUrl: any) => {
                imagesArray.push(this.fb.control(imageUrl?.img));
              });
            }

            if (this.scrapLetterPic) {
              const imagesArray = this.leadForm.get(
                'scrapLetterPictures'
              ) as FormArray;
              this.scrapLetterPic.forEach((imageUrl: any) => {
                imagesArray.push(this.fb.control(imageUrl?.img));
              });
            }

            if (this.rcPictures) {
              const rcImagesArray = this.leadForm.get(
                'rcPictures'
              ) as FormArray;
              this.rcPictures.forEach((rcUrl: any) => {
                rcImagesArray.push(this.fb.control(rcUrl?.img));
              });
            }
            if (this.towingPic) {
              const rcImagesArray = this.leadForm.get(
                'towingPictures'
              ) as FormArray;
              this.towingPic.forEach((rcUrl: any) => {
                rcImagesArray.push(this.fb.control(rcUrl?.img));
              });
            }
            if (this.scrapedPic) {
              const rcImagesArray = this.leadForm.get(
                'scrapPictures'
              ) as FormArray;
              this.scrapedPic.forEach((rcUrl: any) => {
                rcImagesArray.push(this.fb.control(rcUrl?.img));
              });
            }
            if (this.enginePic) {
              const rcImagesArray = this.leadForm.get(
                'enginePictures'
              ) as FormArray;
              this.enginePic.forEach((rcUrl: any) => {
                rcImagesArray.push(this.fb.control(rcUrl?.img));
              });
            }
            if (this.userDocPic) {
              const rcImagesArray = this.leadForm.get(
                'userDocumentsPictures'
              ) as FormArray;
              this.userDocPic.forEach((rcUrl: any) => {
                rcImagesArray.push(this.fb.control(rcUrl?.img));
              });
            }

            // vehiclePic.forEach(imageUrl => {
            //   this.addImageControl(imageUrl);
            // });

            // vehiclePic.forEach((ele: any) => {
            //             this.leadForm.newImage({
            //               src: ele,
            //               thumb: ele,
            //             });
            //           });
            // this.driverAssignmentList = data?.items;
            this.leadForm.patchValue(data);
            if (
              this.adminSeen == false ||
              this.adminHasSeenQuotation == false
            ) {
              this.leadStatus = 'PROCESSING';
              this.onSubmit();
            }
            // if(data.leadStatus == "CLOSED"){
            //   this.leadStatus= 'CLOSED'
            // }
            // else if(data.leadStatus == "DEAL_CANCELLED"){
            //   this.leadStatus= 'DEAL_CANCELLED'
            // }
            // else if(data.towingPictures?.length > 0 && data.scrapPictures?.length == 0){
            //   this.leadStatus= 'PICKEDUP'
            // }
            // else if(data.scrapPictures?.length > 0){
            //   this.leadStatus= 'SCRAPPED'
            // }
            // else if(data.dealerdata && this.scheduledDate){
            //   this.leadStatus= 'SCHEDULED'
            // }
            // else{
            //   this.leadStatus = data.leadStatus;
            // }
            // this.getLeadQuotationStatus();
            // this.getDealersByCity(res.data.userCity);
          } else {
            this.spinner.hide();
            alert(res?.message);
          }
        },
        (err: any) => {
          this.spinner.hide();
          alert(err?.error?.message);
        }
      );
  }

  getLeadQuotationStatus() {
    this.baseApi
      .get(
        urlConfig.getAllPath +
          `?collectionName=${urlConfig.driverLeadStatus}&leadId=${this.leadId}`
      )
      .subscribe((res: any) => {
        this.originalDriverStatusData = res?.data?.docs;
        this.driverAssignmentList = res?.data?.docs;
        console.log(this.driverAssignmentList);

        // this.driverAssignmentList = res?.data?.docs.flatMap((doc: any) => {
        //   return doc.quotations.map((quotation: any) => ({
        //     dealerName: doc?.dealerName,
        //     dealerUserName: doc?.dealerUserName,
        //     leadStatus: doc?.leadStatus,
        //     dealerCity: doc?.dealerCity,
        //     dealerPrice: quotation?.dealerPrice, // Get the dealerPrice from the quotation
        //     dealerId: doc?.dealerId,
        //     quotationId: quotation?.id,
        //     dealerLeadStatusId: doc?._id,
        //     quotationGivenTime: quotation?.quotationGivenTime,
        //     isAssigned: quotation?.isAssigned,
        //   }));
        // });
      });
  }

  // prepareUpdatedData(unAssign: any) {
  //   const updatedDocs = this.originalDriverStatusData.map((doc: any) => {
  //     // Update the quotations with isAssigned flag
  //     unAssign ? (doc.leadStatus = 'QUOTED') : (doc.leadStatus = 'ASSIGNED');
  //     const updatedQuotations = doc.quotations.map((quotation: any) => {
  //       // Find the matching quotation from driverAssignmentList based on dealerId and dealerPrice
  //       const matchingQuotation = this.driverAssignmentList.find(
  //         (q: any) =>
  //           q.dealerId === doc.dealerId &&
  //           q.dealerPrice === quotation.dealerPrice
  //       );
  //       // If found, add the isAssigned property
  //       if (matchingQuotation) {
  //         return { ...quotation, isAssigned: matchingQuotation.isAssigned };
  //       }
  //       return quotation;
  //     });

  //     // Filter the updated quotations to only keep those where isAssigned is true
  //     // const filteredQuotations = updatedQuotations.filter((quotation: any) => quotation.isAssigned === true);
  //     const filteredQuotations = updatedQuotations;

  //     // Return the document with updated quotations (keeping other properties intact)
  //     return { ...doc, quotations: filteredQuotations };
  //   });

  //   return updatedDocs;
  // }

  newImage(): FormGroup {
    return this.fb.group({
      img: [''],
      title: 'title',
    });
  }

  newTowingImage(): FormGroup {
    return this.fb.group({
      img: [''],
    });
  }

  newRcImage(): FormGroup {
    return this.fb.group({
      img: [''],
      title: 'title',
    });
  }

  newChasisImage(): FormGroup {
    return this.fb.group({
      img: [''],
      title: 'title',
    });
  }

  newScrapImageFields(): FormGroup {
    return this.fb.group({
      img: [''],
      title: 'title',
    });
  }

  newFeilds(): FormGroup {
    return this.fb.group({
      dealerCity: [''],
      dealerCityId: [''],
      dealerId: [''],
      dealerLeadStatusId: [''],
      dealerName: [''],
      dealerPrice: [''],
      dealerUserName: [''],
      productId: [''],
    });
  }
  showDealers(i: any) {
    this.assignIndex = i;
  }

  isQuoted: any = [];



  getDriversByCity() {
    // this.citySelected = id;

    this.baseApi
      .get(
        // `${urlConfig.getDrivers}?city=${this.leadResponse?.locations[0]}`
        `${urlConfig.getDrivers}?city=${this.leadResponse?.userCity}&accountStatus=approved`
      )
      .subscribe((res: any) => {
        this.allDrivers = res?.data?.docs;
         if(this.leadResponse?.assign?.driverId){
              this.selectDriver(this.leadResponse?.assign?.driverId);
            }
      });
  }

  assignLeadToDriver(value){
let url = "";
    if(value == 'unassign'){
     url = `${urlConfig.unAssignLeadToDriver}/${this.leadResponse?._id}`;
    }else{
     url = `${urlConfig.assignLeadToDriver}/${this.leadResponse?._id}`;
    }
    const payload = {
      "driverId" : this.selectedDriverAssigned?.driverId?._id,
    };


     Swal.fire({
      text: `Are you sure you want to ${value} lead to ${this.selectedDriverAssigned?.firstName + " " + this.selectedDriverAssigned?.lastName}.`,
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
            this.baseApi.patch(url, payload).subscribe((res:any)=>{
      if(res?.status == 'success'){
        this.toastr.success(`Lead ${value} to driver successfully`);
        this.getLeadById();
      }else{
        this.toastr.error('Something went wrong. Please try again.');
      }
  })
      } else if (result.isDenied) {
      }
    });
}

  selectDriver(id: any) {
    // this.driverId = id?.value;
        console.log(id);

    // if(this.dealerQuotation){
    // if (this.delearSingleQuote) {
    this.allDrivers.filter((res: any) => {
      if (res._id == id?.value || id) {
        console.log(res);
        this.selectedDriverAssigned = res;
      }
    });
    // } else {
    //   alert('Add the amounts');
    // }
  }

  assignToDriver(
    driverId: any,
    index: number,
    unAssign?: boolean,
    leadStatus?: string
  ) {
    // Reset all assignments first
    this.driverAssignmentList.forEach(
      (driver: any) => (driver.isAssigned = false)
    );

    // Assign/unassign the specific driver
    this.driverAssignmentList[index].isAssigned = !unAssign;

    // Update status
    this.driverAssignmentList[index].leadStatus = unAssign
      ? this.driverAssignmentList[index].leadStatus
      : 'ASSIGNED';

    this.leadStatus = unAssign ? leadStatus || 'AVAILABLE' : 'ASSIGNED';

    // Prepare the data to send for update
    const dataToSend = this.prepareUpdatedDriverData(driverId, unAssign);

    // API call to update the driver assignment
    this.baseApi
      .patch(urlConfig.updatePath + driverId, dataToSend)
      .subscribe((res: any) => {
        if (res?.status === 'success') {
          this.isAssigned = !unAssign;
        }
      });
  }

  prepareUpdatedDriverData(driverId: any, unAssign: boolean) {
    const updatedDrivers = this.originalDriverStatusData.map((driver: any) => {
      // Mark each driver’s status
      driver.leadStatus = unAssign ? 'AVAILABLE' : 'ASSIGNED';

      // If this is the driver being updated, toggle the flag
      if (driver.driverId === driverId) {
        driver.isAssigned = !unAssign;
      }

      return { ...driver };
    });

    // You can return a single object if your API expects one driver record, not the full list
    const updatedDriver = updatedDrivers.find(
      (d: any) => d.driverId === driverId
    );
    return updatedDriver || {};
  }

  // assignToDriver(
  //   dealerLeadStatusId: any,
  //   dealerId: any,
  //   index: any,
  //   // quotationId: any,
  //   unAssign?: any,
  //   leadStatus?: any
  // ) {
  //   this.driverAssignmentList.forEach(
  //     (assignmentList: any) => (assignmentList.isAssigned = false)
  //   );

  //   this.driverAssignmentList[index].isAssigned = unAssign ? false : true;
  //   // this.driverAssignmentList[index].assignedTo =  unAssign ? dealerId : '';

  //   this.driverAssignmentList[index].leadStatus = unAssign
  //     ? this.driverAssignmentList[index].leadStatus
  //     : 'ASSIGNED';

  //   this.leadStatus = unAssign
  //     ? leadStatus
  //       ? leadStatus
  //       : 'PROCESSING'
  //     : 'ASSIGNED';

  //   const updatedData = this.prepareUpdatedData(unAssign);
  //   let dataToSend: any;
  //   updatedData.map((res: any) => {
  //     if (dealerLeadStatusId == res?._id) {
  //       dataToSend = res;
  //     }
  //   });

  //   this.baseApi
  //     .patch(urlConfig.updatePath + dealerLeadStatusId, dataToSend)
  //     .subscribe((res: any) => {
  //       if (res?.status == 'success') {
  //         this.isAssigned = unAssign ? false : true;
  //         // this.updateDealerQuotationStatusInMainApi(
  //         //   dealerId,
  //         //   quotationId,
  //         //   this.isAssigned,
  //         //   false
  //         // );
  //       }
  //     });
  // }

  updateDealerQuotationStatusInMainApi(
    dealerId,
    quotationId,
    unAssign,
    remove
  ) {
    const dealer = this.dealerQuotationId.find((d) => d.dealerId === dealerId);
    const quotationIndex = dealer.quotations.findIndex(
      (q: any) => q.id === quotationId
    );
    const dealerIndex = this.dealerQuotationId.findIndex(
      (d) => d.dealerId === dealerId
    );

    console.log('dealer2', dealer, quotationIndex);
    if (dealer && Array.isArray(dealer.quotations)) {
      const quotation = dealer.quotations.find(
        (q: any) => q.id === quotationId
      );
      if (quotationIndex !== -1) {
        if (remove) {
          dealer.quotations.splice(quotationIndex, 1); // remove the quotation
          this.dealerQuotationId[dealerIndex] = { ...dealer };
          console.log('this.dealerQuotationId', this.dealerQuotationId);
          this.assignedTo = '';

          alert('Quotation Removed');
          this.onSubmit();
          // window.location.reload();
        } else {
          if (quotation) {
            quotation.isAssigned = unAssign;
            console.log('Updated quotation:', quotation, unAssign);
            this.assignedTo = unAssign ? dealerId : '';

            this.onSubmit();
            alert('Assigned to Dealer');
            // window.location.reload();
          } else {
            console.warn('Quotation not found for given ID:', quotationId);
          }
        }
      }
    } else {
      console.warn('Dealer not found for given ID:', dealerId);
    }
  }

  getDealerList() {
    this.api.getAllDealers().subscribe(
      (res: any) => {
        if (res?.message == 'Successfully Dealer fetched') {
          this.allDrivers = res?.data;
        } else {
          alert('Something went wrong, Try again');
        }
      },
      (err: any) => {
        alert(err.error.message);
      }
    );
  }

  userConfirm(event: any) {
    this.confirmedByUser = event.value;
  }

  dealerConfirm(event: any) {
    this.confirmedByDealer = event.value;
  }

  selectDate(event: any) {
    this.leadStatus = 'SCHEDULED';
    this.scheduledDate = event.value;
  }

  leadStatusChange(event: any) {
    this.leadStatus = event?.value;
    if (this.leadStatus == 'DEAL_CANCELLED') {
      const index = this.driverAssignmentList.findIndex(
        (res: any) => res?.isAssigned == true
      );
      const isAssignedDriverDetailsId = this.driverAssignmentList.find(
        (res: any) => res?.isAssigned == true
      );
      if (isAssignedDriverDetailsId) {
        // this.assignToDriver(
        //   isAssignedDealerDetailsId?.dealerLeadStatusId,
        //   index,
        //   'unassign',
        //   'DEAL_CANCELLED'
        // );
        // this.assignToDriver(
        //   isAssignedDriverDetailsId?.driverId,
        //   index,
        //   true,
        //   'UNASSIGNED'
        // );
      }
    }
  }

  onSubmit() {
    const data = this.leadForm.value;
    data.collectionName = 'leads';
    // data.collectionName = 'products';
    data.adminSeen = true;
    data.adminHasSeenQuotation = true;
    // data.mainPicture = data?.vehiclePictures[0];
    data.callTrackingId = this.callTrackingId;
    data.caseTrackingId = this.caseTrackingId;
    data.userFinalAmount = this.askingPrice;
    data.teleCaller = this.callTrackingStatus;
    data.isAssigned = this.isAssigned;
    data.assignedTo = this.assignedTo;
    data.leadStatus = this.leadStatus;
    data.dealerQuotationId = this.dealerQuotationId;
    if (this.assignedDealerId || this.assignedDealerData) {
      data.schedulePickUp = {
        dealerId: this.assignedDealerId,
        date: this.scheduledDate,
        confirmedByDealer: this.confirmedByDealer,
        confirmedByUser: this.confirmedByUser,
      };
    } else {
      data.schedulePickUp = {
        dealerId: null,
        date: this.scheduledDate,
        confirmedByDealer: false,
        confirmedByUser: this.confirmedByUser,
      };
    }
    data.teleCallerData = {
      fullName: localStorage?.getItem('loiuy324re'),
      userName: localStorage?.getItem('loiuy09un'),
      id: localStorage?.getItem('loiuid'),
      accountType: localStorage?.getItem('loiu0ac'),
    };

    if (this.leadStatus == 'DEAL_CANCELLED') {
      data.leadIsVerified = 'false';
    }

    //     if(this.leadStatus == "CLOSED"){
    //       data.leadStatus == "CLOSED"
    //     }
    //     else if(this.leadStatus == "DEAL_CANCELLED"){
    //       data.leadStatus == "DEAL_CANCELLED"
    //     }

    // else if(this.leadStatus == "ASSIGNED"){
    //   data.leadStatus = 'ASSIGNED';
    // }
    // else if(this.leadStatus == "UN-ASSIGNED"){
    //   data.leadStatus = 'PROCESSING';
    // }
    // else if(this.leadStatus == "SCHEDULED"){
    //   data.leadStatus = 'SCHEDULED';
    // }
    // else{
    //   data.leadStatus = this.leadStatus;

    // }
    //     data.username = data.username;
    // data.city = this.citySelected;

    if (!this.leadForm.valid) {
      // this.leadForm.markAllAsTouched();
      alert('You have missed our some fieds');
    } else {
      console.log('data', data);
      this.spinner.show();
      if (this.adminSeen == false || this.adminHasSeenQuotation == false) {
        this.baseApi
          .patch(urlConfig.updatePath + this.leadId, data)
          .pipe(
            finalize(async () => {
              this.spinner.hide();
            }),
            catchError((error) => {
              throw error;
            })
          )
          .subscribe((res: any) => {
            this.adminSeen = true;
            this.adminHasSeenQuotation = true;
          });
      } else {
        this.baseApi
          .patch(urlConfig.updatePath + this.leadId, data)
          .pipe(
            finalize(async () => {
              this.spinner.hide();
            }),
            catchError((err) => {
              alert(err.error.message);
              throw err;
            })
          )
          .subscribe((res: any) => {
            if (res?.status == 'success') {
              alert('Successfully Lead Updated');
              window.location.reload();
            } else {
              alert(res?.message);
            }
          });
      }
    }
  }

  get abc(): FormArray {
    return this.leadForm.get('vehiclePictures') as FormArray;
  }
  get abcTowingPic(): FormArray {
    return this.leadForm.get('towingPictures') as FormArray;
  }
  get abcScrapedPic(): FormArray {
    return this.leadForm.get('scrapPictures') as FormArray;
  }
  get abcEnginePic(): FormArray {
    return this.leadForm.get('enginePictures') as FormArray;
  }
  get abcUserDocPic(): FormArray {
    return this.leadForm.get('userDocumentsPictures') as FormArray;
  }
  get abcRc(): FormArray {
    return this.leadForm.get('rcPictures') as FormArray;
  }
  get abcChasis(): FormArray {
    return this.leadForm.get('chasisPictures') as FormArray;
  }

  get abcd(): FormArray {
    return this.leadForm.get('items') as FormArray;
  }
  get abcScrap(): FormArray {
    return this.leadForm.get('scrapLetterPictures') as FormArray;
  }

  removeItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abc.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeScrapItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcScrap.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeRcItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcRc.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeScrapedItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcScrapedPic.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeEngineItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcEnginePic.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeUserDocItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcUserDocPic.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeTowingItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcTowingPic.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }

  removeChasisItem(index: number): void {
    Swal.fire({
      text: 'Are you sure you want to delete image.',
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.abcChasis.removeAt(index);
      } else if (result.isDenied) {
      }
    });
  }
  removeFields(index: number): void {
    this.abcd.controls.splice(index, 1);
  }

  addImg() {
    this.abc.push(this.newImage());
  }

  addRcImg() {
    this.abcRc.push(this.newRcImage());
  }

  addTowingImg() {
    this.abcTowingPic.push(this.newTowingImage());
  }

  addScrapedImg() {
    this.abcScrapedPic.push(this.newTowingImage());
  }

  addEngineImg() {
    this.abcEnginePic.push(this.newTowingImage());
  }

  addUserDocImg() {
    this.abcUserDocPic.push(this.newTowingImage());
  }

  addChasisImg() {
    this.abcChasis.push(this.newChasisImage());
  }

  addScrapImages() {
    this.abcScrap.push(this.newScrapImageFields());
  }

  addFields() {
    this.abcd.push(this.newFeilds());
  }
  towingPicChangeListeners($event: any, i: any): void {
    this.towingPicReadThiss($event.target, i);
  }
  scrapedPicChangeListeners($event: any, i: any): void {
    this.scrapedPicReadThiss($event.target, i);
  }
  enginePicChangeListeners($event: any, i: any): void {
    this.enginePicReadThiss($event.target, i);
  }
  userDocPicChangeListeners($event: any, i: any): void {
    this.userDocPicReadThiss($event.target, i);
  }
  rcChangeListeners($event: any, i: any): void {
    this.rcReadThiss($event.target, i);
  }
  chasisChangeListeners($event: any, i: any): void {
    this.chasisReadThiss($event.target, i);
  }
  changeListeners($event: any, i: any): void {
    this.readThiss($event.target, i);
  }

  scrapChangeListeners($event: any, i: any): void {
    this.scrapImagesReadThiss($event.target, i);
  }

  readThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.vehImage = myReader.result;

      let a: any = this.leadForm.controls['vehiclePictures'];

      a['controls'][i].patchValue({
        img: this.vehImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  userDocPicReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.userDocImage = myReader.result;

      let a: any = this.leadForm.controls['userDocumentsPictures'];

      a['controls'][i].patchValue({
        img: this.userDocImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  enginePicReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.engineImage = myReader.result;

      let a: any = this.leadForm.controls['enginePictures'];

      a['controls'][i].patchValue({
        img: this.engineImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  scrapedPicReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.scrapedImage = myReader.result;

      let a: any = this.leadForm.controls['scrapPictures'];

      a['controls'][i].patchValue({
        img: this.scrapedImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  towingPicReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.towingImage = myReader.result;

      let a: any = this.leadForm.controls['towingPictures'];

      a['controls'][i].patchValue({
        img: this.towingImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  rcReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.rcImage = myReader.result;

      let a: any = this.leadForm.controls['rcPictures'];

      a['controls'][i].patchValue({
        img: this.rcImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  chasisReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.chasisImage = myReader.result;

      let a: any = this.leadForm.controls['chasisPictures'];

      a['controls'][i].patchValue({
        img: this.chasisImage,
      });
    };
    myReader.readAsDataURL(file);
  }

  scrapImagesReadThiss(inputValue: any, i: any) {
    var file: File = inputValue.files[0];
    if (!file) {
      return;
    }
    // Check file size (in bytes)
    const maxSizeKB = 2048; // 2MB in kilobytes
    const maxSizeBytes = maxSizeKB * 1024;
    if (file.size > maxSizeBytes) {
      alert('File size exceeds 2MB. Please choose a smaller file.');
      return;
    } else {
      // alert('Uploaded successfully.');
    }
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.scrapGetImages = myReader.result;

      let a: any = this.leadForm.controls['scrapLetterPictures'];

      a['controls'][i].patchValue({
        img: this.scrapGetImages,
      });
    };
    myReader.readAsDataURL(file);
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  removeAssignLeadToDealer(id: any) {
    let data = {
      productId: this.leadId,
    };

    Swal.fire({
      text: `Are you sure you want to un-assign lead to this dealer.`,
      showDenyButton: true,
      showCancelButton: false,
      allowOutsideClick: false,
      confirmButtonText: 'Ok',
      denyButtonText: `Cancel`,
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.api.removeAssignLeadToDealer(id, data).subscribe(
          (res: any) => {
            if (res?.message == 'Successfully Assigned Product Removed ') {
              this.toastr.success(res?.message);
              this.leadStatus = 'Processing';
              this.isAssigned = false;
              this.assignedDealerId = null;
              this.assignedDealerData = [];
              this.onSubmit();
              window.location.reload();
            } else {
              this.toastr.error('Try again');
            }
          },
          (err: any) => {
            this.toastr.error(err.error.message);
          }
        );
      } else if (result.isDenied) {
      }
    });
  }

  updateCallingStatus(selectedStatus: any) {
    this.callTrackingStatus = selectedStatus?.value;
  }

  updateCaseIssueBy(selectedStatus: any) {
    this.caseIssueBy = selectedStatus?.value;
  }
  updateCaseType(selectedStatus: any) {
    this.caseType = selectedStatus?.value;
  }
  updateCaseStatus(selectedStatus: any) {
    this.caseTrackingStatus = selectedStatus?.value;
  }

  updateStatusData() {
    if (!this.callTrackingStatus) {
      alert('Enter Required Fields.');
    } else {
      let staffName = localStorage?.getItem('loiuy324re');
      let staffUserName = localStorage?.getItem('loiuy09un');
      let staffId = localStorage?.getItem('loiuid');
      let leadStatusPayload = {
        collectionName: urlConfig.teleCallerLeadStatus,

        callStatus: [
          {
            comment: this.userComment,
            status: this.callTrackingStatus,
            staffId: staffId,
            staffName: staffName,
            staffUserName: staffUserName,
            calledDate: new Date(),
            askingPrice: this.askingPrice,
            givenPrice: this.givenPrice,
          },
        ],

        productId: this.leadId,
      };

      let path = this.callTrackingId
        ? urlConfig.updatePath + this.callTrackingId
        : urlConfig.createPath;
      let urlMethod: any = this.callTrackingId
        ? this.baseApi.patch.bind(this.baseApi)
        : this.baseApi.post.bind(this.baseApi);

      if (this.callTrackingId) {
        let payload = {
          collectionName: urlConfig.teleCallerLeadStatus,
          id: this.callTrackingId,
        };
        this.spinner.show();

        this.baseApi
          .post(urlConfig.getOnePath, payload)
          .pipe(
            catchError((error) => {
              alert(error?.error?.message);
              throw error;
            }),
            finalize(() => {
              // this.spinner.hide();
            })
          )
          .subscribe((response: any) => {
            let existingCallStatus = response?.data?.callStatus || [];

            existingCallStatus.push({
              comment: this.userComment,
              status: this.callTrackingStatus,
              staffId: staffId,
              staffName: staffName,
              staffUserName: staffUserName,
              calledDate: new Date(),
              askingPrice: this.askingPrice,
              givenPrice: this.givenPrice,
            });

            leadStatusPayload.callStatus = existingCallStatus;
            // this.spinner.show();

            urlMethod(path, leadStatusPayload)
              .pipe(
                finalize(() => {
                  // this.spinner.hide();
                }),
                catchError((err) => {
                  alert(err?.error?.message);

                  throw err;
                })
              )
              .subscribe((response: any) => {
                if (response?.status == 'success') {
                  this.callTrackingId = response?.data?._id;
                  this.onSubmit();
                }
              });
          });
      } else {
        // this.spinner.show();

        urlMethod(path, leadStatusPayload)
          .pipe(
            finalize(() => {
              // this.spinner.hide();
            }),
            catchError((err) => {
              alert(err?.error?.message);

              throw err;
            })
          )
          .subscribe((response: any) => {
            if (response?.status == 'success') {
              this.callTrackingId = response?.data?._id;
              this.adminSeen = true;
              this.adminHasSeenQuotation = true;
              this.onSubmit();
            }
          });
      }
    }
  }

  async updateCaseStatusData() {
    if (!this.callTrackingStatus) {
      alert('Enter Required Fields.');
    } else {
      let staffName = localStorage?.getItem('loiuy324re');
      let staffUserName = localStorage?.getItem('loiuy09un');
      let staffId = localStorage?.getItem('loiuid');
      let leadStatusPayload = {
        collectionName: urlConfig.scrapLeadCase,

        caseData: [
          {
            comment: this.caseComment,
            caseIssueBy: this.caseIssueBy,
            caseType: this.caseType,
            status: this.caseTrackingStatus,
            staffId: staffId,
            staffName: staffName,
            staffUserName: staffUserName,
            calledDate: new Date(),
          },
        ],

        leadId: this.leadId,
        caseId: await this.generateUniqueProductNameAsync(),
      };

      let path = this.caseTrackingId
        ? urlConfig.updatePath + this.caseTrackingId
        : urlConfig.createPath;
      let urlMethod: any = this.caseTrackingId
        ? this.baseApi.patch.bind(this.baseApi)
        : this.baseApi.post.bind(this.baseApi);

      if (this.caseTrackingId) {
        let payload = {
          collectionName: urlConfig.scrapLeadCase,
          id: this.caseTrackingId,
        };
        this.spinner.show();

        this.baseApi
          .post(urlConfig.getOnePath, payload)
          .pipe(
            catchError((error) => {
              alert(error?.error?.message);
              throw error;
            }),
            finalize(() => {
              // this.spinner.hide();
            })
          )
          .subscribe((response: any) => {
            let existingCaseStatus = response?.data?.caseData || [];

            existingCaseStatus.push({
              comment: this.caseComment,
              status: this.caseTrackingStatus,
              staffId: staffId,
              staffName: staffName,
              staffUserName: staffUserName,
              calledDate: new Date(),
              caseIssueBy: this.caseIssueBy,
              caseType: this.caseType,
            });

            leadStatusPayload.caseData = existingCaseStatus;

            urlMethod(path, leadStatusPayload)
              .pipe(
                finalize(() => {
                  // this.spinner.hide();
                }),
                catchError((err) => {
                  alert(err?.error?.message);

                  throw err;
                })
              )
              .subscribe((response: any) => {
                if (response?.status == 'success') {
                  this.caseTrackingId = response?.data?._id;
                  this.onSubmit();
                }
              });
          });
      } else {
        // this.spinner.show();

        urlMethod(path, leadStatusPayload)
          .pipe(
            finalize(() => {
              // this.spinner.hide();
            }),
            catchError((err) => {
              alert(err?.error?.message);

              throw err;
            })
          )
          .subscribe((response: any) => {
            if (response?.status == 'success') {
              this.caseTrackingId = response?.data?._id;
              this.adminSeen = true;
              this.adminHasSeenQuotation = true;
              this.onSubmit();
            }
          });
      }
    }
  }

  generateUniqueProductNameAsync(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const prefix = 'CL';
        const randomPart = Math.random()
          .toString(36)
          .substring(2, 7)
          .toUpperCase();
        const uniqueProductName = `${prefix}${randomPart}`;
        resolve(uniqueProductName);
      }, 1000); // Simulating an async operation with a 1-second delay
    });
  }

  getCallTrackingData() {
    let payload = {
      collectionName: urlConfig.teleCallerLeadStatus,
      id: this.callTrackingId,
    };
    this.baseApi
      .post(urlConfig.getOnePath, payload)
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == 'success') {
          this.callTrackingList = res?.data?.callStatus
            ? res?.data?.callStatus
            : [];
          let index = this.callTrackingList?.length - 1;
          this.givenPrice = this.callTrackingList[index]?.givenPrice;
        }
      });
  }
  getCaseTrackingData() {
    let payload = {
      collectionName: urlConfig.scrapLeadCase,
      id: this.caseTrackingId,
    };
    this.baseApi
      .post(urlConfig.getOnePath, payload)
      .pipe(
        catchError((error) => {
          throw error;
        })
      )
      .subscribe((res: any) => {
        if (res?.status == 'success') {
          this.caseTrackingList = res?.data?.caseData
            ? res?.data?.caseData
            : [];
          let index = this.caseTrackingList?.length - 1;
          // this.givenPrice = this.caseTrackingList[index]?.givenPrice;
        }
      });
  }

  openWhatsApp(phone: string) {
    const cleanedPhone = phone.replace(/\D/g, '');

    // Check if number starts with a country code (like 91 for India)
    const hasCountryCode = cleanedPhone.length >= 11; // You can adjust this check based on your needs
    const defaultCountryCode = '91'; // Change this to your default country code

    const finalPhone = hasCountryCode
      ? cleanedPhone
      : defaultCountryCode + cleanedPhone;

    const url = `https://wa.me/${finalPhone}`;
    window.open(url, '_blank');
  }

  editPage() {
    this.enableEdit = !this.enableEdit;
  }


  formatDateForInput(dateString: string): string {
  if (!dateString) return '';
  return dateString.split('T')[0]; // YYYY-MM-DD
}

formatTimeForInput(dateString: string): string {
  if (!dateString) return '';
  return dateString.substring(11, 16); // HH:mm
}

}
