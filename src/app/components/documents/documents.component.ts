import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent {
  @Output() onShowSignInfo = new EventEmitter<void>();

  constructor() {}

  public showSignInfo(): void {
    this.onShowSignInfo.emit();
  }
}
