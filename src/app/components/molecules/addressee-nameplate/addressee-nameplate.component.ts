import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addressee-nameplate',
  templateUrl: './addressee-nameplate.component.html',
  styleUrls: ['./addressee-nameplate.component.css'],
})
export class AddresseeNameplateComponent implements OnInit {
  @Input() name: string = 'Получатель';
  @Input() vatId: string | null = null;
  @Input() phone: string | null = null;

  @Output() clickRemoveButton = new EventEmitter<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {}

  public removeButtonClickHandler() {
    this.clickRemoveButton.emit();
  }
}
