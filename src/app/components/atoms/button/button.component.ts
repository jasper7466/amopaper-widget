import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonStyleOption = 'solid' | 'blank' | 'skeleton';
type TColor = 'regular' | 'danger' | 'custom';
type TIcon = 'plus' | 'upload' | 'sign' | 'trash' | '';
type TSize = 'medium' | 'custom';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() styleOption: ButtonStyleOption = 'solid';
  @Input() colorOption: TColor = 'regular';
  @Input() iconOption: TIcon = '';
  @Input() sizeOption: TSize = 'medium';
  @Input() isEnabled = true;
  @Input() typeOption = 'button';

  @Output() Click = new EventEmitter<void>();

  protected clickHandler(): void {
    this.Click.emit();
  }
}
