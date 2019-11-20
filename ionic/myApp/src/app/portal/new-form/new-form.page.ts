import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-new-form',
  templateUrl: './new-form.page.html',
  styleUrls: ['./new-form.page.scss'],
})
export class NewFormPage implements OnInit {
  public formType;
  public templates:any;
  public title: string;
  public formID: string;
  public loadSecs: any = [];
  public fields;

  public activeActionsheetIdex;
  public sigleEmpChoice;
  public multiEmpChoice:any=[];
  public empLists:any=[];
  public oulist:any=[];
  public selectOudata;
  public ouHierarchy:any=[];
 // public hideSecs:any=[];

  public quesFiledValue;
  public quesFiledName;
  public quesValueArray:any=[];

  public sublistFiledOptions:any=[];
  public sublistObjId;
 
 // public currentDate=new Date().toISOString();

  public today=new Date().toISOString();
  public viewColumns=[];

  public riskName:string = '';
  //public isShowRiskMatrix:boolean;
  public labelSize;
  
  public customiseColor;
  public draftStatus;
  public riskMatrixArray = [];
  //For lat, lon field
  public lat;
  public lon;

  public attachedImages=[];


  constructor(
    private storage: Storage,
    public modalCtrl: ModalController
  ) { 

    console.log("进")
    this.storage.get("allforms").then(data => {
    
      this.templates=JSON.parse(data).templates
      console.log(this.templates)
    // alert(fileName);
    for (let i = 0; i < this.templates[0].template.secs.length; i++) {
      for (let b = 0; b < this.templates[0].template.secs[i].fields.length; b++) {
        //alert(JSON.stringify(this.formType.template.secs[i].fields[b]));
        if ((this.templates[0].template.secs[i].fields[b].xtype == 'date') || (this.templates[0].template.secs[i].fields[b].xtype == 'time')) {
          let now = new Date();
          this.templates[0].template.secs[i].fields[b].value = now;
        }
        if (this.templates[0].template.secs[i].fields[b].xtype == 'singleou') {
        }
      }
      this.loadSecs.push(this.templates[0].template.secs[i]);
    }
    this.fields = this.loadSecs[0].fields;
    })


  }

  ngOnInit() {

   
    
  }


  getemplistData(type,name,value){
  

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
}
