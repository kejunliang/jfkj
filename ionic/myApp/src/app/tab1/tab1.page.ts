import { Component } from '@angular/core';
//
// import { TranslateService    } from '@ngx-translate/core';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public name:string;
  constructor(
    // public translate:TranslateService
  ) {
    // this.translate.setDefaultLang('en');

    // this.translate.get('name').subscribe((value)=>{
      // console.log(value);
      // this.name=value;
    // })
  }
  logout(){
    
  }
}
