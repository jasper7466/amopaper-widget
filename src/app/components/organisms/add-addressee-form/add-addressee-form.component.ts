import {
  addresseeSubmitAction,
  addresseeUpdateAction,
} from '../../../store/addressee/actions';
import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ADDRESSEE_ID_TYPE } from 'src/app/interfaces/addressee.interface';

@Component({
  selector: 'app-add-addressee-form',
  templateUrl: './add-addressee-form.component.html',
  styleUrls: ['./add-addressee-form.component.css'],
})
export class AddAddresseeFormComponent {
  @Output() protected submitEmitter = new EventEmitter<void>();

  protected searchSelector: ADDRESSEE_ID_TYPE = ADDRESSEE_ID_TYPE.VatId;
  protected isSubmitEnabled = false;
  private _value = '';

  protected addresseeIdType = ADDRESSEE_ID_TYPE;

  constructor(private _store$: Store) {}

  protected changeSearchSelector(selector: ADDRESSEE_ID_TYPE): void {
    if (this.searchSelector === selector) {
      return;
    }
    this.searchSelector = selector;
    this.isSubmitEnabled = false;
  }

  protected searchInputKeyUp(value: string): void | never {
    this._value = value.replace(/\D+/g, '');

    switch (this.searchSelector) {
      case ADDRESSEE_ID_TYPE.Phone:
        this.isSubmitEnabled = this._value.length === 11;
        break;
      case ADDRESSEE_ID_TYPE.VatId:
        this.isSubmitEnabled = this._value.length >= 10;
        break;
      default:
        throw new Error('Unknown addressee id type.');
    }
  }

  protected submit(): void {
    this.submitEmitter.emit();

    this._store$.dispatch(
      addresseeUpdateAction({
        idType: this.searchSelector,
        idValue: this._value,
      })
    );

    this._store$.dispatch(addresseeSubmitAction());
  }
}
