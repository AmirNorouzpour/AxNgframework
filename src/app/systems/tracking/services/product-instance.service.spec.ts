import { TestBed } from '@angular/core/testing';

import { ProductInstanceService } from './product-instance.service';

describe('ProductInstanceService', () => {
  let service: ProductInstanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInstanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
