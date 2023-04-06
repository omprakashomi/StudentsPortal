import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  login(data:any):Observable<any>{
    return this.http.post(`${baseUrl}/api/user/login`,data);
  }

  signUp(data:any):Observable<any>{
    console.log(data);
    return this.http.post(`${baseUrl}/api/user/signup`,data);
  }

  public getUser() {
    let userStr=localStorage.getItem('user');
    if (userStr!=null) {
      return JSON.parse(userStr);
    } else{
      this.logOut;
      return null;
    }
  }

  getUserRole() {
    let user=this.getUser();
    return user.appUserRole;
  }

  isLoggedIn() {
    let tokenStr = localStorage.getItem('token');
    if (tokenStr==undefined || tokenStr=='' || tokenStr==null) {
      return false;
    } else {
      return true;
    }

  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserFromLocalStorage() {
    let userStr = localStorage.getItem('user');
    if(userStr!=null) {
      return JSON.parse(userStr);
    }else {
      this.logOut();
    }
  }

  // getUserRole() {
  //   return user.
  // }




}
