import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationDetailV2Component } from './operation-detail-v2.component';

describe('OperationDetailV2Component', () => {
  let component: OperationDetailV2Component;
  let fixture: ComponentFixture<OperationDetailV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationDetailV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationDetailV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
