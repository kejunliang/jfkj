import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { first } from 'rxjs/operators';
import { AccountService } from "../../services/setup/account.service";
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public accountData:any={
  };
  public user:string='';
  public pass:string='';
  public email:string=''
  constructor(public http:HttpClient,public account:AccountService,private storage:Storage) { 
    
  }
//http://oa.jf81.com/sfv3/integrumws.nsf/xp_App.xsp/getMyAccount?email=zding@jf81.com
  ngOnInit() {
  this.initData()
    
  }
 initData(){
  this.storage.get("loginDetails").then(data=>{
     console.log(data)
    this.user=data.username;
    this.pass=data.password;
    this.email=data.email;
    this.account.getAccount(this.user,this.pass,this.email).pipe(first()).subscribe(
      data => {
        console.log(data)
        this.accountData=data;
       
      }
    )
  })
  
 }

}
