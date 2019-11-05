import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFromPage } from './create-from.page';

describe('CreateFromPage', () => {
  let component: CreateFromPage;
  let fixture: ComponentFixture<CreateFromPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFromPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFromPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
