import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OhlcLegendComponent } from './ohlc-legend.component';

describe('OhlcLegendComponent', () => {
  let component: OhlcLegendComponent;
  let fixture: ComponentFixture<OhlcLegendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OhlcLegendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OhlcLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
