import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appFileBrowser]',
})
export class FileBrowserDirective {
  @Output() changedEmitter = new EventEmitter<FileList>();

  constructor(private _hostRef: ElementRef) {}

  @HostListener('change', ['$event']) onChange(event: InputEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = (<HTMLInputElement>event.target).files;

    if (files?.length) {
      this.changedEmitter.emit(files);
    }

    this._hostRef.nativeElement.value = '';
  }
}
