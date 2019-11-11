import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  public data=[
    {"name":"test1"},
    {"name":"test2"},
    {"name":"test3"},
    {"name":"test4"}
  ]
  constructor(
    private storage: Storage,
    public geapp: GetAppPortalService,
  ) {
    
    this.storage.get("loginDetails").then(data => {
      //  alert(JSON.stringify(data))
        console.log(data)
        this.geapp.getViewData(data).pipe(first())
        .subscribe(data => {
          console.log(data)
        })
  
      })


  }

  ngOnInit() {
  }

}
