import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-addressee-nameplate',
  templateUrl: './addressee-nameplate.component.html',
  styleUrls: ['./addressee-nameplate.component.css'],
})
export class AddresseeNameplateComponent {
  @Input() name: string = 'Получатель';
  @Input() vatId: string | null = null;
  @Input() phone: string | null = null;

  @Output() clickRemoveButton = new EventEmitter<void>();

  constructor() {}

  protected removeButtonClickHandler() {
    this.clickRemoveButton.emit();
  }
}
