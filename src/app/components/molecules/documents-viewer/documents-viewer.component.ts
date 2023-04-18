import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-documents-viewer',
    templateUrl: './documents-viewer.component.html',
    styleUrls: ['./documents-viewer.component.css'],
})
export class DocumentsViewerComponent {
    @Input()
    public caption: string;
}
