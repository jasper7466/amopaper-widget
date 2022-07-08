import { Component, Input, OnInit } from '@angular/core';

type animation = 'rotation' | '';
type icon = 'preparing' | 'awaiting' | 'signing' | '';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
})
export class PreloaderComponent implements OnInit {
  @Input() animationOption: animation = '';
  @Input() iconOption: icon = '';
  constructor() {}

  ngOnInit(): void {}
}
