import { Component, OnInit } from '@angular/core';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { Storage } from '@ionic/storage';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { commonCtrl } from "../../common/common";
import { NavController } from '@ionic/angular'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-my-view',
  templateUrl: './my-view.page.html',
  styleUrls: ['./my-view.page.scss'],
  providers: [commonCtrl]
})
export class MyViewPage implements OnInit {



  public data = [] //{"DocRefNumber":"测试我得标题啦","WFStatus":"","formMR":""}
  public databak =[];
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
  public cururl:string;
  public portaltitle:string ;
  constructor(
    private storage: Storage,
    public geapp: GetAppPortalService,
    public activeRoute: ActivatedRoute,
    public commonCtrl: commonCtrl,
    public nav:NavController,
    public router:Router,
    
  ) {
    console.log(  this.searchkey.start)
    this.activeRoute.queryParams.subscribe(res => {
      this.portaltitle=res.temptitle
    })


    this.getData();
    this.cururl=this.router.url;


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
         
            this.storage.get("loginDetails").then(data => {
              this.para.key = this.vid;
              this.para.count = this.searchkey.count
              this.para.curpage = this.searchkey.start
              this.geapp.getMyView(data, "").pipe(first())
                .subscribe(data => {
                  console.log(data)
                  let tempdate;
                  data.data.forEach(element => {
                    element.calendarDate = element.calendarDate.replace("ZE8", "")
                    //tempdate = new Date(element.calendarDate.replace("ZE8", ""))
                    //this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                    //this.draftime = tempdate.getDate() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getFullYear()
                    //element.calendarDate = this.draftime;
                  });
                  this.data = this.data.concat( data.data)
                  this.databak =this.data
                  event.target.complete();
                })
            })
          
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
      console.log('res:',res);
      this.commonCtrl.show()
      if (res) {
       
        
          this.storage.get("loginDetails").then(data => {
            this.para.key = this.vid;
            this.para.count = this.searchkey.count
            this.para.curpage = this.searchkey.start
            this.geapp.getMyView(data, "").pipe(first())
              .subscribe(data => {
                console.log(data)
                let tempdate;
                data.data.forEach(element => {
                  element.calendarDate = element.calendarDate.split(" ")[0]
                  //element.calendarDate = element.calendarDate.replace("ZE8", "")
                  // tempdate = new Date(element.calendarDate.replace("ZE8", ""))
                  // //this.draftime = tempdate.getFullYear() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getDate()
                  // this.draftime = tempdate.getDate() + "/" + (tempdate.getMonth() + 1) + "/" + tempdate.getFullYear()
                  // element.calendarDate = this.draftime;
                });
                this.data = data.data
                this.databak =this.data
              })
          })
        this.commonCtrl.hide()
      }
    })
  }
  goBack(){
   // this.nav.back()
    　this.nav.navigateBack('/tabs/tab1',{queryParams:{title:this.portaltitle}});
    
  }

  getItems(ev: any) {

    console.log()
    this.data =this.databak
    let val = ev.target.value;
   console.log(val)
    if (val && val.trim() != '') {
      this.data = this.databak.filter((item) => {
        if(item.FieldIDsForSearch){
          let v = item.FieldIDsForSearch.find(it=>it.includes(val) || it.toLowerCase().includes(val));
          if(v) return item;
        }else{
          if(item.title){
            return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }else{
            return (item.DocRefNumber.toLowerCase().indexOf(val.toLowerCase()) > -1);
          }
        }
      })
    }
  };

 

}
