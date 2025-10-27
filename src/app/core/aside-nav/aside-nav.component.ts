import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ObservableService } from 'src/app/services/observable.service';
declare var $: any;
@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.css']
})
export class AsideNavComponent implements OnInit {
  public href: any = "";
  loginType: any;
  userId: any;


  constructor(private router: Router, location: Location, private fetch: ObservableService) {
    this.fetch.navData.subscribe((res: any) => {

      this.checkUrl();


    });

    this.fetch.loginStatus$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.loginType = localStorage.getItem('loiu0ac');
      }
    });

  }

  ngOnInit() {
    this.loginType = localStorage.getItem('loiu0ac');
    this.userId = localStorage.getItem('loiuid');
    this.checkUrl();
    // Toggle sidebar
  }

  close() {
    $(".page-wrapper").toggleClass("toggled");
    this.fetch.get.next(true)
  }


  checkUrl() {
    this.href = window.location.pathname;
    console.log("ll", this.href)

  }


  parameters(val: any) {

    this.router.navigate(['/leads'])
    this.fetch.getarameters.next(val)
    this.fetch.click.next(true)
  }
}
