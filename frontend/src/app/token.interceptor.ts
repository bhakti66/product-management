import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router"
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(
    request: HttpRequest<any>,

    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      let currentUserToken = JSON.parse(localStorage.getItem("currentUser"));
      let cloneReq = request
      if (currentUserToken && cloneReq.method!="OPTIONS") {
        cloneReq = request.clone({
          headers: request.headers.set(
            "token",
            currentUserToken['token']
          )
        });
      }

      return next.handle(cloneReq).pipe(
        map((event: HttpEvent<any>) => {
          
            return event;
        }),
        catchError((error: HttpErrorResponse) => {
          if(error.status==401){
            this.router.navigateByUrl("")
          }
          if(error.status==500){
            alert("Internal server error")
          }    
          return throwError(error);
        }));
  }
}
