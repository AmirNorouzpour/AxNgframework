import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AxChatContainerComponent } from './ax-chat-container.component';

describe('AxChatContainerComponent', () => {
  let component: AxChatContainerComponent;
  let fixture: ComponentFixture<AxChatContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AxChatContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AxChatContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
