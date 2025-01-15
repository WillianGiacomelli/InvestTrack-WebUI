/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActionBehaviorService } from './action-behavior.service';

describe('Service: ActionBehavior', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActionBehaviorService]
    });
  });

  it('should ...', inject([ActionBehaviorService], (service: ActionBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
