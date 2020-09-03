import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators'
import { CommonService } from '../common.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient,private common:CommonService,private platform: Platform) { }
  
  getAccount(userid: string,pass:string,email:string,server:string,folder:string): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('/'+folder+'/appmgt.nsf/xp_ws.xsp/getMyAccount?email='+email,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  };
  getReleaseInfo(userid: string,pass:string,folder:string): Observable<any> {
    let os:string = "Android";
    if(this.platform.is('ios')){
      os = "iOS";
    }
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>('/'+folder+'/appmgt.nsf/xp_ws.xsp/getReleaseInfo?os='+os,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  };
  
}
