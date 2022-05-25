import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInstanceListComponent } from './product-instance-list.component';

describe('ProductInstanceListComponent', () => {
  let component: ProductInstanceListComponent;
  let fixture: ComponentFixture<ProductInstanceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInstanceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
