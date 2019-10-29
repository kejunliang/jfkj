import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public setting: any = [];
  public type: string;
  public portalList: any = [];
  constructor(public nav: NavController, public Popover: PopoverController, public translate: TranslateService,
    public params: NavParams,
    public router:Router
  ) {
    this.translate.get('setting').subscribe(res => {
      this.setting = res;
    })
    this.type = this.params.get("type")
    if(this.params.get("portal")){
      this.portalList = this.params.get("portal").items
    }
   
  }

  ngOnInit() {

  }
  ngAfterViewInit() {

    let popover = document.querySelector('.popover-content');
    popover['style'].width = '23rem';
    popover['style'].height = '17rem'
  }
  getLink(code) {
    if (code == 1) {
      this.Popover.dismiss()
      this.nav.navigateBack('account');
    } else if (code == 2) {
      this.Popover.dismiss()
      this.nav.navigateBack('language');
    } else if (code == 3) {
      this.Popover.dismiss()
      this.nav.navigateBack('offline');
    }
  }
  getPortalLink(data){
    this.router.navigate(['tabs/tab1'], {queryParams: {key:data}});
    this.Popover.dismiss()
  }
}

