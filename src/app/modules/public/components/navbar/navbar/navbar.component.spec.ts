/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { UserAuthenticationService } from '../../../../../shared/services/userAuthentication.service';

class MockUserAuthenticationService {
  isUserAuthenticated = false;
  getUserAuthenticated = { name: 'John Doe' };
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let mockAuthService: MockUserAuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [
        { provide: UserAuthenticationService, useClass: MockUserAuthenticationService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(UserAuthenticationService) as MockUserAuthenticationService;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the brand name correctly', () => {
    const brand: DebugElement = fixture.debugElement.query(By.css('.navbar-brand'));
    expect(brand.nativeElement.textContent).toContain('INVESTTRACK');
  });

  it('should display login button if user is not authenticated', () => {
    mockAuthService.isUserAuthenticated = false;
    fixture.detectChanges();

    const loginButton = fixture.debugElement.query(By.css('.btn-personalized'));
    expect(loginButton.nativeElement.textContent).toContain('Login');
  });

  it('should display user name if user is authenticated', () => {
    mockAuthService.isUserAuthenticated = true;
    fixture.detectChanges();

    const userButton = fixture.debugElement.query(By.css('.btn-personalized'));
    expect(userButton.nativeElement.textContent).toContain('John');
  });

  it('should toggle the theme when the switch is clicked', () => {
    const themeSwitch = fixture.debugElement.query(By.css('#themeSwitch'));
    const toggleThemeSpy = jest.spyOn(component, 'toggleTheme');

    themeSwitch.triggerEventHandler('change', null);
    expect(toggleThemeSpy).toHaveBeenCalled();
  });

  it('should add "navbar-scrolled" class when isScrolled is true', () => {
    component.isScrolled = true;
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar.classes['navbar-scrolled']).toBe(true);
  });

  it('should not add "navbar-scrolled" class when isScrolled is false', () => {
    component.isScrolled = false;
    fixture.detectChanges();

    const navbar = fixture.debugElement.query(By.css('.navbar'));
    expect(navbar.classes['navbar-scrolled']).toBeFalsy();
  });
});
