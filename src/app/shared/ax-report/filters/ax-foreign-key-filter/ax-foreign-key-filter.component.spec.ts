import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxForeignKeyFilterComponent } from './ax-foreign-key-filter.component';

describe('AxForeignKeyFilterComponent', () => {
  let component: AxForeignKeyFilterComponent;
  let fixture: ComponentFixture<AxForeignKeyFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxForeignKeyFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxForeignKeyFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
