import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyViewPage } from './my-view.page';

describe('MyViewPage', () => {
  let component: MyViewPage;
  let fixture: ComponentFixture<MyViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
