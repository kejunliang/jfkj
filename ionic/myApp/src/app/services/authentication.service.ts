import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    console.log("111")
    return this.http.post<{token: string}>('/api/auth', {username: username, password: password})
      .pipe(
        map(result => { 
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  sendEmail(email:string,slid:string):Observable<any>{
    console.log("服务"+email)
    let  data=new HttpParams().set("email",email);
    return this.http.post('/sfv3/appmgt.nsf/xp_ws.xsp/UserAuthentication',data).pipe(
       map(
        result => { 
          console.log(result)
          return result;
        } 
       )
    )
  }
}
