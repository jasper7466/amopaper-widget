import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type tooltip = 'tooltip' | null;

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() tooltipOption: tooltip = null;
  @Input() mask: string = '';
  @Input() type: string = 'text';
  @Input() maskPrefix: string = '';

  @Output()
  onKeyUp = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  inputKeyUpHandler(value: string) {
    this.onKeyUp.emit(value);
  }
}
