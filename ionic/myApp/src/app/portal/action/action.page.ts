import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {
  public list:any=[
    {"show":true}
  ];
  public isShowBtn:boolean;
  public btnBox: any = [
    'Save', 'Submit', 'Cancel'
  ];
  public actionList:any=[];
  constructor() { }

  ngOnInit() {
    this.actionList=[
      {
        ParentDocument: "/0/A7FE4624DF821F4C482584BE001C0CB7",
        ActionTitle: "New Action button testing",
        Attachment: [ ],
        EmployeeAssigned: [
        "ShiJun Tian"
        ],
        Priority: "Minor",
        DocRefNumber: "DTC-1119-0004-ACT-001",
        AuditTrail: "***** Created by ShiJun Tian on 19-11-27 上午6:53 ***** ",
        DueDate: "0002/11/30",
        Description: "created from New Action button"
        },
        {
          ParentDocument: "/0/A7FE4624DF821F4C482584BE001C0CB7",
          ActionTitle: "New Action button testing",
          Attachment: [ ],
          EmployeeAssigned: [
          "ShiJun Tian"
          ],
          Priority: "Minor",
          DocRefNumber: "DTC-1119-0004-ACT-001",
          AuditTrail: "***** Created by ShiJun Tian on 19-11-27 上午6:53 ***** ",
          DueDate: "0002/11/30",
          Description: "created from New Action button"
          }
    ]
    this.actionList.forEach(item => {
      item.EmployeeAssigned=item.EmployeeAssigned.join(',')
    });
  }
  getBtnPopover() {
    console.log(11)
    this.isShowBtn = true;
  }
}
