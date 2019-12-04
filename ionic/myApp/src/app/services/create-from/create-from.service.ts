import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from '../common.service';
@Injectable({
  providedIn: 'root'
})
export class CreateFromService {

  constructor(private http: HttpClient,private common:CommonService) { }
  
  getAction(logindetail:any,key:any): Observable<any> {
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    //http://oa.jf81.com/sfv3/integrumws.nsf/xp_App.xsp/getActDocFormData?unid=1A9D2024BB1EA9E4482584BE007DBC3E
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_App.xsp/getActDocsAssoForms?unid='+key,options)
      .pipe(
        map(result => { 
             return result;
        }),
        catchError(this.common.handleError)
      )
  }
  getPersonInfo(logindetail:any,key:any): Observable<any> {
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    //http://oa.jf81.com/sfv3/integrumws.nsf/xp_webservices.xsp/getPersonInfo?username=yuan%20tian
    return this.http.get<{token: string}>('sfv3/integrumws.nsf/xp_webservices.xsp/getPersonInfo?username='+key,options)
      .pipe(
        map(result => { 
             return result;
        }),
        catchError(this.common.handleError)
      )
  }
  getActionSava(logindetail:any,key:any): Observable<any> {
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    //http://oa.jf81.com/sfv3/smformdata.nsf/xp_smartFormWs.xsp/createActionDoc?
    //pid=555DEF88C9657A7E482584B90020ECC0&actTitle=Action+title01&actAssignee=zhen+ding
    //&actDesc=Description%3A&actDueDate=2019-12-03&actAtt=&actPriority=Minor
    //&actPriorityTitle=Minor&actionRevToInitiator=true
    return this.http.get<{token: string}>('sfv3/smformdata.nsf/xp_smartFormWs.xsp/createActionDoc?pid='+key,options)
      .pipe(
        map(result => { 
             return result;
        }),
        catchError(this.common.handleError)
      )
  }
}
