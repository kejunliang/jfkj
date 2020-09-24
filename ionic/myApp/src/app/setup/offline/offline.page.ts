import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GetallformsService } from "../../services/getallforms.service";
import { first } from 'rxjs/operators';
import { commonCtrl } from "../../common/common";

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
  providers: [commonCtrl]
})
export class OfflinePage implements OnInit {
  public offlineFlag:boolean=false;
  constructor(private storage: Storage,
    private getforms: GetallformsService,
    private commonCtrl: commonCtrl)
  { 
    if(localStorage.getItem('offlineFlag')){
      this.offlineFlag = localStorage.getItem('offlineFlag')=="false"?false:true;
    }else{
      this.offlineFlag = false;
      localStorage.setItem('offlineFlag',this.offlineFlag+'');
    }
  }

  ngOnInit() {
  }
  changeOffline(){
    localStorage.setItem('offlineFlag',this.offlineFlag+'');
  }
  async(){
    const allTemplateID: any = localStorage.getItem('allTemplateID');
    if(!allTemplateID){
      console.log('no data!')
    }else{
      this.storage.get("loginDetails").then(logindata => {
        this.commonCtrl.show();
        const templateIDs: any = JSON.parse(allTemplateID);
        const allData: any = [];
        templateIDs.forEach(e => {
          this.storage.get(e).then(docs => {
            docs = JSON.parse(docs);
            allData.concat(docs);
          })
        }); 
        
        this.getforms.submit(logindata, allData).pipe(first()).subscribe(data => {
          console.log('success');
          
          this.commonCtrl.processHide();
        },
        error => {
          console.log('had error: ', error);
          this.commonCtrl.processHide();
          console.log('status:', error.status);
        })
      })
      
    }
  }
}
