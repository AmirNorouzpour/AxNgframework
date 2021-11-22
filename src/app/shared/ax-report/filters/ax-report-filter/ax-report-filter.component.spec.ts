import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxReportFilterComponent } from './ax-report-filter.component';

describe('AxReportFilterComponent', () => {
  let component: AxReportFilterComponent;
  let fixture: ComponentFixture<AxReportFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxReportFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxReportFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
