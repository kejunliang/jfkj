import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { first } from 'rxjs/operators';
import { LanguageService } from "../../services/setup/language.service";
import { Storage } from '@ionic/storage';
import { CustomTranslateLoader } from '../../services/trans-loader'
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular'; 
@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {
  public user: string='';
  public pass:string='';
  public langularArr:any=[];
  public lan:string='';
  public name:string;
  public selectPortalIndex: number = 0;
  constructor(public translate :TranslateService,public activeRoute: ActivatedRoute,public router:Router,public nav:NavController,public http:HttpClient, public LanguageService:LanguageService,private storage:Storage,public trans:CustomTranslateLoader) { 
    // this.translate.setDefaultLang('zh');
    this.activeRoute.queryParams.subscribe(res => {
      console.log('res:',res)
      if (res.selectPortalIndex) {
        this.selectPortalIndex = res.selectPortalIndex
      }
    });
   
  }

  ngOnInit() {
    // this.user=localStorage.getItem('user');
    console.log(this.user);
    this.storage.get("loginDetails").then(data=>{
      console.log(data)
      this.user=data.username;
      this.pass=data.password;
      this.LanguageService.getAppTranslation(this.user,this.pass,data.server,data.folder).pipe(first()).subscribe(
        data => {
          this.langularArr=data.Languages;
           //获取当前设置的语言
          let browerLang=this.translate.getDefaultLang();
          this.lan=browerLang;
        }
      )
    })
    
    
  }
  radioCheck(item){
    console.log('this.lan:',this.lan)
    console.log('item.SelectedLanguages:',item.SelectedLanguages)
    this.translate.setDefaultLang(item.SelectedLanguages)
    this.translate.use(item.SelectedLanguages)
    // this.trans.getTranslation(item.SelectedLanguages).subscribe(res => {
    //   console.log('xxxxxxxxxxxtransdd...',res)
    // }) 
  }
  goBack(){
    // this.nav.back()
     　this.nav.navigateBack('/tabs/tab1',{queryParams:{selectPortalIndex:this.selectPortalIndex}});
     //this.router.navigate(['tabs/tab1'],{ queryParams: { selectlan: 'this.selectlan' } })
   }
}
