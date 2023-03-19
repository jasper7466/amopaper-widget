import { Component, EventEmitter, Input, Output } from '@angular/core';

type TTooltip = 'tooltip' | null;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() tooltipOption: TTooltip = null;
  @Input() mask: string = '';
  @Input() type: string = 'text';
  @Input() maskPrefix: string = '';

  @Output()
  onKeyUp = new EventEmitter<string>();

  protected inputKeyUpHandler(value: string): void {
    this.onKeyUp.emit(value);
  }
}
