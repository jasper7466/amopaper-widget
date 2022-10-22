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
  @Input() count: string = '0';
  public caption: string = 'untitled';
  public parsed: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.parsed = parseInt(this.count);
    this.caption = declension(this.parsed, ...captionVariants);
  }
}
