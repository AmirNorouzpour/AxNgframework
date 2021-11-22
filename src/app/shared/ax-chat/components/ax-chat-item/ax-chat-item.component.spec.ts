import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxChatItemComponent } from './ax-chat-item.component';

describe('AxChatItemComponent', () => {
  let component: AxChatItemComponent;
  let fixture: ComponentFixture<AxChatItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxChatItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxChatItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
