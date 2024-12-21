/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockSectionComponent } from './stock-section.component';

describe('StockSectionComponent', () => {
  let component: StockSectionComponent;
  let fixture: ComponentFixture<StockSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
