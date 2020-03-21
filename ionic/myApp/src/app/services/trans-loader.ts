import { Injectable } from '@angular/core';
import {HttpClient, HttpParams } from "@angular/common/http";
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs'; 
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';

@Injectable()
export class CustomTranslateLoader implements TranslateLoader  {
    contentHeader = new Headers({"Content-Type": "application/json","Access-Control-Allow-Origin":"*"});

    constructor(private http: HttpClient, public common:CommonService ) {}
    getTranslation(lang: string): Observable<any>{
      
      let auth='Basic '+btoa("ShiJun Tian"+':'+"mrt6627");
      const options = {
        headers: {
          "Content-Type":"application/json; charset=utf-8",
          "Authorization":auth
        }
      };
      return Observable.create(observer => {
        // this.http.get("/sfv3/integrumws.nsf/xp_App.xsp/getOUs", options).subscribe((res: Response) => {
        //           observer.next(res);
        //           observer.complete();               
        //       },
        this.http.get("/assets/i18n/en.json").subscribe((res: Response) => {
          observer.next(res);
          observer.complete();               
      },
          error => {
              //  failed to retrieve from api, switch to local
              this.http.get("/assets/i18n/en.json").subscribe((res: Response) => {
                  observer.next(res.json());
                  observer.complete();               
              })
          }
          );
      }); 
     
    }
}