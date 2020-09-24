import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { CommonService } from './common.service';
@Injectable({
  providedIn: 'root'
})
export class GetallformsService {

  constructor(private http: HttpClient,private common:CommonService) { }

  getAllForms(logindetail:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+'/integrumws.nsf/xp_App.xsp/getAllForms?ver=v2&languageid&cnname='+encodeURIComponent(logindetail.username),options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }


  getFormData(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    let isedit = para.isedit;
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+'/integrumws.nsf/xp_App.xsp/getDocInfoV2?unid='+unid+'&cnname='+logindetail.username+'&isedit='+isedit,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  submit(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    let  data=`${encodeURIComponent(para)}`
    //let data = para;
    return this.http.post('/'+logindetail.folder+'/integrumws.nsf/xp_App.xsp/submitFormV2',data,options).pipe(
       map(
        result => { 
          console.log('service  result:',result);
          return result;
        } 
       )
      
    )
  }
  getLoopupOptions(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let key=para.key;
    let db = para.db;
    let view = para.view;
    let column = para.column;
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    let sparas = '&db='+db+'&view='+view+'&column='+column;
    return this.http.get<{token: string}>(logindetail.folder+'/integrumws.nsf/xp_App.xsp/getLookupOption?key='+key+sparas,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  doDeleteDoc(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);

    const unid:string = para.unid;
    const cm:string   = para.cm;
    const options = {
      headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+`/integrumws.nsf/xp_App.xsp/deleteDoc?unid=${unid}&cm=${encodeURIComponent(cm)}`,options)
      .pipe(
        map(result=>{
          return result;
        }),
        catchError(this.common.handleError)
      )
  }
  submitToMr2(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let { unid,mr2 } = para;
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    const url = `/${logindetail.folder}/integrumws.nsf/xp_App.xsp/invokeServerFunctions?unid=${unid}&action=sendforreview&strformMR=${mr2}`;
    return this.http.get(url,options).pipe(
       map(
        result => { 
          return result;
        } 
       )
      
    )
  }
  doReAssign(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const {unid, comments, formmr} = para;
    const options = {
      headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+`/integrumws.nsf/xp_App.xsp/invokeServerFunctions?unid=${unid}&action=reassign&formmr=${formmr}&comments=${encodeURIComponent(comments)}`,options)
      .pipe(
        map(result=>{
          return result;
        }),
        catchError(this.common.handleError)
      )
  }
  doApprove(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const {unid, comments} = para;
    const options = {
      headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+`/integrumws.nsf/xp_App.xsp/invokeServerFunctions?unid=${unid}&action=approve&comments=${encodeURIComponent(comments)}`,options)
      .pipe(
        map(result=>{
          return result;
        }),
        catchError(this.common.handleError)
      )
  }
  doReject(logindetail:any,para:any):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const {unid, comments} = para;
    const options = {
      headers:{
        "Content-Type":"application/json;charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+`/integrumws.nsf/xp_App.xsp/invokeServerFunctions?unid=${unid}&action=reject&comments=${encodeURIComponent(comments)}`,options)
      .pipe(
        map(result=>{
          return result;
        }),
        catchError(this.common.handleError)
      )
  }
  getDocData(logindetail:any,unid: string ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+'/integrumws.nsf/xp_App.xsp/getFormData?key='+unid,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  removeDoc(logindetail:any,unid: string ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    return this.http.get<{token: string}>(logindetail.folder+'/integrumws.nsf/xp_App.xsp/removeMicroData?docid='+unid,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
  saveMicrodbDoc(logindetail:any,para:any ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    let unid=para.unid
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    let  data=para
    return this.http.post('/'+logindetail.folder+'/integrumws.nsf/xp_App.xsp/saveMicroData',data,options).pipe(
       map(
        result => { 
          return result;
        } 
       )
      
    )
  }
  getFieldValue(logindetail:any,fields: string, fullname: string ):Observable<any>{
    let auth='Basic '+btoa(logindetail.username+':'+logindetail.password);
    const options = {
      headers: {
        "Content-Type":"application/json; charset=utf-8",
        "Authorization":auth
      }
    };
    const url = `${logindetail.folder}/integrumws.nsf/xp_App.xsp/getFieldsValue?fields=${fields}&fullname=${fullname}`;
    return this.http.get<{token: string}>(url,options)
      .pipe(
        map(result => { 
                 return result;
        }),
        catchError(this.common.handleError)
      )
  }
}
