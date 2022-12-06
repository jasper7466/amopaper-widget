import { Component, Input, OnInit } from '@angular/core';

type direction = 'left' | 'right' | 'up' | 'down' | '';
type color = 'gray' | 'black' | 'primary' | '';

@Component({
  selector: 'app-arrow',
  templateUrl: './arrow.component.html',
  styleUrls: ['./arrow.component.css'],
})
export class ArrowComponent implements OnInit {
  @Input() direction: direction = 'left';
  @Input() color: color = 'gray';

  constructor() {}

  ngOnInit(): void {}
}
