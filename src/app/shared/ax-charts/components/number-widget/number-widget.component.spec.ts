import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberWidgetComponent } from './number-widget.component';

describe('NumberWidgetComponent', () => {
  let component: NumberWidgetComponent;
  let fixture: ComponentFixture<NumberWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
