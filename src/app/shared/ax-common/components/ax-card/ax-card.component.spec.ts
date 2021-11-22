import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxCardComponent } from './ax-card.component';

describe('AxCardComponent', () => {
  let component: AxCardComponent;
  let fixture: ComponentFixture<AxCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
