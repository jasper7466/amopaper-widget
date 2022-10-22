import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  @Output() onShowSignInfo = new EventEmitter<void>();

  stepName$ = this.store.select(stepNameSelector);
  isEditable$ = this.stepName$.pipe(map((step) => step === null));

  constructor(private store: Store) {}

  public showSignInfo(): void {
    this.onShowSignInfo.emit();
  }

  ngOnInit(): void {}
}
