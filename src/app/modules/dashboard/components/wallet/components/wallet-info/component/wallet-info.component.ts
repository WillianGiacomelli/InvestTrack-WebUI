import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wallet-info',
  templateUrl: './wallet-info.component.html',
  styleUrls: ['./wallet-info.component.scss']
})
export class WalletInfoComponent implements OnInit {
  public options: any = {
    edit: false,
    delete: false,
    add: true,
  }
  constructor() { }

  ngOnInit() {
  }

}
