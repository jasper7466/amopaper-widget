import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}
}
