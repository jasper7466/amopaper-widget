import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-document-count-label',
  templateUrl: './document-count-label.component.html',
  styleUrls: ['./document-count-label.component.css'],
})
export class DocumentCountLabelComponent {
  @Input() public count: number;
  protected caption = 'untitled';
}
