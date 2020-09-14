import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.page.html',
  styleUrls: ['./offline.page.scss'],
})
export class OfflinePage implements OnInit {
  public offlineFlag:boolean=false;
  constructor() { 
    if(localStorage.getItem('offlineFlag')){
      this.offlineFlag = localStorage.getItem('offlineFlag')=="false"?false:true;
    }else{
      this.offlineFlag = false;
      localStorage.setItem('offlineFlag',this.offlineFlag+'');
    }
  }

  ngOnInit() {
  }
  changeA(){
    console.log('--offlineFlag:',this.offlineFlag);
    localStorage.setItem('offlineFlag',this.offlineFlag+'');
    console.log('xx',localStorage.getItem('offlineFlag'));
  }
  
}
