import {
  addresseeNameSelector,
  addresseePhoneSelector,
  addresseeVatIdSelector,
  isAddresseeAddedSelector,
} from '../../../store/addressee/selectors';
import { resetAddresseeAction } from '../../../store/addressee/actions';
import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ModalComponent } from '../../templates/modal/modal.component';

@Component({
  selector: 'app-addressee-selector',
  templateUrl: './addressee-selector.component.html',
  styleUrls: ['./addressee-selector.component.css'],
})
export class AddresseeSelectorComponent {
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  addresseeName$ = this.store.select(addresseeNameSelector);
  addresseePhone$ = this.store.select(addresseePhoneSelector);
  addresseeVatId$ = this.store.select(addresseeVatIdSelector);

  constructor(private store: Store) {}

  public removeAddresseeHandler(): void {
    this.store.dispatch(resetAddresseeAction());
  }
}
