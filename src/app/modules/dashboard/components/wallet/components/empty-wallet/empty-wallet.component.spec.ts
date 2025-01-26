/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EmptyWalletComponent } from './empty-wallet.component';

describe('EmptyWalletComponent', () => {
  let component: EmptyWalletComponent;
  let fixture: ComponentFixture<EmptyWalletComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
