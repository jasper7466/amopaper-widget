import { declension } from 'src/utils/declension';
import { Component, Input, OnInit } from '@angular/core';

const captionVariants: [string, string, string] = [
  'документ',
  'документа',
  'документов',
];

@Component({
  selector: 'app-document-count-label',
  templateUrl: './document-count-label.component.html',
  styleUrls: ['./document-count-label.component.css'],
})
export class DocumentCountLabelComponent implements OnInit {
  @Input() count: number | null = null;
  public caption: string = 'untitled';

  constructor() {}

  ngOnInit(): void {
    if (this.count !== null) {
      this.caption = declension(this.count, ...captionVariants);
    }
  }
}
