import { Component } from '@angular/core';
import { DashboardBehaviorService } from '../../services/dashboardBehavior.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
    public dashboardBehaviorService: DashboardBehaviorService
  ) { }

  ngOnInit() {
  }

}
