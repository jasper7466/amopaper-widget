import { Component, Input, OnInit } from '@angular/core';
import { StatusLabelStatus } from 'src/app/components/common/status-label/status-label.component';

@Component({
  selector: 'app-documents-item',
  templateUrl: './documents-item.component.html',
  styleUrls: ['./documents-item.component.css'],
})
export class DocumentsItemComponent implements OnInit {
  @Input() fileName: string = '';
  @Input() signStatus: StatusLabelStatus = '';

  constructor() {}

  ngOnInit(): void {}
}
