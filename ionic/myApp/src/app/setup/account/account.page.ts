import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from "../../services/setup/account.service";
import { LanguageService } from "../../services/setup/language.service";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public accountData:any={
  };
  public user:string='';
  public pass:string='';
  public email:string='';
  public accountLan:string
  constructor(
    public translate :TranslateService,
    public http:HttpClient,public account:AccountService,
    private storage:Storage,public LanguageService:LanguageService,
    ) { 
    
  }
//http://oa.jf81.com/sfv3/integrumws.nsf/xp_App.xsp/getMyAccount?email=zding@jf81.com
  ngOnInit() {
  this.initData()
    
  }
 initData(){
  this.storage.get("loginDetails").then(data=>{
     console.log(data)
    this.user=data.username;
    this.pass=data.password;
    this.email=data.email;
    this.account.getAccount(this.user,this.pass,this.email).pipe(first()).subscribe(
      data => {
        console.log(data)
        this.accountData=data;
        this.getLan()
      }
    )
  })
  
 }
 getLan(){
    //获取当前设置的语言
    let browerLang=this.translate.getDefaultLang();
    console.log(browerLang)
   if(this.accountData.language==browerLang){
    this.LanguageService.getAppTranslation(this.user,this.pass).pipe(first()).subscribe(
      data => {
       let langularArr=data.Languages;
       langularArr.forEach(item => {
         if(item.SelectedLanguages==this.accountData.language){
          this.accountData.language=item.NativeNames
         }
       });
      }
    )
   }else{
    this.LanguageService.getAppTranslation(this.user,this.pass).pipe(first()).subscribe(
      data => {
       let langularArr=data.Languages;
       langularArr.forEach(item => {
         if(item.SelectedLanguages==browerLang){
          this.accountData.language=item.NativeNames
         }
       });
      }
    )
   }
 
 }

}
