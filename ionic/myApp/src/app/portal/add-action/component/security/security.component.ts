import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class SecurityComponent implements OnInit {
  public listSlect: any = [
    { person: 'First Name', Manager: 'First Name' },
    { person: 'Last Name', Manager: 'Last Name' },
    { person: 'Email', Manager: 'Email' }
  ];
  public selectIndex:Number=1;
  public selectText:string='First Name';
  public isSelectList:boolean=false;
  public isDelect:boolean=false;
  public listData:any=[
    {title:'sholla Ameko'},
    {title:'xuze ren'},
    {title:'tengfenng hu'},
    {title:'hongtu zhao'}
  ];
  public searchName:string=''
  constructor(public navParams:NavParams) { }

  ngOnInit() {}
  getSelectlist(){
    this.isSelectList=!this.isSelectList;
  }
  select(item,index){
    this.selectText=item.person;
    this.selectIndex=index;
    this.isSelectList=false;
  }
  delectSelect(){
    this.searchName='';
    this.isDelect=false;
  }
  getSearch(){
    this.isDelect=true;
    //发送请求
  }
  dismiss(){
    this.navParams.data.modal.dismiss({
      result:''
    })
  }
  setManager(item){
    this.navParams.data.modal.dismiss({
      result:item.title
    })
  }
  clean(){
    this.navParams.data.modal.dismiss({
      result:''
    })
  }
}
