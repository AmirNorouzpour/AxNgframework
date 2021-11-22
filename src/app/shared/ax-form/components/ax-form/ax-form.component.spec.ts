import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxFormComponent } from './ax-form.component';

describe('AxFormComponent', () => {
  let component: AxFormComponent;
  let fixture: ComponentFixture<AxFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
