
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { ActionService } from '../action.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(public jwtService:JwtService, private action:ActionService,private cookieService: CookieService,
    private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const token = this.cookieService?.get('zlk_nsr_actkn');
      if (token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.jwtService.getToken()}`
          }
        });

      }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.action.presentActionSheet();
          this.cookieService.deleteAll();
          this.router.navigateByUrl('/home');
        }
        return throwError(error);
      })
    );
  }


}
