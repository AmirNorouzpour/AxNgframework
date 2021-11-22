import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxDashboardComponent } from './ax-dashboard.component';

describe('AxDashboardComponent', () => {
  let component: AxDashboardComponent;
  let fixture: ComponentFixture<AxDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
