import { Component, Input } from '@angular/core';
import { TSignatureInfo } from 'src/app/interfaces/signature-info.type';

@Component({
  selector: 'app-sing-info-item',
  templateUrl: './sing-info-item.component.html',
  styleUrls: ['./sing-info-item.component.css'],
})
export class SingInfoItemComponent {
  @Input() signature: TSignatureInfo;

  protected isFolded: boolean = false;

  protected fold(): void {
    this.isFolded = !this.isFolded;
  }
}
