import { Component, OnInit, Input } from '@angular/core';
import { SignatureInfo } from 'src/app/services/api/nopaper-api/nopaper-api.types';

@Component({
  selector: 'app-sing-info-item',
  templateUrl: './sing-info-item.component.html',
  styleUrls: ['./sing-info-item.component.css'],
})
export class SingInfoItemComponent implements OnInit {
  @Input() signature: SignatureInfo;

  protected isFolded: boolean = false;

  ngOnInit() {
    // this.isFolded = true;
  }

  constructor() {}

  protected fold(): void {
    this.isFolded = !this.isFolded;
  }
}
