import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryFormComponent } from './factory-form.component';

describe('FactoryFormComponent', () => {
  let component: FactoryFormComponent;
  let fixture: ComponentFixture<FactoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
