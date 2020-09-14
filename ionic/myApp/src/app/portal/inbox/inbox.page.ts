import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { LoadingController } from '@ionic/angular';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  public portalList: any = [];
  public loading: any;

  constructor(
    private storage: Storage,
    public translate: TranslateService,
    public geapp: GetAppPortalService,
    public loadingController: LoadingController
  ) {
    this.show()
    this.storage.get("loginDetails").then(data => {
      //if(data.code=="integrum001") this.cbgcolor = "#004a80";
      let lan = this.translate.getDefaultLang();
      this.geapp.getPortalInfoV2(data,lan).pipe(first())
        .subscribe(data => {
          console.log('getPortalInfoV2:',data)
          const plist = data.items;
          const userallportal = data.userallportal;
          if(userallportal){
            for (let i = 0; i < userallportal.length; i++) {
              const element = userallportal[i];
              let v = plist.find(e=>e.Title == element);
              if(v) this.portalList.push(v);
            }
          }else{
            this.portalList = data.items
          }
      
          this.hide()
        })

    })
   }

  ngOnInit() {
  }
  async  show() {
    this.loading = await this.loadingController.create({
      message: 'loading....',
      duration: 2000
    });
    await this.loading.present();
  }
  async hide() {
    if (this.loading) {
      await this.loading.dismiss();
    }
  }
}
