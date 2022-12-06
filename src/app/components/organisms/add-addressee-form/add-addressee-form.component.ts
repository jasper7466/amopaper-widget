import {
  addAddresseeByPhoneAction,
  addAddresseeByVatIdAction,
  setAddresseeExistenceAction,
} from '../../../store/addressee/actions';
import { NopaperApiService } from '../../../services/api/nopaper/nopaper-api.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Store } from '@ngrx/store';

type SearchSelector = 'vatId' | 'phone';

@Component({
  selector: 'app-add-addressee-form',
  templateUrl: './add-addressee-form.component.html',
  styleUrls: ['./add-addressee-form.component.css'],
})
export class AddAddresseeFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<void>();

  searchSelector: SearchSelector = 'vatId';
  inputKeyUp$: Subject<string>;
  isSubmitEnabled: boolean = false;
  value: string = '';

  constructor(
    private nopaperApiService: NopaperApiService,
    private store: Store
  ) {}

  ngOnInit(): void {}

  changeSearchSelector(selector: SearchSelector) {
    if (this.searchSelector === selector) {
      return;
    }
    this.searchSelector = selector;
    this.isSubmitEnabled = false;
  }

  searchInputKeyUp(value: string) {
    this.value = value.replace(/\D+/g, '');

    if (this.searchSelector === 'phone') {
      this.isSubmitEnabled = this.value.length === 11;
      return;
    }

    if (this.searchSelector === 'vatId') {
      this.isSubmitEnabled = this.value.length >= 10;
      return;
    }
  }

  submit(): void {
    this.onSubmit.emit();

    if (this.searchSelector === 'phone') {
      this.store.dispatch(
        addAddresseeByPhoneAction({
          phone: this.value,
        })
      );

      this.nopaperApiService
        .checkUserByPhone$(this.value)
        .subscribe((response) => {
          if ('userGuid' in response) {
            this.store.dispatch(setAddresseeExistenceAction());
          }
        });
      return;
    }

    if (this.searchSelector === 'vatId') {
      this.store.dispatch(
        addAddresseeByVatIdAction({
          vatId: this.value,
        })
      );
      return;
    }
  }
}
