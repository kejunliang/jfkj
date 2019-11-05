import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuditDetailModalComponent } from './component/audit-detail-modal/audit-detail-modal.component';
import { SecurityComponent } from './component/security/security.component';

import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-create-from',
  templateUrl: './create-from.page.html',
  styleUrls: ['./create-from.page.scss'],
})
export class CreateFromPage implements OnInit {
  // @ViewChild('guidance') guidance: ElementRef;
  public selectText: string;
  public listSlect: any = [
    { person: 'sholla Ameko', Manager: 'sholla Ameko' },
    { person: 'shivanshu Asthana', Manager: 'shivanshu Asthana' },
  ];
  public showGuidance:any=false;
  public showAudit:boolean=false;
  public guidanceData: any = [{ value: '1' }];
  public btnBox:any=[
  'sava','Edit','Copy','Bookmark'
  ];
  public isShowBtn:boolean=false;
  public content:string=''
  constructor(public modal: ModalController,public el:ElementRef) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
    console.log(this.el.nativeElement);
    // let nativeGuidance=this.el.nativeElement.querySelector('#guidance');
   this.content=' <a href="https://fanyi.baidu.com/?aldtype=16047#en/zh/" target="_blank">link到百度</a>'
  }
  async showAuditModal() {
    const modal = await this.modal.create({
      showBackdrop: true,
      component: AuditDetailModalComponent,
      componentProps: { value: this.guidanceData }
    });
    return await modal.present();
    //监听销毁的事件
    const { data } = await modal.onDidDismiss();
    console.log(data)
  }
  //查找名称
  async getSecurity(){
    const modal = await this.modal.create({
      showBackdrop: true,
      component: SecurityComponent,
      componentProps: { value: this.guidanceData }
    });
    return await modal.present();
  }
  changeSelect() {
    console.log(this.selectText)
  }
  isShowGuidance(){
    this.showGuidance=!this.showGuidance;
  }
  isShowAudit(){
    this.showAudit=!this.showAudit;
  }
  getBtnPopover(){
    //打开btn
    this.isShowBtn=true;
    // this.el.nativeElement.querySelector('.shade');  获取元素操作dom
    
  }
  getSwitchBtn(item){
    console.dir(item)
    this.isShowBtn=false;
  }
  closeZoom(){
    this.isShowBtn=false;
  }

}
