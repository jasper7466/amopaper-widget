import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-documents-displayer',
  templateUrl: './documents-displayer.component.html',
  styleUrls: ['./documents-displayer.component.css'],
})
export class DocumentsDisplayerComponent {
  @Input() caption: string;
}
