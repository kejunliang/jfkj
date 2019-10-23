import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  public langularArr:any=[
      {lan:'Dutch',shorthand:'dut'},
      {lan:'zh',shorthand:'zh'},
      {lan:'English',shorthand:'en'},
      {lan:'French',shorthand:'fre'},
      {lan:'German',shorthand:'ger'},
      {lan:'Lceland',shorthand:'lce'},
      {lan:'Norwegian',shorthand:'nor'},
      {lan:'Portuguese',shorthand:'por'},
      {lan:'Spanish',shorthand:'spa'},
    ];
  public language:string='';
  public name:string;

  constructor(public translate :TranslateService,public http:HttpClient) { 
    // this.translate.setDefaultLang('zh');
   
  }

  ngOnInit() {
    let api='/sfv3/integrumws.nsf/xp_App.xsp/getAllForms?ver=v2&languageid';
    const httpOption={
        headers:new HttpHeaders({'Content-Type':'application/json'})
    }
    this.http.post(api,httpOption).subscribe(res=>{
        console.log(res)
    })
     //获取当前设置的语言
    let browerLang=this.translate.getDefaultLang();
    console.log(browerLang)
    this.language=browerLang;
  }
  radioCheck(item){
    console.log(this.language)
    console.log(item.shorthand)
    this.translate.setDefaultLang(item.shorthand)
    this.translate.use(item.shorthand)
  }

}
