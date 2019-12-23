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
    let url = this.router.url
    let unid = this.getQueryVariable(url, "unid")
    let aid = this.getQueryVariable(url, "aid")
    let title = this.getQueryVariable(url, "title")
    let stat = this.getQueryVariable(url, "stat")
   // this.router.navigate(["/new-form"], { queryParams: { unid: unid, aid: aid, title: title, stat: stat,type:"" } });
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
