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
    @Output()
    protected changedEmitter = new EventEmitter<FileList>();

    constructor(private _hostReference: ElementRef) {}

    @HostListener('change', ['$event'])
    private onChange(
        event: InputEvent
    ): void {
        event.preventDefault();
        event.stopPropagation();

        const files = (<HTMLInputElement>event.target).files;

        if (files?.length) {
            this.changedEmitter.emit(files);
        }

        this._hostReference.nativeElement.value = '';
    }
}
