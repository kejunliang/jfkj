import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public setting:any=[];
  constructor(public nav:NavController,public Popover:PopoverController,public translate:TranslateService) { 
    this.translate.get('setting').subscribe(res=>{
      this.setting=res;
    })
  }

  ngOnInit() {

  }
  ngAfterViewInit(){
    let popover=document.querySelector('.popover-content');
    popover['style'].width='23rem';
    popover['style'].height='17rem'
  }
  getLink(code){
    if(code==1){
      this.Popover.dismiss()
      this.nav.navigateBack('account');
    }else if(code==2){
      this.Popover.dismiss()
      this.nav.navigateBack('language');
    }else if(code==3){
      this.Popover.dismiss()
      this.nav.navigateBack('offline');
    }
  }
}

