import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ObservableService } from 'src/app/services/observable.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-assigned-to-dealer',
  templateUrl: './assigned-to-dealer.component.html',
  styleUrls: ['./assigned-to-dealer.component.css']
})
export class AssignedToDealerComponent {
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  pagination: any = null;
  lastpage: any;
  totalList: any;
  dealerQuotation: any;
  userFinalAmount: any;
  dealerName: any ="";

  dropdownIndex: any;
  assignIndex: any;
  showDate:any;
  isData:boolean = true;

  allDealers:any;

  getList:any[]=[]
  constructor(private api:ApiService, private paginationService: PaginationService, private toastr: ToastrService, private router: Router, private spinner: NgxSpinnerService,
    private fetch:ObservableService) { }

  ngOnInit(): void {
    this.fetch.navSerachBar("");

    this.reset();
    this.api.getAllDealers().subscribe((res:any) => {
      console.log(res);
      if(res?.message == "Successfully Dealer fetched"){
        this.allDealers = res?.data;
      }
      else{
        alert("Something went wrong, Try again");
      }
    },(err:any)=>{
      alert(err.error.message);
    }
    )


  }

  getPage(data: any) {
    this.currentPage = data?.page;
    console.log("data", this.currentPage);
    this.currentPageLimit = data?.limit;
    this.getAllLeads();
  }


  reset(){



    this.getAllLeads();

    var da = new Date();
    var datesss:any = da.toLocaleDateString();


    var rev = datesss.split('/')
    this.showDate = rev[2]+"-"+rev[1]+"-"+rev[0]

  }

  getAllLeads(){
    const params = {
      page: this.currentPage,
      limit: this.currentPageLimit,
    };

    this.spinner.show();
    this.api.getLeadsByStatus(params, "AssignedToDealer").subscribe((res:any) => {

     if(res?.data?.length != 0){
      this.pagination = this.paginationService.getPager(
        res.data["totalDocs"],
        this.currentPage,
        this.currentPageLimit
      );

      this.getList = [];
    this.isData = true;

      this.getList = res?.data?.docs;
      this.totalList = res?.data?.totalDocs;

      this.getList.forEach(element => {
        var abc = element?.createdAt
        var s = abc.split('T')


        element.createdAtVariable = s[0]
      });
     }
     else if(res?.data?.length == 0){

    this.isData = false;
    this.pagination = null;
     }

      else if(res?.message == "jwt expired"){
        this.toastr.error("Token Expired, Loggin Again");
        this.pagination = null;
        this.router.navigateByUrl('/login');


      }
      this.spinner.hide();
    },
    (err:any) => {
      this.spinner.hide();
      this.pagination = null;
      if(err?.error?.message == "jwt expired"){
        this.toastr.error("Token Expired, Loggin Again");
    this.router.navigateByUrl('/login');

      }
    }
    )
  }




  assignToDealer(i:any,id:any,data:any){
    console.log(i,id.value, data);
    this.assignIndex = i;
    let abc=''

    if(this.userFinalAmount && this.dealerQuotation){
      this.allDealers.filter((res:any) => {
        if(res._id == id.value){
          abc = res?.createdBy?.fullName
        }
      })
      console.log(abc)

      const dataToSend = {
        products: [
          {
            productId:data?._id,
            dealerAmount: parseInt(this.dealerQuotation, 10),
            userFinalAmount: parseInt(this.userFinalAmount, 10)
          }


        ],
        dealerName: abc
      }
      console.log(dataToSend);

      this.api.assignLeadToDealer(id.value,dataToSend).subscribe((res:any) =>{
        console.log(res);
        if(res?.message == "Successfully Product assign to dealer"){
          alert("Successfully Product assign to dealer");
        }else{
          alert('Not assigned, try again');
        }
      },(err:any)=>{
        alert(err.error.message);
      }
      )
    }else{
      alert("Add the amounts");
    }
  }

  updateList(id:any,data:any){
    console.log(id, data.value)
    var dataToSend ={
      "teleCaller": data.value
  }
  this.spinner.show();

    this.api.updateStatus(id,dataToSend).subscribe((res:any) => {
      console.log(res)
      if(res?.message == "Successfully Product Update!"){
        this.dropdownIndex = null
        this.reset();
      }
      this.spinner.hide();
    })
  }



  showDropdown(i:any) {
    this.dropdownIndex = i;
  }

  showDealers(i:any) {
    this.assignIndex = i;
  }
}
