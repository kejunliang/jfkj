import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './component/popover/popover.component';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage/storage.service';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public name: string;
  public type: string;
  public  portalTile:string;
  public data = [
    { "name": "测试1" },
    { "name": "测试2" },
    { "name": "测试3" },
    { "name": "测试4" },
    { "name": "测试5" },
    { "name": "测试6" },
    { "name": "测试7" },
    { "name": "测试8" },
    { "name": "测试9" },
    { "name": "测试10" }
  ];
  public portalInfo: any;
  public loading: any

  constructor(
    public popoverController: PopoverController,
    public Nav: NavController,
    private storage: Storage,
    public storageService: StorageService,
    public geapp: GetAppPortalService,
    public loadingController: LoadingController,
    public activeRoute: ActivatedRoute

  ) {
    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      this.portalTile=res.title
      if(res.key){
        console.log("laile")
        
        this.data.unshift({"name":res.key})
      }
      
    });
    this.show()
    this.storage.get("loginDetails").then(data => {
    //  alert(JSON.stringify(data))
      console.log(data)
      this.geapp.getPortalInfo(data).pipe(first())
        .subscribe(data => {
          console.log(data)
          this.portalInfo = data
          this.portalTile=data.selectedPortal
          this.hide()
        })

    })
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: { type: "setup" },
      translucent: true
    });
    return await popover.present();
  }
  async presentPopoverPortal(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: { type: "portal", portal: this.portalInfo },
      translucent: true
    });
    return await popover.present();
  }
  logout() {
    this.Nav.navigateRoot('loginpass');
    localStorage.setItem('hasLogged', "false");
  }
  getInfo() {

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
