import { Component, OnInit } from '@angular/core';
import { GetAppPortalService } from '../../services/get-app-portal.service';
import { Storage } from '@ionic/storage';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-my-view',
  templateUrl: './my-view.page.html',
  styleUrls: ['./my-view.page.scss'],
})
export class MyViewPage implements OnInit {
  public data:string ="";
  constructor(
    public getvw: GetAppPortalService,
    public storage:Storage
  ) { 
    this.storage.get('loginDetails').then(data => {
        this.getvw.getMyView(data,"").pipe(first())
        .subscribe(data => {
          console.log(data)
          this.data = data.data
        })
    })
  }

  ngOnInit() {
  }

}
