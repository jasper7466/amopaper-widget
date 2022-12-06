import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-count-label',
  templateUrl: './document-count-label.component.html',
  styleUrls: ['./document-count-label.component.css'],
})
export class DocumentCountLabelComponent {
  @Input() count: number;
  public caption: string = 'untitled';

  constructor() {}
}
