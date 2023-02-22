import { addresseeUpdateAction } from '../../../store/addressee/actions';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADDRESSEE_ID_TYPE } from 'src/app/interfaces/addressee.interface';

@Component({
  selector: 'app-add-addressee-form',
  templateUrl: './add-addressee-form.component.html',
  styleUrls: ['./add-addressee-form.component.css'],
})
export class AddAddresseeFormComponent {
  @Output() onSubmit = new EventEmitter<void>();

  protected searchSelector: ADDRESSEE_ID_TYPE = ADDRESSEE_ID_TYPE.VatId;
  protected isSubmitEnabled: boolean = false;
  private value: string = '';

  protected addresseeIdType = ADDRESSEE_ID_TYPE;

  constructor(private store: Store) {}

  protected changeSearchSelector(selector: ADDRESSEE_ID_TYPE) {
    if (this.searchSelector === selector) {
      return;
    }
    this.searchSelector = selector;
    this.isSubmitEnabled = false;
  }

  protected searchInputKeyUp(value: string) {
    this.value = value.replace(/\D+/g, '');

    if (this.searchSelector === ADDRESSEE_ID_TYPE.Phone) {
      this.isSubmitEnabled = this.value.length === 11;
      return;
    }

    if (this.searchSelector === ADDRESSEE_ID_TYPE.VatId) {
      this.isSubmitEnabled = this.value.length >= 10;
      return;
    }
  }

  protected submit(): void {
    this.onSubmit.emit();

    this.store.dispatch(
      addresseeUpdateAction({
        idType: this.searchSelector,
        idValue: this.value,
      })
    );

    return;
  }
}
