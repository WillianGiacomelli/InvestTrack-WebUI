import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrl: './asset-item.component.scss'
})
export class AssetItemComponent {
  @Input() assets: any;
  @Input() isLoading: boolean = true;
  @Input() isUp: boolean = true;
}
