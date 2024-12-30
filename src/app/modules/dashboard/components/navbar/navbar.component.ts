import { Component } from '@angular/core';
import { DashboardBehaviorService } from '../../services/dashboardBehavior.service';
import { UserAuthenticationService } from '../../../../shared/services/userAuthentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
      public dashboardBehaviorService: DashboardBehaviorService,
      private userAuthenticationService: UserAuthenticationService
  ){

  }
  public logout(): void {
    this.userAuthenticationService.logout();
  }
}
