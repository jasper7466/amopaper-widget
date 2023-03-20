import { Component, HostBinding, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { signatureSelector } from 'src/app/store/signatures/selectors';

@Component({
  selector: 'app-modal-sign-info',
  templateUrl: './modal-sign-info.component.html',
  styleUrls: ['./modal-sign-info.component.css'],
})
export class ModalSignInfoComponent {
  @HostBinding('class.opened') isOpened = false;
  @Input() isLoading = false;

  protected signatures$ = this.store.select(signatureSelector);

  protected closeTrigger = new EventEmitter<void>();
  protected openTrigger = new EventEmitter<void>();

  constructor(private store: Store) {}

  protected okButtonHandler(): void {
    this.closeTrigger.emit();
  }

  public open(): void {
    this.openTrigger.emit();
  }

  public close(): void {
    this.closeTrigger.emit();
  }
}
