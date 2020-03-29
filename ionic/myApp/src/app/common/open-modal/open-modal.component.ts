import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-open-modal',
  templateUrl: './open-modal.component.html',
  styleUrls: ['./open-modal.component.scss'],
})
export class OpenModalComponent implements OnInit {
  public reason: string;
  public title :string ;
  constructor(
    public navParams: NavParams,
  ) { 
   this.title="title"

  }

  ngOnInit() {}

  dismiss() {
    this.navParams.data.modal.dismiss({
      result: this.reason
    })
  }

}
