import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(public http: HttpClient) { }
  getAccount(userid: string,pass:string,email:string): Observable<any> {
    console.dir(userid+':'+pass)
    let auth='Basic '+btoa(userid+':'+pass);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get('/sfv3/integrumws.nsf/xp_App.xsp/getMyAccount?email='+email,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.handleError)
      )
  };
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
    console.log(errMsg);
    return "{'returnResponse':'failure'}";
  };
 
}
