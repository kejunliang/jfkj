import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private common:CommonService,private storage:Storage,) {}

  login(userid: string,pass:string,server:string,folder:string): Observable<any> {
    console.log("code")
    
    let  data=new HttpParams().set("Code","");
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.post<{token: string}>(folder+'/integrumws.nsf/doLoginSuccessAuth?OpenPage',data,options)
      .pipe(
        map(result => { 
                 console.log(result);
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

  
  
  sendEmail(name:string,slid:string,code:string,password:string):Observable<any>{
    let s=new Date();
    let deviceid=s.getTime().toString()
    let  data=new HttpParams().set("code",code).set("deviceid",deviceid).set("devicettype","test"); 
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
