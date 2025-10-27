import { JwtService } from './jwt.service';
import { Injectable, SkipSelf } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('oju23ui34');
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.jwtService.getToken()}`
        }
      });

    }

    // return next.handle(req);
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // this.action.presentActionSheet();
          localStorage.clear();
          this.router.navigateByUrl('/login');
        }
        return throwError(error);
      })
    );
  }


}
