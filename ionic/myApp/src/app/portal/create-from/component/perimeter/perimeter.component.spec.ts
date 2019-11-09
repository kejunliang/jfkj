import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerimeterComponent } from './perimeter.component';

describe('PerimeterComponent', () => {
  let component: PerimeterComponent;
  let fixture: ComponentFixture<PerimeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerimeterComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerimeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
