import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  public data=[]
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
  ) {
    
    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      if(res){
        console.log("laile")
        console.log(res.vid)
        this.vid=res.vid.split("/")[1].split("?")[0]
        this.vtitle=res.vtitle
        this.storage.get("loginDetails").then(data => {
          console.log(data)
          this.para.key=this.vid;
          this.para.count="10"
          this.para.curpage ="1"
          this.geapp.getViewData(data,this.para).pipe(first())
          .subscribe(data => {
            console.log(data)
            this.data=data.data
          })
        })
      } 
    })
   


  }

  ngOnInit() {
  }

}
