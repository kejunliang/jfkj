import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastreleasePage } from './lastrelease.page';

describe('LastreleasePage', () => {
  let component: LastreleasePage;
  let fixture: ComponentFixture<LastreleasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastreleasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastreleasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
