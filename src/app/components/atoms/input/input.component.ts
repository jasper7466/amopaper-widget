import { Component, EventEmitter, Input, Output } from '@angular/core';

type TTooltip = 'tooltip' | null;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() tooltipOption: TTooltip = null;
  @Input() mask = '';
  @Input() type = 'text';
  @Input() maskPrefix = '';

  @Output()
  keyUp = new EventEmitter<string>();

  protected inputKeyUpHandler(value: string): void {
    this.keyUp.emit(value);
  }
}
