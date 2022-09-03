import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

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
  @Input() styleOption: style = 'solid';
  @Input() colorOption: color = 'regular';
  @Input() iconOption: icon = '';
  @Input() sizeOption: size = 'medium';
  @Input() isEnabled: boolean = true;
  @Input() typeOption: string = 'button';

  @Output()
  onClick = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  clickHandler() {
    this.onClick.emit();
  }
}
