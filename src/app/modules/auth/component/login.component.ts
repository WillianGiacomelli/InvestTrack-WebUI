import { Component, OnInit } from '@angular/core';
import { AuthBehaviorService } from '../services/authBehavior.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public loginService:AuthBehaviorService,
  ) { }


  ngOnInit() {
  }

}
