import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsV2Component } from './bills-v2.component';

describe('BillsV2Component', () => {
  let component: BillsV2Component;
  let fixture: ComponentFixture<BillsV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
