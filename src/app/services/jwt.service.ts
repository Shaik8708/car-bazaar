import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  getToken() {
    return localStorage.getItem('oju23ui34');
  }

  destroyToken(){
    return localStorage.removeItem('oju23ui34');
  }
}
