import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-empty-transactions',
  templateUrl: './empty-transactions.component.html',
  styleUrls: ['./empty-transactions.component.scss']
})
export class EmptyTransactionsComponent implements OnInit {
  public options: any = {
    edit: false,
    delete: false,
    add: true,
  }
  constructor() { }

  ngOnInit() {
  }

}
