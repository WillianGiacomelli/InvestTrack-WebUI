import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-crypto-item',
  templateUrl: './crypto-item.component.html',
  styleUrl: './crypto-item.component.scss'
})
export class CryptoItemComponent {
  @Input() groupedCryptos: any;
  @Input() isLoading: boolean = true;
}
