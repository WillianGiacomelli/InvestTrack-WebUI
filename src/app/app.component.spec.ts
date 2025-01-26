import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';


describe('AppComponent', () => {
  let fixture!: ComponentFixture<AppComponent>;
  let component!: AppComponent;

  beforeEach(() => TestBed.configureTestingModule({
      imports: [AppComponent]
  }));

  it("should create the app",() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the "investtrack-webui" title', () => {

    fixture.detectChanges();

    expect(component.title).toEqual('investtrack-webui');
  });
});
