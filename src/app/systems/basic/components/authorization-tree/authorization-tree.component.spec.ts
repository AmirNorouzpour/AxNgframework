import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationTreeComponent } from './authorization-tree.component';

describe('AuthorizationTreeComponent', () => {
  let component: AuthorizationTreeComponent;
  let fixture: ComponentFixture<AuthorizationTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
