import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest=request;
    const token = localStorage.getItem('token');
    if (token!=null) {
      authRequest=authRequest.clone({setHeaders: {Authorization: `Bearer ${token}`}});
    }
    return next.handle(authRequest);
  }
}
export const authInterceptorProviders=[{
  prodvide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
},
];
