import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SecurityComponent } from './component/security/security.component';
@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.page.html',
  styleUrls: ['./add-action.page.scss'],
})
export class AddActionPage implements OnInit {
  public action:{
    dueDate:'',
    description:'',
    token:'',
    managerName:''
  }
  public managerName: string;
  constructor(public modal: ModalController) { }

  ngOnInit() {
  }
 //查找名称
 async getName() {
  const modal = await this.modal.create({
    showBackdrop: true,
    component: SecurityComponent,
    componentProps: { value: 111 }
  });
  modal.present();
  //监听销毁的事件
  const { data } = await modal.onDidDismiss();
  this.managerName = data.result;
  }
}
