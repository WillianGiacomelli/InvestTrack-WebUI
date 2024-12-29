import { Component } from '@angular/core';
import { DashboardBehaviorService } from '../../services/dashboardBehavior.service';
import { UserAuthenticationService } from '../../../../shared/services/userAuthentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public isMenuCollapsed: boolean = true;
  constructor(
    public dashboardBehaviorService: DashboardBehaviorService,
    private userAuthenticationService: UserAuthenticationService
  ) { }

  ngOnInit() {
  }

  public logout(): void {
    this.userAuthenticationService.logout();
  }

}
