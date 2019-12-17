import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public actions :any =[]
  constructor(public params: NavParams) {
    console.log( this.params.get("type"))
    console.log( this.params.get("data"))
    this.actions=this.params.get("data").result
   }

  ngOnInit() {}

}
