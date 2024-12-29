import { UserAuthenticationService } from './../../../../../shared/services/userAuthentication.service';
import { ThemeService } from './../../../services/theme.service';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled: boolean = false;
  isDarkTheme: boolean = false;

  constructor(
    public themeService:ThemeService,
    public userAuthenticationService: UserAuthenticationService
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  ngOnInit() {
    this.userAuthenticationService.isUserAuthenticated
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

}
