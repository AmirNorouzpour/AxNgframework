import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxDateFilterComponent } from './ax-date-filter.component';

describe('AxDateFilterComponent', () => {
  let component: AxDateFilterComponent;
  let fixture: ComponentFixture<AxDateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxDateFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxDateFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
