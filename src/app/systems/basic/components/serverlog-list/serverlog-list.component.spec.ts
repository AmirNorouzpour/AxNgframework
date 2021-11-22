import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerlogListComponent } from './serverlog-list.component';

describe('ServerlogListComponent', () => {
  let component: ServerlogListComponent;
  let fixture: ComponentFixture<ServerlogListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerlogListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
