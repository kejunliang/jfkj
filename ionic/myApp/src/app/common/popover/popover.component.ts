import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public actions: any = []
  constructor(public params: NavParams,
    public Popover: PopoverController,
    public router: Router
  ) {
    console.log(this.params.get("type"))
    console.log(this.params.get("data"))
    this.actions = this.params.get("data").result
  }

  ngOnInit() { }
  getBtnLink(btn) {
    let type=""
    if(btn=="edit"){
      type="edit"
    }else{
      type="open"
    }
    let url = this.router.url
    let unid = this.getQueryVariable(url, "unid")
    let aid = encodeURIComponent(encodeURIComponent(this.getQueryVariable(url, "aid")))
    let title = encodeURIComponent(this.getQueryVariable(url, "title"))
    console.log(title)
    let stat = encodeURIComponent(this.getQueryVariable(url, "stat"))
    this.router.navigate(["/new-form"], { queryParams: { unid: unid, aid: aid, title: title, stat: stat,type:type,refresh: new Date().getTime() } });
    this.Popover.dismiss()
    
  }
  getQueryVariable(url, variable) {
    let query = url.split("?")[1]
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
}
