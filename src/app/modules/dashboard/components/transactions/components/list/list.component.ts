import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() transactions: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
