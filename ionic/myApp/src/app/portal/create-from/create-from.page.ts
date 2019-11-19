import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Params } from '@angular/router';
import { SecurityComponent } from './component/security/security.component';
import { CreateFromService } from '../../services/create-from/create-from.service';
// import { commonCtrl } from "../../common/common";
@Component({
  selector: 'app-create-from',
  templateUrl: './create-from.page.html',
  styleUrls: ['./create-from.page.scss'],
})
export class CreateFromPage implements OnInit {
  // @ViewChild('guidance') guidance: ElementRef;
  public hearderTitle: String;
  public selectText: string;
  public listSlect: any = [
    { person: 'sholla Ameko', Manager: 'sholla Ameko' },
    { person: 'shivanshu Asthana', Manager: 'shivanshu Asthana' },
  ];
  public showGuidance: any = false;
  public showAudit: boolean = false;
  public guidanceData: any = [{ value: '1' }];
  public btnBox: any = [
    'sava', 'Edit', 'Copy', 'Bookmark'
  ];
  public listTiltle: '123456'
  public isShowBtn: boolean = false;
  public content: string = '';
  public managerName: string;
  public userName: string;//用户名
  public loginData:any;//登录的信息
  public aid:string;
  public listFiled:any=[]
  constructor(
    public modal: ModalController,
    public createFrom:CreateFromService, 
    private storage: Storage, public el: ElementRef, public nav: NavController,
    public activatedRoute: ActivatedRoute,

    ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.hearderTitle = params['aTitle'];
      this.aid=params['aid']
      console.log(this.aid)
      console.log(this.hearderTitle)
      
    });
    this.storage.get("allforms").then(data => {
      let dataFrom= JSON.parse(data)
      console.log(dataFrom.templates)
      dataFrom.templates.forEach((item,index) => {
          if(item.template.template_id==this.aid){
            this.listFiled=item.template.secs;
            console.log(this.listFiled)
          }
      });
    });
   
    
  }
  ngAfterViewInit() {
    // let nativeGuidance=this.el.nativeElement.querySelector('#guidance');
    this.content = ' <a href="https://fanyi.baidu.com/?aldtype=16047#en/zh/" target="_blank">link到百度</a>'
  }

  //查找名称
  async getSecurity() {
    const modal = await this.modal.create({
      showBackdrop: true,
      component: SecurityComponent,
      componentProps: { value: this.guidanceData }
    });
    modal.present();
    //监听销毁的事件
    const { data } = await modal.onDidDismiss();
    this.managerName = data.result;
  }
  changeSelect() {
    console.log(this.selectText)
  }
  isShowGuidance() {
    this.showGuidance = !this.showGuidance;
  }
  isShowAudit() {
    this.showAudit = !this.showAudit;
  }
  getBtnPopover() {
    //打开btn
    this.isShowBtn = true;
    // this.el.nativeElement.querySelector('.shade');  获取元素操作dom

  }
  getSwitchBtn(item) {
    console.dir(item)
    this.isShowBtn = false;
  }
  closeZoom() {
    this.isShowBtn = false;
  }
  //AuditDetail
  auditDetail(item) {
    console.log(item)
    this.storage.set("filed",item.fields)
    this.nav.navigateForward(['/andit-detail'], {
      queryParams: {
        title: item.title,
      }
    })
  }
  fencingDetail() {
    this.nav.navigateForward(['/fencing'], {
      queryParams: {
        title: 'Fencing & Lighting'
      }
    })
  }
  production() {
    console.log(1)
    this.nav.navigateForward(['/production'], {
      queryParams: {
        title: 'Production Code Details'
      }
    })
  }

}
