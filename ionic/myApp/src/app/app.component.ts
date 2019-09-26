import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

//
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    // private translate:TranslateService
  ) {
    this.initializeApp();
    this.initTranslate()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  initTranslate(){
    //设置默认语言，一般在无法匹配的时候使用
    // this.translate.setDefaultLang('zh');
    //获取当前浏览器的语言
    // let broswerLang=this.translate.getBrowserLang();
    // if (this.translate.getBrowserLang() !==undefined){
    //   this.translate.use(this.translate.getBrowserLang());
    // }else {
    //   this.translate.use('zh');
    // }
  }
}
