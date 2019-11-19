import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { commonCtrl } from "../../common/common";
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
  providers: [commonCtrl] 
})
export class FormListPage implements OnInit {
  public data=[] //{"DocRefNumber":"测试我得标题啦","WFStatus":"","formMR":""}
  public vid:string ;
  public para={
    "key":"",
    "count":"",
    "curpage":""
  }
  public vtitle:string ;
  constructor(
    private storage: Storage,
    public geapp: GetAppPortalService,
    public activeRoute: ActivatedRoute,
    public commonCtrl:commonCtrl
  ) {
    
    this.getData();
   


  }

  ngOnInit() {
  }

   
   doRefresh(evt:any):void {
    console.log('Begin async operation');
    this.getData();
    setTimeout(() => {
      console.log('Async operation has ended');
      evt.target.complete();
    }, 2000);
   }

   
  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.data.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
  getData() {
    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      if(res){
        console.log("laile")
        console.log(res.vid)
        this.vid=res.vid.split("/")[1].split("?")[0]
        this.vtitle=res.vtitle
        this.commonCtrl.show()
        this.storage.get("loginDetails").then(data => {
          console.log(data)
          this.para.key=this.vid;
          this.para.count="20"
          this.para.curpage ="1"
          this.geapp.getViewData(data,this.para).pipe(first())
          .subscribe(data => {
            console.log(data)
            this.data=data.data
            this.commonCtrl.hide()
          })
        })
      } 
    })
  }
}
