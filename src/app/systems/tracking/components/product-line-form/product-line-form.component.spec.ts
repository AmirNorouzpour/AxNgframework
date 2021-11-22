import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLineFormComponent } from './product-line-form.component';

describe('ProductLineFormComponent', () => {
  let component: ProductLineFormComponent;
  let fixture: ComponentFixture<ProductLineFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLineFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
