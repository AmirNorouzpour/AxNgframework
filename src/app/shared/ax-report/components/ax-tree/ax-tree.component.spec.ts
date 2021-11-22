import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxTreeComponent } from './ax-tree.component';

describe('AxTreeComponent', () => {
  let component: AxTreeComponent;
  let fixture: ComponentFixture<AxTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
