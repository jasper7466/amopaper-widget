import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-documents-displayer',
  templateUrl: './documents-displayer.component.html',
  styleUrls: ['./documents-displayer.component.css'],
})
export class DocumentsDisplayerComponent {
  @Output() onShowSignInfo = new EventEmitter<void>();

  constructor() {}

  public showSignInfo(): void {
    this.onShowSignInfo.emit();
  }
}
