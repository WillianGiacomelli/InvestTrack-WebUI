/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { DashboardBehaviorService } from './dashboardBehavior.service';

describe('Service: DashboardBehavior', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardBehaviorService]
    });
  });

  it('should ...', inject([DashboardBehaviorService], (service: DashboardBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
