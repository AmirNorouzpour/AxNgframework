import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxChatContactsListComponent } from './ax-chat-contacts-list.component';

describe('AxChatContactsListComponent', () => {
  let component: AxChatContactsListComponent;
  let fixture: ComponentFixture<AxChatContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxChatContactsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxChatContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
