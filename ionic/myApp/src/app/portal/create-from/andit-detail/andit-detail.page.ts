import { Component, OnInit } from '@angular/core';
// import { NavParams } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-andit-detail',
  templateUrl: './andit-detail.page.html',
  styleUrls: ['./andit-detail.page.scss'],
})
export class AnditDetailPage implements OnInit {
  public showTips:boolean=false;
  public headerTitle:string;
  public filedData:any=[]
  constructor(public activeRoute: ActivatedRoute, private storage: Storage) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.headerTitle=params['title'];
      })
      this.storage.get("filed").then(data => {
        this.filedData=data;
        console.log(data)
      })
  }
  getTips(i){
    console.log(i)
   this.showTips=!this.showTips;
  }
}
