import { Component, OnInit } from '@angular/core';
// import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-andit-detail',
  templateUrl: './andit-detail.page.html',
  styleUrls: ['./andit-detail.page.scss'],
})
export class AnditDetailPage implements OnInit {
  public showTips:boolean=false;
  constructor(public activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
     console.log(params['audit']);
      })
  }
  getTips(i){
    console.log(i)
   this.showTips=!this.showTips;
  }
}