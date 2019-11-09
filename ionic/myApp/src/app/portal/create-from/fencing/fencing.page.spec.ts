import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FencingPage } from './fencing.page';

describe('FencingPage', () => {
  let component: FencingPage;
  let fixture: ComponentFixture<FencingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FencingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FencingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
