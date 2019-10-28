import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private common:CommonService) { }

  login(userid: string,pass:string): Observable<any> {
    console.log("code")
    let  data=new HttpParams().set("Code","");
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.post<{token: string}>('sfv3/integrumws.nsf/doLoginSuccessAuth?OpenPage',data,options)
      .pipe(
        map(result => { 
                 console.log(result);
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err =  JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log("登录错误")
    console.log(errMsg);
    return "{'returnResponse':'failure'}";
  };
  
  sendEmail(email:string,slid:string,code:string ):Observable<any>{
    
    let  data=new HttpParams().set("email",email).set("code",code); 
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
