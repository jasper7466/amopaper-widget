import { Component, Input, OnInit } from '@angular/core';

type style = 'solid' | 'blank' | 'skeleton';
type color = 'regular' | 'danger' | 'custom';
type icon = 'plus' | 'upload' | 'sign' | 'trash' | '';
type size = 'medium' | 'custom';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() caption?: string;
  @Input() styleOption: style = 'solid';
  @Input() colorOption: color = 'regular';
  @Input() iconOption: icon = '';
  @Input() sizeOption: size = 'medium';

  constructor() {}

  ngOnInit(): void {}
}
