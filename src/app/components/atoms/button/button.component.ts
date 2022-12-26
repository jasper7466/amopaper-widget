import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

export type ButtonStyleOption = 'solid' | 'blank' | 'skeleton';
type Color = 'regular' | 'danger' | 'custom';
type Icon = 'plus' | 'upload' | 'sign' | 'trash' | '';
type Size = 'medium' | 'custom';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() styleOption: ButtonStyleOption = 'solid';
  @Input() colorOption: Color = 'regular';
  @Input() iconOption: Icon = '';
  @Input() sizeOption: Size = 'medium';
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
