import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { commonCtrl } from "../../common/common";
import { NavController } from '@ionic/angular'; 
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
  providers: [commonCtrl]
})
export class FormListPage implements OnInit {
  public data = [] //{"DocRefNumber":"测试我得标题啦","WFStatus":"","formMR":""}
  public vid: string;
  public para = {
    "key": "",
    "count": "",
    "curpage": ""
  }
  public vtitle: string;
  public draftime: any;
  public stype: string;
  public  formid:string ;
  public searchkey: any={
    "start":1,
    "count":20
  }
  constructor(
    private storage: Storage,
    public geapp: GetAppPortalService,
    public activeRoute: ActivatedRoute,
    public commonCtrl: commonCtrl,
    public nav:NavController,
  ) {

    this.getData();



  }

  ngOnInit() {
  }


  doRefresh(evt: any): void {
    console.log('Begin async operation');
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      evt.target.complete();
    }, 2000);
  }


  loadData(event) {
   
    this.searchkey.start=this.searchkey.start+1
    console.log(this.searchkey.start)
    setTimeout(() => {
      this.activeRoute.queryParams.subscribe(res => {
        console.log(res);
        this.commonCtrl.show()
        if (res) {
          this.stype = res.type
          this.formid=res.formid
          if (this.stype === "formlist") {
            this.vid = res.vid.split("/")[1].split("?")[0]
            this.vtitle = res.vtitle
          
            this.storage.get("loginDetails").then(data => {
              this.para.key = this.vid;
              this.para.count = this.searchkey.count
              this.para.curpage = this.searchkey.start
              this.geapp.getViewData(data, this.para).pipe(first())
                .subscribe(data => {
                  console.log(data)
                  let tempdate;
                  data.data.forEach(element => {
                    tempdate = new Date(element.calendarDate.replace("ZE8", ""))
                    this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                    element.calendarDate = this.draftime;
                  });
                  this.data = this.data.concat( data.data)
                  event.target.complete();
                })
            })
          }else{
            //getass
            this.vid=res.vid
            this.storage.get("loginDetails").then(data => {
              this.para.key = this.vid;
              this.geapp.getActDocsAssoForms(data, this.para).pipe(first())
                .subscribe(data => {
                  console.log(data)
                  let tempdate;
                  data.actDocs.forEach(element => {
                    if(element.ActDueforCompletion){
                      tempdate = new Date(element.ActDueforCompletion.replace("ZE8", ""))
                      this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                      element.ActDueforCompletion = this.draftime;
                    }
                  
                  });
                  this.data = data.actDocs
                
                })
            })
          }
          this.commonCtrl.hide()
        }
      })
      if (this.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  getData() {
    this.searchkey.start=1
    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      this.commonCtrl.show()
      if (res) {
        this.stype = res.type
        this.formid=res.formid
        if (this.stype === "formlist") {
          this.vid = res.vid.split("/")[1].split("?")[0]
          this.vtitle = res.vtitle
        
          this.storage.get("loginDetails").then(data => {
            this.para.key = this.vid;
            this.para.count = this.searchkey.count
            this.para.curpage = this.searchkey.start
            this.geapp.getViewData(data, this.para).pipe(first())
              .subscribe(data => {
                console.log(data)
                let tempdate;
                data.data.forEach(element => {
                  tempdate = new Date(element.calendarDate.replace("ZE8", ""))
                  this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                  element.calendarDate = this.draftime;
                });
                this.data = data.data
               
              })
          })
        }else{
          //getass
          this.vid=res.vid
          this.storage.get("loginDetails").then(data => {
            this.para.key = this.vid;
            this.geapp.getActDocsAssoForms(data, this.para).pipe(first())
              .subscribe(data => {
                console.log(data)
                let tempdate;
                data.actDocs.forEach(element => {
                  if(element.ActDueforCompletion){
                    tempdate = new Date(element.ActDueforCompletion.replace("ZE8", ""))
                    this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                    element.ActDueforCompletion = this.draftime;
                  }
                
                });
                this.data = data.actDocs
              
              })
          })
        }
        this.commonCtrl.hide()
      }
    })
  }
  goBack(){
   // this.nav.back()
    　this.nav.navigateBack('/tabs/tab1');
  }
}
