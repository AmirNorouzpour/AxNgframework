import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoTreeComponent } from './geo-tree.component';

describe('GeoTreeComponent', () => {
  let component: GeoTreeComponent;
  let fixture: ComponentFixture<GeoTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
