import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupUsersFormComponent } from './group-users-form.component';

describe('GroupUsersFormComponent', () => {
  let component: GroupUsersFormComponent;
  let fixture: ComponentFixture<GroupUsersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupUsersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
