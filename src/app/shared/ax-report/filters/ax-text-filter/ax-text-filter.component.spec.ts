import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxTextFilterComponent } from './ax-text-filter.component';

describe('AxTextFilterComponent', () => {
  let component: AxTextFilterComponent;
  let fixture: ComponentFixture<AxTextFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxTextFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxTextFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
