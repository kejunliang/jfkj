import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GetallformsService } from "../../services/getallforms.service";
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { first } from 'rxjs/operators';
import { commonCtrl } from "../../common/common";
import { PopoverComponent } from "../../common/popover/popover.component"
import { SecurityComponent } from "../../common/security/security.component"
import { Router } from '@angular/router';
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
  public fields: any = [];
  //For lat, lon field
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
  public btnBox: any = {
    "result": [
      { "btnType": "Edit", "btnLabel": "Edit" },
      { "btnType": "Close", "btnLabel": "Close" }
    ]
  };
  public para = {
    "unid": "",
  }
  public formdata: any;
  public type: string;
  public sysfields: any = []
  public mandafields: any;
  public managerName: string;
  public psninfo: object;
  public severityvalue: string;
  public templatid: string;

  public ous: any = [];
  public ou1select: any = [];
  public ou2select: any = [];
  public ou3select: any = [];
  public ou4select: any = [];
  public ou5select: any = [];
  public paraforsubmit: any;
  public today = new Date().toISOString();
  public initiator:any='';
  public initiatorOU:any = '';
  public ulrs = {
    "url":"",
    "stat":"",
    "title":"",
    "aid":"",
    "unid":""
  }
  //lookup select --start 20200106
  public lookupOptins2:any=[];
  public lookupOptins3:any=[];

  //lookup select --end

  //subfield select --start 20200106
  public subfields:any = [];
  //subfield select --end
  constructor(
    private storage: Storage,
    public modal: ModalController,
    public activeRoute: ActivatedRoute,
    public popoverController: PopoverController,
    public getforms: GetallformsService,
    public commonCtrl: commonCtrl,
    public router: Router,
    public alertController: AlertController,
  ) {

    this.ulrs.url = this.router.url
    this.ulrs.unid = this.getQueryVariable( this.ulrs.url, "unid")
    this.ulrs.aid = decodeURIComponent(this.getQueryVariable( this.ulrs.url, "aid"))
    this.ulrs.title = decodeURIComponent(this.getQueryVariable( this.ulrs.url, "title"))
    this.ulrs.stat = decodeURIComponent(this.getQueryVariable( this.ulrs.url, "stat"))


    this.storage.get('ous').then(data => {
      this.ous = data
    })
    this.storage.get('loginDetails').then(data=>{
      this.initiator = data.username;
      this.initiatorOU = data.OUCategory;
    })
    this.activeRoute.queryParams.subscribe(res => {
      console.log(res);
      console.log("进")
      this.sections = []
      this.sectionsold = []
      if (res.unid) {
        this.fields=[];
        this.formID = res.unid
        console.log("旧文档")
        this.type = res.type
        if (res.stat) {
          this.title = res.title + "(" + res.stat + ")"
        } else {
          this.title = res.title
        }

        this.commonCtrl.show()
        this.getFormData(res.unid).then(formdata => {
          // console.log(formdata)
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
            if (this.type == "edit") {
              this.btnBox = this.selecttemplat.menubaritem
            }

            this.selecttemplat.template.secs[0].fields.forEach(data => {

              if (data.xtype == "date") {
                data.value = new Date()
              } else {
                data.value = formdata[data.name]
              }
            })
            this.sysfields = this.selecttemplat.template.secs[0].fields
            this.mandafields = this.selecttemplat.template.mandaFields
            this.templatid = this.selecttemplat.template.templateId
            for (let i = 0; i < this.selecttemplat.template.secs.length; i++) {
              this.selecttemplat.template.secs[i].fields.forEach(data => {
                data.value = formdata[data.name]
                if (data.name == "GMP_SEV_GMP_SH") {
                  this.severityvalue = data.value
                }
                this.mandafields.forEach(element => {
                  if (element.label == data.label) {
                    data.hasmust = true
                  }
                });
                this.fields.push(data) //
              })
              // console .log(this.selecttemplat.template.secs[i])
              // console.log(this.selecttemplat.template.secs[i].secId)
              this.sections.push(this.selecttemplat.template.secs[i])
              this.sectionsold.push(this.selecttemplat.template.secs[i])
              this.list.push({ "show": false })
              this.commonCtrl.hide()
            }
            // console.log(this.list)
            let flag = this.sections.some(function (obj, index) {
              console.log(obj.title)
              return obj.title == "Severity"
            })
            if (flag) {
              this.change({ "label": "Severity", "value": this.severityvalue })
            }
          })
        })
      } else {
        this.fields=[];
        this.type = "edit"
        this.storage.get("allforms").then(data => {
          this.templates = JSON.parse(data).templates
          this.selecttemplat = this.getTemplatByViewId(this.templates, res.aid)
          console.log(this.selecttemplat)
          if (!this.selecttemplat) {
            return false;
          }
          this.btnBox = this.selecttemplat.menubaritem
          this.title = this.selecttemplat.template.templateTitle
          this.sysfields = this.selecttemplat.template.secs[0].fields
          this.mandafields = this.selecttemplat.template.mandaFields
          this.templatid = this.selecttemplat.template.templateId
          console.log(this.sysfields)
          for (let i = 0; i < this.selecttemplat.template.secs.length; i++) {
            this.selecttemplat.template.secs[i].fields.forEach(data => {
              this.mandafields.forEach(element => {
                if (element.label == data.label) {
                  data.hasmust = true
                }
              });
              if (data.xtype == "radio" || data.xtype == "select") {
                data.options = data.options.filter(function (obj) { return obj.value != "" })
                if(data.xtype == "select"){
                  if(this.selecttemplat.template.subListFields.length>0){
                    let secId = this.selecttemplat.template.secs[i].secId;
                    let fieldname = data.name;
                    let fieldId = fieldname.split(secId+'_')[1];
                    let v = this.selecttemplat.template.subListFields.find(e => e.parentSecId==secId && 
                      e.options && e.options.subfieldlist && e.options.subfieldlist.pfieldid && e.options.subfieldlist.pfieldid==fieldId)
                    if(v){
                      data.hasSubfield = true;
                      data.fieldId = fieldId;
                    }
                    
                  }
                }
              }
              this.loadSecs.push(data);
              this.fields.push(data) //
              if(data.xtype == 'multiou' || data.xtype == 'singleou'){
                let obj: any = this.getOuLevelAndGroupId(data.name, this.selecttemplat.template.secs[i].secId);
                let level: number = obj.level;
                let ouGroupId: string = obj.ouGroupId;
                if (this.initiatorOU){
                  let iou:any = this.initiatorOU.split('\\');
                  let tmp:any = '';
                  for(let m=0;m<level;m++){
                    if(tmp==''){
                      if(iou[m]) tmp=iou[m];
                    }else{
                      if(iou[m]) tmp+="/"+iou[m];
                    }
                  }
                  this.getOUSublistdetails(data.name,tmp,this.selecttemplat.template.secs[i].secId);
                  data.value = tmp;
                }
               
              }
            })
            // console .log(this.selecttemplat.template.secs[i])
            this.sections.push(this.selecttemplat.template.secs[i])
            this.sectionsold.push(this.selecttemplat.template.secs[i])
            this.list.push({ "show": false })
          }
          let flag = this.sections.some(function (obj, index) {
            console.log(obj.title)
            return obj.title == "Severity"
          })
          if (flag) {
            this.change({ "label": "Severity" })
          }

        })
      }
      //get Person
      this.storage.get('psninfo').then(data => {
        console.log(JSON.parse(data))
        this.psninfo = JSON.parse(data).person
        this.guidanceData = this.psninfo

      })

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

  ngOnInit() {

    console.log(this.sections[0])

  }


  ionViewDidLoad() {
    
  };


  isShowGuidance(sectionid, index) {
    // console.log(sectionid)
    //console.log(index)
    // console.log(this.list)
    this.showGuidance = !this.showGuidance;
    this.num = index;
    this.list[index].show = !this.list[index].show;
  }

  getSwitchBtn(item) {

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
      componentProps: { type: "action", data: this.btnBox, formdata: this.fields, unid: this.formID, tempid: this.templatid },
      translucent: true,
      cssClass: "custom-popover",
      mode: "md"
    });
    popover.present();
    const { data } = await popover.onDidDismiss();
    console.log(data)
    this.getBtnLink(data)
  }

  getBtnLink(btn) {

    this.fields.forEach(data => {
      if(data.xtype == "date"&&data.value!=undefined){
       data.value =data.value.substring(0,data.value.indexOf("T"))
      }
    })
    let actiontype = ""
    switch (btn) {
      case "Edit":
        actiontype = "edit"
        break;
      case "Save":
        actiontype = "edit"
        console.log("unid==" + this.formID)
        console.log(this.fields)

        if (this.formID) {
          this.paraforsubmit = {
            "tempid": this.templatid,
            "formAction": "save",
            "docId": this.formID,
            "fields": this.fields
          }
        } else {
          console.log("tempid==" + this.templatid)
          this.paraforsubmit = {
            "tempid": this.templatid,
            "formAction": "save",
            "docId": "",
            "fields": this.fields
          }
        }
        console.log("保存了")
        this.submit(this.paraforsubmit,actiontype)
        break;
      case "Submit":
        console.log("unid==" + this.formID)
        console.log(this.fields)
        actiontype = "edit"
        if (this.formID) {
          this.paraforsubmit = {
            "tempid": this.templatid,
            "formAction": "submit",
            "docId": this.formID,
            "fields": this.fields
          }
        } else {
          console.log("tempid==" + this.templatid)
          this.paraforsubmit = {
            "tempid": this.templatid,
            "formAction": "submit",
            "docId": "",
            "fields": this.fields
          }
        }
        console.log("提交操作")
        let msg = "";
        let fieldError = false;
        for (let p = 0; p < this.selecttemplat.template.mandaFields.length; p++) {
          for (let d = 0; d < this.fields.length; d++) {
            if (this.selecttemplat.template.mandaFields[p].fieldId == this.fields[d].name) {
              console.log(this.fields[d].name)
              let type = this.selecttemplat.template.mandaFields[p].type;
              //let con=this.formType.template.mandaFields[p].con;
              if (type == "m") {
                if ((this.fields[d].value == "") || (this.fields[d].value == undefined)) {
                  msg += this.selecttemplat.template.mandaFields[p].label + ' field cannot be empty!<br/>';
                  fieldError = true;
                }
              }
              else {
                if (type == "d") {
                  if ((this.fields[d].value == "") || (this.fields[d].value == undefined)) {
                    msg += this.selecttemplat.template.mandaFields[p].label + ' field cannot be empty!<br/>';
                    fieldError = true;
                  }
                  else {

                    if (this.fields[d].value < this.today) {
                      msg += this.selecttemplat.template.mandaFields[p].label + ' date cannot be less than current date';
                      fieldError = true;
                    }
                  }
                }
              }
            }
          }



        }//End
        console.log(msg)
        if (fieldError) {
          console.log("必填了")
          console.log(msg)
          this.presentAlert(msg, "", "OK")
          return false;
        }
        else {
           this.submit(this.paraforsubmit,actiontype)
        }
       
        break;
      default:
        actiontype = "open"
        break;
    }
    console.log("操作了吗")
   
    this.router.navigate(["/new-form"], { queryParams: { unid:  this.ulrs.unid, aid: this.ulrs.aid, title: this.ulrs.title, stat: this.ulrs.stat, type: actiontype, refresh: new Date().getTime() } });
    //this.Popover.dismiss(btn)

  }
  async presentAlert(msg: string, header: string, btn: string) {

    const alert = await this.alertController.create({
      header: header,
      subHeader: '',
      message: msg,
      buttons: [btn]
    });

    await alert.present();
  }
  getQueryVariable(url, variable) {
    let query = url.split("?")[1]
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
  }
  submit(para,actiontype) {
    return new Promise((resolve, reject) => {
      this.storage.get("loginDetails").then(logindata => {
        this.getforms.getFormData(logindata, { "unid": "EBE27D0FEC6AEFF9482584D90020DCE6" }).pipe(first()).subscribe(data => {
          this.getforms.submit(logindata, para).pipe(first()).subscribe(data => {
            console.log(data)
            this.router.navigate(["/new-form"], { queryParams: { unid:  this.ulrs.unid, aid: this.ulrs.aid, title: this.ulrs.title, stat: this.ulrs.stat, type: actiontype, refresh: new Date().getTime() } });
          })
          //resolve(data)
        })
      })
    })
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
  change(field: any) {
    console.log(field)
    if (field.label.trim() != "Severity") {
      return false;
    }
    let oldsections = this.sectionsold
    let filtersections = []
    filtersections = oldsections.filter(obj => {
      return obj.title.indexOf(field.value) != -1 && field.value != ""
    })
    var curindex
    oldsections.forEach((element, index) => {
      if (element.title.trim() === "Severity") {
        curindex = index
      }
    });
    this.sections = oldsections.slice(0, curindex + 1).concat(filtersections)
  }

  //查找名称
  async getSecurity(fieldname, fieldvalue) {
    const modal = await this.modal.create({
      showBackdrop: true,
      component: SecurityComponent,
      componentProps: { value: this.guidanceData }
    });
    modal.present();
    //监听销毁的事件
    const { data } = await modal.onDidDismiss();
    for (let i = 0; i < this.selecttemplat.template.secs.length; i++) {
      this.selecttemplat.template.secs[i].fields.forEach(item => {
        console.log(fieldname)
        console.log(item.name)
        if (item.name == fieldname) {
          console.log(data)
          item.value = data.result;
        }
      })

    }

    console.log(this.selecttemplat.template.secs)

  }
  getOuList(fieldName: any, pSecId: any) {
    let obj: any = this.getOuLevelAndGroupId(fieldName, pSecId);
    let level: number = obj.level;
    let ouGroupId: string = obj.ouGroupId;
    //console.log('obj:',obj,'--level:',level,'--ouGroupId:',ouGroupId)
    var arr: any = [];
    var tmparr: any = [];
    if (level == 1) {
      //return JSON.parse(this.ous).ou1;
      if(this.ous){
        tmparr = JSON.parse(this.ous).ou1;
        for (let i = 0; i < tmparr.length; i++) {
          arr.push({ text: tmparr[i], value: tmparr[i] });
        }
      }
      
    } else {
      let ouselect: any = this['ou' + (level - 1) + 'select'];
      
      if (ouselect) {
        let v: any = ouselect.find(e => e.ouGroupId == ouGroupId);
        if (v) return v['ou' + level + 'list'] ? v['ou' + level + 'list'] : [];
      }
    }
    return arr;
  }
  getOUSublistdetails(name: any, val: any, pSecId: any) {
    val = typeof(val)=='string'?[val]:val;
    let obj: any = this.getOuLevelAndGroupId(name, pSecId);
    let level: number = obj.level;
    let ouGroupId: string = obj.ouGroupId;
    let ou: any = {};
    ou.ouGroupId = ouGroupId;
    let arr: any = [];
    let ouLevelList = JSON.parse(this.ous)["ou" + (level + 1)];
    let tmparr: any = [];
    let tmparr1: any = [];
    let tmparr2: any = [];
    let text: any;
    let value: any;
    
    for (let i = 0; i < val.length; i++) {
      if (val[i].indexOf('/') > -1) {
        tmparr2 = val[i].split('/');
      } else {
        tmparr2 = [val[i]];
      }
      let v = ouLevelList.find(e => {
        if (level == 1) return e['ou' + level] == tmparr2[0];
        if (level == 2) return e['ou' + level] == tmparr2[1] && e['ou' + (level - 1)] == tmparr2[0];
        if (level == 3) return e['ou' + level] == tmparr2[2] && e['ou' + (level - 1)] == tmparr2[1] && e['ou' + (level - 2)] == tmparr2[0];
        if (level == 4) return e['ou' + level] == tmparr2[3] && e['ou' + (level - 1)] == tmparr2[2] && e['ou' + (level - 2)] == tmparr2[1] && e['ou' + (level - 3)] == tmparr2[0];
        if (level == 5) return e['ou' + level] == tmparr2[4] && e['ou' + (level - 1)] == tmparr2[3] && e['ou' + (level - 2)] == tmparr2[2] && e['ou' + (level - 3)] == tmparr2[1] && e['ou' + (level - 4)] == tmparr2[0];
        return e;
      })

      tmparr1 = [];
      if (v) {
        tmparr = v['ou' + (level + 1)];
        for (let j = 0; j <tmparr.length; j++) {
          text = tmparr[j] + '(' + tmparr2[level-1] + ')';
          if (level == 1) {
            value = tmparr2[0] + '/' + tmparr[j];
          } else if (level == 2) {
            value = tmparr2[0] + '/' + tmparr2[1] + '/' + tmparr[j];
          } else if (level == 3) {
            value = tmparr2[0] + '/' + tmparr2[1] + '/' + tmparr2[2] + '/' + tmparr[j];
          } else if (level == 4) {
            value = tmparr2[0] + '/' + tmparr2[1] + '/' + tmparr2[2] + '/' + tmparr2[3] + '/' + tmparr[j];
          } else if (level == 5) {
            value = tmparr2[0] + '/' + tmparr2[1] + '/' + tmparr2[2] + '/' + tmparr2[3] + '/' + tmparr2[4] + '/' + tmparr[j];
          } else {
            text = '';
            value = '';
          }

          tmparr1.push({ text, value })
        }
      }

      arr = arr.concat(tmparr1);
    }
    
    ou['ou' + (level + 1) + 'list'] = arr;
    let index: number = this['ou' + level + 'select'].findIndex(e => e.ouGroupId == ouGroupId);
    if (index == -1) {
      this['ou' + level + 'select'].push(ou);
    } else {
      this['ou' + level + 'select'].splice(index, 1, ou);
    }

  }
  getOuLevelAndGroupId(fieldName: any, pSecId: any): object {
    let level: number = 1
    let ouGroupId: string = ''
    for (var i = 1; i <= 10; i++) {
      if (this.selecttemplat.template['ou' + i + 'Fields']) {

        let v = this.selecttemplat.template['ou' + i + 'Fields'].find(item => item.parentSecId == pSecId && item.fieldId == fieldName)
        if (v) {
          level = i;
          ouGroupId = v.ouGroupId;
          break;
        }

      }
    }

    return { level, ouGroupId };
  }
  getSelectOption(field:any,secId:any){
    if(field.lookup.view){
      let column:any = field.lookup.column;
      if(column=="1"){
        return field.options;
      }else{
        let v = this['lookupOptins'+column].find(e=>{
          return e.secId == secId && e.view == field.lookup.view;
        });
        return v?v.options:[];
      }
      return [];
    }
    if(field.pFieldId!=''){
      let v = this.selecttemplat.template.subListFields.find(e => e.parentSecId==secId && e.fieldId == field.name);
      if(v){
        let t = this.subfields.find(e=>e.secId==secId && e.fieldId == field.name);
        if(t) return t.options;
      }
    }
    return field.options;
  }
  getSublistOption(field:any,secId:any){
    if(field.lookup.view){
      let column:any = field.lookup.column;
      console.log('column:',column);
      
      let val:any= field.value;
      let view:any = field.lookup.view;
      if(parseInt(column)>1){
        let v = this['lookupOptins'+column].find(e=>{
          return e.secId == secId && e.view == view;
        });
        if(v && v.lastval) val = v.lastval + '@@' + val;
          
      }
      column = parseInt(column)+1;
      let obj:any = {
        key:val,
        db:field.lookup.db?field.lookup.db:'',
        view,
        column
      }
      this.getLookupOptions(obj).then((data:any)=>{
        if(data.status=="success"){
          let options:any = [];
          console.log('data.data:',data.data);
          
          for (let i = 0; i < data.data.length; i++) {
            let element = data.data[i];
            options.push({value:element,text:element})
          }
          
          let tobj:object = {
            secId,
            view,
            lastval:val,
            options:options
          }
          if(this['lookupOptins'+column]){
            let index: number = this['lookupOptins'+column].findIndex(e => e.secId == secId && e.view == view);
            if (index == -1) {
              this['lookupOptins'+column].push(tobj);
            } else {
              this['lookupOptins'+column].splice(index, 1, tobj);
            }
          }
           
        }
      });
    }
    if(field.hasSubfield){
      let val = field.value;
      let fieldId = field.fieldId;
      let v = this.selecttemplat.template.subListFields.find(e => e.parentSecId==secId && 
        e.options && e.options.subfieldlist && e.options.subfieldlist.pfieldid &&
        fieldId && e.options.subfieldlist.pfieldid==fieldId)
      if(v){
        let element = v.options.subfieldlist.list.find(e=>e.value==val);
        if(element){
          let options:any = [];
          for (let i = 0; i < element.list.length; i++) {
            let ele = element.list[i];
            options.push({value:ele,text:ele})
          }
          let obj:object = {
            secId,
            fieldId:v.fieldId,
            options
          }
          let index: number = this.subfields.findIndex(e => e.secId == secId && e.fieldId == v.fieldId);
          if (index == -1) {
            this.subfields.push(obj);
          } else {
            this.subfields.splice(index, 1, obj);
          }
          console.log('this.subfields:',this.subfields);
          
        }
      }
    }
  }
  getLookupOptions(para: object) {
    return new Promise((resolve, reject) => {
      this.storage.get("loginDetails").then(data => {
        this.getforms.getLoopupOptions(data, para).pipe(first()).subscribe(data => {
          resolve(data)
        })
      })
    })
  }
}

