import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class GetousService {

  constructor(private http: HttpClient,private common:CommonService) { }


  getous(userid: string,pass:string,server:string,folder:string): Observable<any> {
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(folder+'/integrumws.nsf/xp_App.xsp/getOUs',options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

  getLoginPic(logindetail:any): Observable<any> {
    const {server,folder,username,password,code} = logindetail;
    let auth='Basic '+btoa(username+':'+password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    const curl:string = `${folder}/appmgt.nsf/xp_ws.xsp/getAppKeyword?code=${code}&server=${server}&folder=${folder}`;
    //return this.http.get<{token: string}>(folder+'/appmgt.nsf/xp_ws.xsp/getAppKeyword?client='+code)
    //return this.http.get<{token: string}>(folder+'/integrumws.nsf/xp_webservices.xsp/getAppKeyword',options)
    return this.http.get<{token: string}>(curl)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }

  
}
