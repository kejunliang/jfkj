import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './component/popover/popover.component';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public name:string;
  constructor(
    public popoverController: PopoverController,
    public Nav:NavController
  ) {
    // this.translate.setDefaultLang('en');
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  logout(){

    this.Nav.navigateRoot('loginpass')
  }
}
