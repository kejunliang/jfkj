import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-perimeter',
  templateUrl: './perimeter.component.html',
  styleUrls: ['./perimeter.component.scss'],
})
export class PerimeterComponent implements OnInit {

  constructor(public navParams:NavParams) { }

  ngOnInit() {}
  dismiss(){
    this.navParams.data.modal.dismiss({
      result:'关闭返回的内容'
    })
  }
  clean(){
    this.navParams.data.modal.dismiss({
      result:''
    })
  }
}
