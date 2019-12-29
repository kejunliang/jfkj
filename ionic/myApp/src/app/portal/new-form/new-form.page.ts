import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GetallformsService } from "../../services/getallforms.service";
import { parseLazyRoute } from '@angular/compiler/src/aot/lazy_routes';
import { first } from 'rxjs/operators';
import { commonCtrl } from "../../common/common";
import { PopoverComponent } from "../../common/popover/popover.component"
import { SecurityComponent } from "../../common/security/security.component"

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
  public fields: Array<object> = [];
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
      { "btnType": "Edit", "btnLabel": "Edit" }
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
  public templatid:string;
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
      this.sections = []
      this.sectionsold = []
      if (res.unid) {
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
              }
              this.loadSecs.push(data);
              this.fields.push(data) //
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
      componentProps: { type: "action", data: this.btnBox, formdata: this.fields, unid: this.formID,tempid: this.templatid },
      translucent: true,
      cssClass: "custom-popover",
      mode: "md"
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

}

