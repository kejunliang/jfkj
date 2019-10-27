import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './component/popover/popover.component';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { StorageService } from '../../services/storage/storage.service';
import {GetAppPortalService}  from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public name:string;
  public type: string;
  constructor(
    public popoverController: PopoverController,
    public Nav:NavController,
    private storage:Storage,
    public storageService:StorageService,
    public geapp:GetAppPortalService
  ) {
    // this.translate.setDefaultLang('en');
    this.storage.get("ous").then(data=>{
      console.log("获取到ous"+data)
    })
    this.storage.get("loginDetails").then(data => {
      console.log("loginDetails=="+JSON.stringify(data))
      this.geapp.getPortalInfo(data.username,data.password).pipe(first())
      .subscribe( data => {
        console.log(data)
      })
      
    })
   
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps:{type:"setup"},
      translucent: true
    });
    return await popover.present();
  }
  async presentPopoverPortal(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps:{type:"portal"},
      translucent: true
    });
    return await popover.present();
  }
  logout(){

    this.Nav.navigateRoot('loginpass');
    localStorage.setItem('hasLogged',"false");
  }
  getInfo(){
    console.log(this.storageService.get('ous'))
  }
}
