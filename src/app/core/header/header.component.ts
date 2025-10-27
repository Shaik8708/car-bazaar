import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { catchError, finalize } from 'rxjs';
import { ObservableService } from 'src/app/services/observable.service';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import urlConfig from './../../config/url.config.json';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnChanges  {
  public href:any ="";

fullName :any;
accType :any;
  constructor(private fetch:ObservableService,
    private baseApi:BaseApiService
  ) {
    this.fetch.navData.subscribe((res: any) => {

      this.checkUrl();


      });

      this.fetch.loginStatus$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          
          this.fullName = localStorage?.getItem('loiuy324re')
          this.accType = localStorage?.getItem('loiu0ac');
        }
      });

  }

  ngOnChanges(changes: SimpleChanges) {
    this.checkUrl();
  

  }




  ngOnInit() {  
    this.loadJsFile("assets/js/main.js");  
    this.fullName = localStorage?.getItem('loiuy324re');
    this.accType = localStorage?.getItem('loiu0ac');
  }  
  public loadJsFile(url:any) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }  

  checkUrl(){
    this.href = window.location.pathname;
    console.log("ll",this.href)

  }
  clear(){
    let fullName = localStorage?.getItem('loiuy324re');
    let accountType = localStorage?.getItem('loiu0ac');

    let staffId = localStorage?.getItem('loiuid');
    let username = localStorage?.getItem('loiuy09un');
    this.logLoginData(staffId, accountType, fullName, username);
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
      logType:'logout'
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
      if(res?.status == 'success'){
    localStorage.clear();
      }
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
