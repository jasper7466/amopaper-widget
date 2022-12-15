import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uploads-foldable-list',
  templateUrl: './uploads-foldable-list.component.html',
  styleUrls: ['./uploads-foldable-list.component.css'],
})
export class UploadsFoldableListComponent {
  @Input() loadedCount: number;
  @Input() totalCount: number;
  @Output() onClear = new EventEmitter<void>();

  protected isFolded = false;

  constructor() {}

  protected fold(): void {
    this.isFolded = !this.isFolded;
  }

  protected clear(): void {
    this.onClear.emit();
  }
}
