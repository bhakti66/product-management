import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators"
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,private http: HttpClient) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedIn()
  }

  isLoggedIn() {
    //check if user is logged in by checking if the token is available in localstorage. If yes, then check if the token is valid.
    if (localStorage.getItem('currentUser')) {
      return true
    }
    return false
  }

  login(email,password) {
    var body = {
      email: email,
      password: password
    }
    return this.http
      .post<any>(environment.apiUrl+`user/login`, body)
      .pipe(
        map(result => {
          // login successful if there's a jwt token in the response
          if (result && result.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(result));
          }

          // return result;
        })
      );
  }

  getCurrentUserDetails(email){
    var body = {
      email: email,
    }
    return this.http
      .post<any>(environment.apiUrl+`user/currentDetails`, body)
      .pipe(
        map(result => {
          return result
        })
      );
  }

  registerUser(payload){
    var body = {
      email : payload.email,
      password : payload.password
    }
    return this.http.post(environment.apiUrl+"user/register",body).pipe()
  }
}
