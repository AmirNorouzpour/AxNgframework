import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxBooleanFilterComponent } from './ax-boolean-filter.component';

describe('AxBooleanFilterComponent', () => {
  let component: AxBooleanFilterComponent;
  let fixture: ComponentFixture<AxBooleanFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxBooleanFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxBooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
