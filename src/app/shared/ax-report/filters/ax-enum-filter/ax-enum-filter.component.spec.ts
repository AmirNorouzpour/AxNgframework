import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxEnumFilterComponent } from './ax-enum-filter.component';

describe('AxEnumFilterComponent', () => {
  let component: AxEnumFilterComponent;
  let fixture: ComponentFixture<AxEnumFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxEnumFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxEnumFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
