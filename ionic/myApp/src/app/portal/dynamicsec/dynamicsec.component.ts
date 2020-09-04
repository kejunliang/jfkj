import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-dynamicsec',
  templateUrl: './dynamicsec.component.html',
  styleUrls: ['./dynamicsec.component.scss'],
})
export class DynamicsecComponent implements OnInit {
  @Input() sec: any;
  @Input() doctype: string;
  public index: number = 0;
  public count: number = 0;
  public curque: number = 0;
  public fields: any;
  public dynamicData: any;

  constructor() {
    
   }

  ngOnInit() {
    console.log(this.sec)
    console.log('doctype:',this.doctype);
    this.fields = this.sec.fields;
    this.dynamicData = this.sec.dynamicData;
    this.index = this.sec.index || 0;
    this.curque = this.index + 1;
    this.count = this.dynamicData.quesList.length;
    const curques = this.dynamicData.quesList[this.index];
    this.fields.forEach((e,i) => {
      if(curques[i]) e.value = curques[i];
    });
  }

  radioChange(field,val){
    console.log('field:',field);
    console.log('val:',val)
    field.value = val;
    let fval: any = field.value;
    if(field.options){
      const v = field.options.find(e => e.text == fval);
      if(v) fval = v.value;
    }
    if(fval == "Yes"){
      field.color = "green";
    }else if(fval == "No"){
      field.color = "red";
    }else if(fval == "N/A"){
      field.color = "gray";
    } 
  }
  go(curque: number){
    console.log('curque:',curque);
    //const curque = this.curque;
    if(curque >= 1 && curque <= this.count){
      let index = this.index;
      this.fields.forEach((e,i) => {
        this.dynamicData.quesList[index][i] = e.value;
        const val = this.dynamicData.quesList[curque-1][i];
        e.value = val;
        if(e.xtype == "radio" || e.xtype == "select"){
          if(val == "Yes"){
            e.color = "green";
          }else if(val == "No"){
            e.color = "red";
          }else if(val == "N/A"){
            e.color = "gray";
          } 
        }
      });
      this.index = curque-1;
    }
  }
  
}
