import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoItemComponent } from './crypto-item.component';

describe('CryptoItemComponent', () => {
  let component: CryptoItemComponent;
  let fixture: ComponentFixture<CryptoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CryptoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
