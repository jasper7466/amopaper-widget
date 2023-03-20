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
  @Input() fileOverClass = '';
  @HostBinding('class') get class() {
    return this.fileOver ? this.fileOverClass : '';
  }
  @Output() fileDropped = new EventEmitter<FileList>();

  fileOver = false;

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;

    const files = event.dataTransfer?.files;

    if (files?.length) {
      this.fileDropped.emit(files);
    }
  }
}
