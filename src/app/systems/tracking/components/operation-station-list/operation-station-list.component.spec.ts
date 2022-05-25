import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationStationListComponent } from './operation-station-list.component';

describe('OperationStationListComponent', () => {
  let component: OperationStationListComponent;
  let fixture: ComponentFixture<OperationStationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationStationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationStationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
