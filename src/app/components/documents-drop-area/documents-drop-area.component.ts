import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-documents-drop-area',
  templateUrl: './documents-drop-area.component.html',
  styleUrls: ['./documents-drop-area.component.css'],
})
export class DocumentsDropAreaComponent implements OnInit {
  constructor(public filesService: FilesService) {}

  ngOnInit(): void {}
}
