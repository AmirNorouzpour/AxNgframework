import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStationFormComponent } from './operation-station-form.component';

describe('OperationStationFormComponent', () => {
  let component: OperationStationFormComponent;
  let fixture: ComponentFixture<OperationStationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationStationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationStationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
