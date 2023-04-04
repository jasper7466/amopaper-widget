import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export class DragAndDropDirective {
  @Input() public fileOverClass = '';
  @HostBinding('class') protected get class() {
    return this._fileOver ? this.fileOverClass : '';
  }
  @Output() protected fileDropped = new EventEmitter<FileList>();

  private _fileOver = false;

  @HostListener('dragover', ['$event']) protected onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._fileOver = true;
  }

  @HostListener('dragleave', ['$event']) protected onDragLeave(
    event: DragEvent
  ) {
    event.preventDefault();
    event.stopPropagation();
    this._fileOver = false;
  }

  @HostListener('drop', ['$event']) protected onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this._fileOver = false;

    const files = event.dataTransfer?.files;

    if (files?.length) {
      this.fileDropped.emit(files);
    }
  }
}
