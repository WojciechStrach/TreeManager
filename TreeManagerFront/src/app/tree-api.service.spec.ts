import { TestBed, inject } from '@angular/core/testing';

import { TreeApiService } from './tree-api.service';

describe('TreeApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeApiService]
    });
  });

  it('should be created', inject([TreeApiService], (service: TreeApiService) => {
    expect(service).toBeTruthy();
  }));
});
