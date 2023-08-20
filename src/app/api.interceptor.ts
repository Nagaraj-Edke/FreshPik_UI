import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let requestURL = request.url;
    let modifiedRequest = request;
    if(requestURL.includes('secured') || requestURL.includes('verify-token')) {
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': localStorage.getItem('token') || ''
        }
      })
    }
    return next.handle(modifiedRequest).pipe(tap({
      error: (e) => {
        if(e.status === 401 && (requestURL.includes('secured') || requestURL.includes('verify-token'))){
          localStorage.removeItem('token');
          localStorage.removeItem('user')
        }
      }
    }));
  }
}
