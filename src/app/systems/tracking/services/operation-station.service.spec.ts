import { TestBed } from '@angular/core/testing';

import { OperationStationService } from './operation-station.service';

describe('OperationStationService', () => {
  let service: OperationStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
