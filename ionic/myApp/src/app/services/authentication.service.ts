import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(code: string): Observable<any> {
    console.log("code")
    let  data=new HttpParams().set("Code",code);
    return this.http.post<{token: string}>('/sfv3/appmgt.nsf/xp_ws.xsp/ValidateAuthCode',data)
      .pipe(
        map(result => { 
                 console.log(result)
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
