import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent implements OnInit {
  public isFolded = false;

  constructor() {}

  ngOnInit(): void {}

  onFold(): void {
    this.isFolded = !this.isFolded;
  }
}
