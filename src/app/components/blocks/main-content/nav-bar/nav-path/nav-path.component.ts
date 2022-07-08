import { Component, OnInit } from '@angular/core';

const dummyPath = ['Главная', 'Добавление документа', 'test'];

@Component({
  selector: 'app-nav-path',
  templateUrl: './nav-path.component.html',
  styleUrls: ['./nav-path.component.css'],
})
export class NavPathComponent implements OnInit {
  public path = dummyPath;

  constructor() {}

  ngOnInit(): void {}
}
