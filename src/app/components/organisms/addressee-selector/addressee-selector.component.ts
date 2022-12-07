import {
  addresseeNameSelector,
  addresseePhoneSelector,
  addresseeVatIdSelector,
  isAddresseeAddedSelector,
} from '../../../store/addressee/selectors';
import { resetAddresseeAction } from '../../../store/addressee/actions';
import { Component, ViewChild, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../../templates/modal/modal.component';

@Component({
  selector: 'app-addressee-selector',
  templateUrl: './addressee-selector.component.html',
  styleUrls: ['./addressee-selector.component.css'],
})
export class AddresseeSelectorComponent {
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;

  protected openModalEmitter: EventEmitter<void> = new EventEmitter<void>();
  protected closeModalEmitter: EventEmitter<void> = new EventEmitter<void>();

  protected isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  protected addresseeName$ = this.store.select(addresseeNameSelector);
  protected addresseePhone$ = this.store.select(addresseePhoneSelector);
  protected addresseeVatId$ = this.store.select(addresseeVatIdSelector);

  constructor(private store: Store) {}

  public removeAddressee(): void {
    this.store.dispatch(resetAddresseeAction());
  }

  public showSelectorModal(): void {
    this.openModalEmitter.emit();
  }

  public hideSelectorModal(): void {
    this.closeModalEmitter.emit();
  }
}
