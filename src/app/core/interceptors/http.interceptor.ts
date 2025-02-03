import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Cloning the request to add headers
    const modifiedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    });

    // Handle the request and response
    return next.handle(modifiedReq).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('Response intercepted:', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error intercepted:', error);
        return throwError(error);
      })
    );
  }
}
