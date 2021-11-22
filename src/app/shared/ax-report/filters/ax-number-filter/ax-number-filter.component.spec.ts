import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxNumberFilterComponent } from './ax-number-filter.component';

describe('AxNumberFilterComponent', () => {
  let component: AxNumberFilterComponent;
  let fixture: ComponentFixture<AxNumberFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxNumberFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxNumberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
