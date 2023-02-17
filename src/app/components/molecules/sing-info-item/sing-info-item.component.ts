import { Component, Input } from '@angular/core';
import { SignatureInfo } from 'src/app/store/signatures';

@Component({
  selector: 'app-sing-info-item',
  templateUrl: './sing-info-item.component.html',
  styleUrls: ['./sing-info-item.component.css'],
})
export class SingInfoItemComponent {
  @Input() signature: SignatureInfo;

  protected isFolded: boolean = false;

  protected fold(): void {
    this.isFolded = !this.isFolded;
  }
}
