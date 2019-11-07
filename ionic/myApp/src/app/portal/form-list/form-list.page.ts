import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.page.html',
  styleUrls: ['./form-list.page.scss'],
})
export class FormListPage implements OnInit {
  public data=[
    {"name":"test1"},
    {"name":"test2"},
    {"name":"test3"},
    {"name":"test4"}
  ]
  constructor() { }

  ngOnInit() {
  }

}
