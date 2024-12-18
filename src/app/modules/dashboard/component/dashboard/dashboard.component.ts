import { Component } from '@angular/core';
import { DashboardBehaviorService } from '../../services/dashboardBehavior.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public isMenuCollapsed: boolean = true;
  constructor(
    public dashboardBehaviorService: DashboardBehaviorService
  ) { }

  ngOnInit() {
  }

}
