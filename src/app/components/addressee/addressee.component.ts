import { xApiKeySelector } from '../../store/crm-context/selectors';
import { addAddresseeByPhoneAction } from '../../store/addressee/actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-addressee',
  templateUrl: './addressee.component.html',
  styleUrls: ['./addressee.component.css'],
})
export class AddresseeComponent implements OnInit {
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}
  ngAfterInit() {}
}
