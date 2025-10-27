import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  constructor() { }

  public navData = new BehaviorSubject(null);

  navSerachBar(data: any) {
    this.navData.next(data);
  }

  public getFormData = new BehaviorSubject(null);

  formData(data: any) {
    this.getFormData.next(data);
  }

  public getDataSubject = new BehaviorSubject(null);

  fetchData(data: any) {
    this.getDataSubject.next(data);
  }

  public getLoginSubject = new BehaviorSubject(null);

  fetchLogin(data: any) {
    this.getLoginSubject.next(data);
  }

  private loginStatusSubject = new BehaviorSubject<boolean>(false);
  
  loginStatus$ = this.loginStatusSubject.asObservable();
  setLoginStatus(isLoggedIn: boolean): void {
    this.loginStatusSubject.next(isLoggedIn);
  }

public getarameters = new BehaviorSubject(0)
public click = new BehaviorSubject(false)
public  get = new BehaviorSubject(false)
}
