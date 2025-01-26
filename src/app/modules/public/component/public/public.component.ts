import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../../shared/services/userAuthentication.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

}
