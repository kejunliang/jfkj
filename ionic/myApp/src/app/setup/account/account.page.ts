import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public account:any={
    name:'xx',
    company:'xxxx',
    email:'xxxx',
    language:'xx',
    logout:'xx',
    activated:'xx'
  }
  constructor() { }

  ngOnInit() {
    
  }

}
