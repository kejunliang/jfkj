import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { GetallformsService } from "../../services/getallforms.service";
import { Storage } from '@ionic/storage';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  public actions: any = []
  public formid:string;
  public fields:Array<object> =[]
  constructor(public params: NavParams,
    public Popover: PopoverController,
    public router: Router,
    public getforms: GetallformsService,
    private storage: Storage,
  ) {
    console.log("打开操作")
    console.log(this.params.get("type"))
    console.log(this.params.get("data"))
    this.actions = this.params.get("data").result
    this.fields =this.params.get("formdata")
    this.formid =this.params.get("unid")
  }

  ngOnInit() { }
  getBtnLink(btn) {
    let type=""
    switch (btn) {
      case "Edit":
        type="edit"
        break;
      case "Save":
        console.log(this.formid)
        console.log(this.fields)
        let para={
          "tempid":"",
          "formAction":"save",
          "docId":"EBE27D0FEC6AEFF9482584D90020DCE6",
          "fields":[{
            "name":"FormDueComDate","value":"2019-12-25"
          }]
        }
        this.submit(para)
      default:
        type="open"
        break;
    }

    let url = this.router.url
    let unid = this.getQueryVariable(url, "unid")
    let aid = decodeURIComponent(this.getQueryVariable(url, "aid"))
    let title =decodeURIComponent(this.getQueryVariable(url, "title")) 
    let stat = decodeURIComponent(this.getQueryVariable(url, "stat"))
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


  submit(para) {
    return new Promise((resolve, reject) => {
      this.storage.get("loginDetails").then(logindata => {
        this.getforms.getFormData(logindata, {"unid":"EBE27D0FEC6AEFF9482584D90020DCE6"}).pipe(first()).subscribe(data => {
          this.getforms.submit(logindata,para).pipe(first()).subscribe(data =>{
            console.log(data)
          })
          //resolve(data)
        })
      })
    })
  }
}
