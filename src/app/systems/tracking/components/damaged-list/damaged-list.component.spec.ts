import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagedListComponent } from './damaged-list.component';

describe('DamagedListComponent', () => {
  let component: DamagedListComponent;
  let fixture: ComponentFixture<DamagedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DamagedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
