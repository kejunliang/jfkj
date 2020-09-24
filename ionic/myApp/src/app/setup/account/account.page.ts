import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from "../../services/setup/account.service";
import { LanguageService } from "../../services/setup/language.service";
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers:[DatePipe]
})
export class AccountPage implements OnInit {
  public accountData:any={
  };
  public user:string='';
  public pass:string='';
  public email:string='';
  public accountLan:string
  public server:string;
  public folder:string;
  constructor(
    public translate :TranslateService,
    public http:HttpClient,public account:AccountService,
    private storage:Storage,public LanguageService:LanguageService,
    private datePipe: DatePipe
    ) { 
    
  }
//http://oa.jf81.com/sfv3/integrumws.nsf/xp_App.xsp/getMyAccount?email=zding@jf81.com
  ngOnInit() {
  this.initData()
    
  }
 initData(){
  this.storage.get("myaccount").then(data=>{
    data = JSON.parse(data);
     console.log('myaccount:',data)
     this.accountData=data;
     let draftDate=this.accountData.lasttimelogout.substring(0,this.accountData.lasttimelogout.length-3)
     this.accountData.lasttimelogout=this.datePipe.transform(draftDate,'dd/MM/yyyy')
     this.getLan();
  })
  
 }
 getLan(){
    //获取当前设置的语言
    let browerLang=this.translate.getDefaultLang();
    console.log(browerLang)
   if(this.accountData.language==browerLang){
    this.storage.get("apptranslation").then(data=>{
      data = JSON.parse(data);
       console.log('apptranslation:',data);
       const v: any = data.Languages.find( item => item.SelectedLanguages==this.accountData.language);
       if(v) this.accountData.language=v.NativeNames;
    })
   }else{
    this.storage.get("apptranslation").then(data=>{
      data = JSON.parse(data);
       console.log('apptranslation:',data);
       const v: any = data.Languages.find( item => item.SelectedLanguages==browerLang);
       if(v) this.accountData.language=v.NativeNames;
    })
    
   }
 
 }

}
