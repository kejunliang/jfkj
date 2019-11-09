import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ModalController,NavController } from '@ionic/angular';
import { PerimeterComponent } from '../component/perimeter/perimeter.component';
@Component({
  selector: 'app-fencing',
  templateUrl: './fencing.page.html',
  styleUrls: ['./fencing.page.scss'],
})
export class FencingPage implements OnInit {

  constructor(public alertController: AlertController,public modal: ModalController) { }

  ngOnInit() {
  }
  async getBarriers() {
    const alert = await this.alertController.create({
      header: 'Gates and Barriers',
      // subHeader: 'Subtitle',
      message: 'This is an alert message.',
      keyboardClose:true
    });

    await alert.present();
  }
   //查找getPerimeter
   async getPerimeter(){
    const modal = await this.modal.create({
      showBackdrop: true,
      component: PerimeterComponent,
      componentProps: { value: 'perimeter' }
    });
    modal.present();
     //监听销毁的事件
     const { data } = await modal.onDidDismiss();
     console.log(data)
    //  this.managerName=data.result;
  }

}
