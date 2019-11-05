import { Component, OnInit, Input} from '@angular/core';
import { NavParams } from '@ionic/angular'
@Component({
  selector: 'app-audit-detail-modal',
  templateUrl: './audit-detail-modal.component.html',
  styleUrls: ['./audit-detail-modal.component.scss'],
})
export class AuditDetailModalComponent implements OnInit {
  @Input() aid:any;
  constructor(public navParams:NavParams) { 
    console.dir(this.navParams)
  }
  ngOnInit() {}
  dismiss(){
    this.navParams.data.modal.dismiss({
      result:'关闭返回的内容'
    })
  }
}
