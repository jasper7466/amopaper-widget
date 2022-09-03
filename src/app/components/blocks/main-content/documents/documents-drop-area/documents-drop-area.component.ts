import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-documents-drop-area',
  templateUrl: './documents-drop-area.component.html',
  styleUrls: ['./documents-drop-area.component.css'],
})
export class DocumentsDropAreaComponent implements OnInit {
  @ViewChild('fileInputRef', { static: false }) fileInput: ElementRef;
  constructor() {}

  ngOnInit(): void {}

  fileDropHandler(files: FileList) {
    this.filesProcessor(files);
  }

  fileBrowserHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    const files = (<HTMLInputElement>event.target).files;
    this.filesProcessor(files);
  }

  filesProcessor(files: FileList | null) {
    if (!files) {
      return;
    }
  }
}
