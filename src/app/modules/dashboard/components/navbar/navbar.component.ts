import { Component } from '@angular/core';
import { DashboardBehaviorService } from '../../services/dashboardBehavior.service';
import { UserAuthenticationService } from '../../../../shared/services/userAuthentication.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
      public dashboardBehaviorService: DashboardBehaviorService,
      public userAuthenticationService: UserAuthenticationService,
      public router: Router
  ){

  }
  public logout(): void {
    Swal.fire({
      title: 'Deseja realmente sair?',
      showCancelButton: true,
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Sim`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (!!result.isConfirmed) {
        this.router.navigate(['']);
        this.userAuthenticationService.logout();
      }
    })
  }
}
