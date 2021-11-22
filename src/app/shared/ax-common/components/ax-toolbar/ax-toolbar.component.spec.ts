import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxToolbarComponent } from './ax-toolbar.component';

describe('AxToolbarComponent', () => {
  let component: AxToolbarComponent;
  let fixture: ComponentFixture<AxToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
