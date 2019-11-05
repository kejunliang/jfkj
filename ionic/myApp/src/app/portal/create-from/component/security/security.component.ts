import { Component, OnInit } from '@angular/core';

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
    {title:'sholla Ameko'},
    {title:'sholla Ameko'},
    {title:'sholla Ameko'}
  ];
  public searchName:string=''
  constructor() { }

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
  
}
