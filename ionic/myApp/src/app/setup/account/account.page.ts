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
  public emali:string=''
  constructor(public http:HttpClient,public account:AccountService,private storage:Storage) { 
    
  }

  ngOnInit() {
  this.initData()
    
  }
 initData(){
  this.storage.get("loginDetails").then(data=>{
    this.user=data.username;
    this.pass=data.password;
    this.emali=data.emali;
    console.log(this.pass,this.user)
    this.account.getAccount(this.user,this.pass,this.emali).pipe(first()).subscribe(
      data => {
       
        this.accountData=data;
        console.log(this.accountData)
      }
    )
  })
  
 }

}
