import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GetallformsService } from "../../services/getallforms.service";
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { first } from 'rxjs/operators';
import { commonCtrl } from "../../common/common";
import {PopoverComponent } from "../../common/popover/popover.component"
@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.page.html',
  styleUrls: ['./new-form.page.scss'],
  providers: [commonCtrl]
})
export class NewFormPage implements OnInit {
  public formType;
  public templates: any;
  public title: string;
  public formID: string;
  public loadSecs: any = [];
  public fields;

  public activeActionsheetIdex;
  public sigleEmpChoice;
  public multiEmpChoice: any = [];
  public empLists: any = [];
  public oulist: any = [];
  public selectOudata;
  public ouHierarchy: any = [];
  // public hideSecs:any=[];

  public quesFiledValue;
  public quesFiledName;
  public quesValueArray: any = [];

  public sublistFiledOptions: any = [];
  public sublistObjId;

  // public currentDate=new Date().toISOString();

  public today = new Date().toISOString();
  public viewColumns = [];

  public riskName: string = '';
  //public isShowRiskMatrix:boolean;
  public labelSize;

  public customiseColor;
  public draftStatus;
  public riskMatrixArray = [];
  //For lat, lon field
  public lat;
  public lon;

  public attachedImages = [];
  public guidanceData: any = [{ value: '1' }];
  public resvalue: any;
  public selecttemplat: any;
  public showGuidance: any = false;
  public sections: any = [];
  public sectionsold: any = [];
  public num: number;
  public list: any = [
    { "show": false }
  ];
  public isShowBtn: boolean = false;
  public btnBox: any = [
  ];
  public para = {
    "unid": "",
  }
  public formdata: any;
  public type:string;
  public sysfields:any=[]
  public mandafields:any;
  constructor(
    private storage: Storage,
    public modal: ModalController,
    public activeRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public getforms: GetallformsService,
    public commonCtrl: commonCtrl,
  ) {

    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      console.log("进")
      if (res.unid) {
        this.type="old"
        if(res.stat){
          this.title=res.title+"("+res.stat+")"
        }else{
          this.title=res.title
        }
       
        this.commonCtrl.show()
        this.getFormData(res.unid).then(formdata => {
          this.storage.get("allforms").then(data => {
            // console.log(JSON.parse(data))
            this.templates = JSON.parse(data).templates
            //  console.log(this.templates)
            // alert(fileName);
            this.selecttemplat = this.getTemplatByViewId(this.templates, res.aid)
            
            console.log(this.selecttemplat)
            if (!this.selecttemplat) {
              return false;
            }
            this.btnBox= this.selecttemplat.menubaritem
            for (let i = 0; i < this.selecttemplat.template.secs.length; i++) {
              for (let b = 0; b < this.selecttemplat.template.secs[i].fields.length; b++) {
                //alert(JSON.stringify(this.formType.template.secs[i].fields[b]));
                if ((this.selecttemplat.template.secs[i].fields[b].xtype == 'date') || (this.selecttemplat.template.secs[i].fields[b].xtype == 'time')) {
                  let now = new Date();
                  this.selecttemplat.template.secs[i].fields[b].value = now;
                }
                if (this.selecttemplat.template.secs[i].fields[b].xtype == 'singleou') {
                }
              }
              this.selecttemplat.template.secs[i].fields.forEach(data => {
                data.value=formdata[data.name]
              })
              // console .log(this.selecttemplat.template.secs[i])
              console.log(this.selecttemplat.template.secs[i].secId) 
              this.sections.push(this.selecttemplat.template.secs[i])
              this.list.push({ "show": false })
              this.commonCtrl.hide()
            }
          })
        })
      } else {
        this.type="new"
        this.storage.get("allforms").then(data => {
          // console.log(JSON.parse(data))
          this.templates = JSON.parse(data).templates
          //  console.log(this.templates)
          // alert(fileName);
          this.selecttemplat = this.getTemplatByViewId(this.templates, res.aid)
         
          console.log(this.selecttemplat)
          if (!this.selecttemplat) {
            return false;
          }
          this.btnBox= this.selecttemplat.menubaritem
          this.title=this.selecttemplat.template.templateTitle
          this.sysfields=this.selecttemplat.template.secs[0].fields
          this.mandafields=this.selecttemplat.template.mandaFields
          console.log(this.sysfields)
          for (let i = 0; i < this.selecttemplat.template.secs.length; i++) {
           
            for (let b = 0; b < this.selecttemplat.template.secs[i].fields.length; b++) {
              //alert(JSON.stringify(this.formType.template.secs[i].fields[b]));
              if ((this.selecttemplat.template.secs[i].fields[b].xtype == 'date') || (this.selecttemplat.template.secs[i].fields[b].xtype == 'time')) {
                let now = new Date();
                this.selecttemplat.template.secs[i].fields[b].value = now;
              }
              if (this.selecttemplat.template.secs[i].fields[b].xtype == 'singleou') {
              }
            }
            //console.log(this.selecttemplat.template.secs[i].fields)
           
            this.selecttemplat.template.secs[i].fields.forEach(data => {
              this.mandafields.forEach(element => {
                 if(element.label==data.label){
                    data.hasmust=true
                 }
              });
              if(data.xtype=="radio"||data.xtype=="select"){
                data.options= data.options.filter(function(obj){ return  obj.value!=""})
              }
              this.loadSecs.push(data);
            })
            // console .log(this.selecttemplat.template.secs[i])
           
           //this.initLoggedinUserOuData(this.selecttemplat.template.secs[i].secId)
           //this.selecttemplat.template.secs[i].fields.concat(this.initLoggedinUserOuData(this.selecttemplat.template.secs[i].secId))
            this.sections.push(this.selecttemplat.template.secs[i])
            this.sectionsold.push(this.selecttemplat.template.secs[i])
            this.list.push({ "show": false })
          }
          let flag=this.sections.some( function(obj,index){
              console.log(obj.title)
              return obj.title=="Severity"
          })
          if(flag){
            this.change({"label":"Severity"})
          }
        
        })
      }
     

    })





  }

  getTemplatByViewId(data, vid) {
    let res;
    data.forEach(element => {
      if (element.template.template_id == vid) {
        res = element
      }
    });
    return res;
  }

  initLoggedinUserOuData(name)
{
  let ouLevel:number;
   let secIdous:any=[];
  for(var i=1;i<=10;i++){
			if(this.selecttemplat.template['ou'+i+'Fields']){
				for(var j=0;j<this.selecttemplat.template['ou'+i+'Fields'].length;j++){
					//if(secId != this.formType.template['ou'+i+'Fields'][j].parentSecId) continue;
					var parentSecId=this.selecttemplat.template['ou'+i+'Fields'][j].parentSecId;//check if ou[i].field contail fieldId
					if(parentSecId==name){
            this.selecttemplat.template['ou'+i+'Fields'][j].xtype="multiselect"
            this.selecttemplat.template['ou'+i+'Fields'][j].label= this.selecttemplat.template['ou'+i+'Fields'][j].fieldLabel
            
            secIdous.push(this.selecttemplat.template['ou'+i+'Fields'][j]);
					  break;
					}
				}

			}
		}
  console.log(secIdous)
  return secIdous;
};

  ngOnInit() {

    console.log(this.sections[0])

  }


  getemplistData(type, name, value) {


  };

  getSublistdetails(name, value) {
    // this.hasSubFiledValue=value;
    for (var i = 0; i < this.formType.template.hasSubFields.length; i++) {
      var field = this.formType.template.hasSubFields[i];
      //if(secId!=field.parentSecId) continue;
      var hasSubFieldEl = field.fieldId;
      if (hasSubFieldEl == name) {
        this.hasSubfieldChange(field, value);
      }
    }

    var subListFields = this.formType.template.subListFields ? this.formType.template.subListFields : [];
    //console.log(subListFields);
    for (var i = 0; i < subListFields.length; i++) {
      //if(secId!=subListFields[i].parentSecId) continue;
      var subListFieldsEl = subListFields[i].parentSecId + "_" + subListFields[i].options.subfieldlist.pfieldid;
      var subListFieldsElAl = subListFields[i].options.subfieldlist.pfieldid;


      if ((subListFieldsEl) || (subListFieldsElAl)) {

        if ((subListFieldsEl == name) || (subListFieldsElAl == name)) {

          this.subListFieldChange(subListFields[i], value);

        }

      }

    }
  }

  subListFieldChange(field, v) {
    this.sublistObjId = "";
    var v = (!v) ? "" : v;
    var array = [];
    if (typeof (v) == 'string') {

      array.push(v);
    } else {
      array = array.concat(v);
    }

    var list = field.options.subfieldlist.list;
    var obj = field.fieldId;
    //alert(obj);
    if (!obj) return;
    this.sublistObjId = obj;
    this.sublistFiledOptions = [{ text: '', value: '' }];
    for (var i = 0; i < list.length; i++) {


      if (array.indexOf(list[i].value) >= 0) {
        console.log(list[i].list);
        for (var j = 0; j < list[i].list.length; j++) {
          this.sublistFiledOptions.push({ text: list[i].list[j], value: list[i].list[j] });
        }
      }

    }
  };
  hasSubfieldChange(field, v) {
    if (!field.subField) return;
    var hideSubfield = [];
    //var showSubfield=[];
    for (let g = 0; g < field.subField.length; g++) {
      let ids = field.subField[g].id;
      for (var j = 0; j < ids.length; j++) {
        if (ids[j] == '') continue;
        var obj = field.parentSecId + '_' + ids[j];
        hideSubfield.push(obj);
        hideSubfield.push(ids[j]);

      }
    }
    this.hideSubfieldFunc(hideSubfield)
    //
    var v = (!v) ? "" : v;
    var array = [];
    if (typeof (v) == 'string') {

      array.push(v);
    } else {
      array = array.concat(v);
    }
    let showSubfield = [];
    for (var i = 0; i < field.subField.length; i++) {


      if (array.indexOf(typeof (field.subField[i].displayWhen) == "string" ? field.subField[i].displayWhen : field.subField[i].displayWhen[0]) >= 0) {
        var ids = field.subField[i].id;
        for (let h = 0; h < array.length; h++) {
          if (array[h] == field.subField[i].displayWhen) {
            for (var j = 0; j < ids.length; j++) {

              if (ids[j] == '') continue;
              var obj = field.parentSecId + '_' + ids[j];
              // this.hasSubObjId=obj;
              showSubfield.push(obj);
              showSubfield.push(ids[j]);
            }//end for j loop
          }
        }


      }

    }
    this.showSubfieldFunc(showSubfield);
  };
  showSubfieldFunc(showSubfield) {


    for (let e = 0; e < showSubfield.length; e++) {
      for (let c = 0; c < this.loadSecs.length; c++) {
        for (let d = 0; d < this.loadSecs[c].fields.length; d++) {


          if (this.loadSecs[c].fields[d].name == showSubfield[e]) {

            this.loadSecs[c].fields[d].hide = false;
          }
        }
      }

    }//End for loop
  }
  hideSubfieldFunc(hideSubfield) {
    for (let c = 0; c < this.loadSecs.length; c++) {
      for (let d = 0; d < this.loadSecs[c].fields.length; d++) {

        for (let e = 0; e < hideSubfield.length; e++) {
          if (this.loadSecs[c].fields[d].name == hideSubfield[e]) {
            this.loadSecs[c].fields[d].hide = true;
          }
        }
      }

    }//End for loop
  };
  ionViewDidLoad() {

  };



  //查找名称
  async getSecurity() {

  }

  isShowGuidance(sectionid, index) {
   // console.log(sectionid)
    //console.log(index)
   // console.log(this.list)
    this.showGuidance = !this.showGuidance;
    this.num = index;
    this.list[index].show = !this.list[index].show;
  }

  getSwitchBtn(item) {
    console.dir(item)
    this.isShowBtn = false;
  }
  getBtnPopover() {
    //打开btn
    this.isShowBtn = true;
    // this.el.nativeElement.querySelector('.shade');  获取元素操作dom

  }
  closeZoom() {
    this.isShowBtn = false;
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      componentProps: { type: "action", data: this.btnBox },
      translucent: true,
      cssClass:"custom-popover",
      mode:"md"
    });
    return await popover.present();
  }
  getFormData(unid: any) {
    return new Promise((resolve, reject) => {
      this.storage.get("loginDetails").then(data => {
        this.para.unid = unid
        this.getforms.getFormData(data, this.para).pipe(first()).subscribe(data => {
          resolve(data)
        })
      })
    })
  }
  change(field:any){
    console.log(field)
     if(field.label.trim()!="Severity"){
       return false;
     }
     let oldsections= this.sectionsold
     let filtersections=[]
     filtersections=oldsections.filter( obj => {
       return obj.title.indexOf(field.value)!=-1
     })
     var curindex
     oldsections.forEach( (element,index) => {
         if(element.title.trim()==="Severity"){
          curindex= index
         }
     });
     this.sections=oldsections.slice(0,curindex+1).concat(filtersections)
  }
 
}

