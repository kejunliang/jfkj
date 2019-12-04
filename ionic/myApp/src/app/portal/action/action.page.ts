import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { CreateFromService } from '../../services/create-from/create-from.service';
@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {
  public list:any=[
  ];
  public isShowBtn:boolean=false;
  public btnBox: any = [
    'Save', 'Submit', 'Cancel'
  ];
  public actionList:any=[];
  constructor(public getActionSerice: CreateFromService, private storage:Storage) { }

  ngOnInit() {
    this.actionList=[
      {
        FormMR: "ShiJun Tian",
        ParentDocument: "/0/A7FE4624DF821F4C482584BE001C0CB7",
        ActionTitle: "New Action button testing",
        Attachment: [ ],
        EmployeeAssigned: [
        "ShiJun Tian"
        ],
        Priority: "Minor",
        DocRefNumber: "DTC-1119-0004-ACT-001",
        WFStatus: "Open",
        AuditTrail: "***** Created by ShiJun Tian on 19-11-27 上午6:53 ***** ",
        DueDate: "0002/11/30",
        ParentDocumentRefNo: "DTC-1119-0004",
        Description: "created from New Action button"
        },
        {
          FormMR: "ShiJun Tian",
          ParentDocument: "/0/A7FE4624DF821F4C482584BE001C0CB7",
          ActionTitle: "New Action button testing",
          Attachment: [ ],
          EmployeeAssigned: [
          "ShiJun Tian"
          ],
          Priority: "Minor",
          DocRefNumber: "DTC-1119-0004-ACT-001",
          WFStatus: "Open",
          AuditTrail: "***** Created by ShiJun Tian on 19-11-27 上午6:53 ***** ",
          DueDate: "0002/11/30",
          ParentDocumentRefNo: "DTC-1119-0004",
          Description: "created from New Action button"
          }
    ];
    this.actionList.forEach(item => {
      item.EmployeeAssigned=item.EmployeeAssigned.join(',');
      let obj={"show":false}
      this.list.push(obj)
    });
  //   this.storage.get("loginDetails").then(data=>{
  //     console.log(data)
  //    this.getActionSerice.getAction(data,'1A9D2024BB1EA9E4482584BE007DBC3E').pipe(first()).subscribe(
  //      data => {
  //        console.log(data)
  //       this.actionList=data;
  //       this.actionList.forEach(item => {
  //         item.EmployeeAssigned=item.EmployeeAssigned.join(',')
  //       });
  //      }
  //    )
  //  })
  }
  getBtnPopover() {
    console.log(11)
    this.isShowBtn = !this.isShowBtn;
  }
}
