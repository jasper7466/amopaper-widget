import { removeAddresseeAction } from 'src/app/store/addressee/actions';
import { addresseeSelector } from 'src/app/store/addressee/selectors';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-addressee-nameplate',
  templateUrl: './addressee-nameplate.component.html',
  styleUrls: ['./addressee-nameplate.component.css'],
})
export class AddresseeNameplateComponent implements OnInit {
  addressee$ = this.store.select(addresseeSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {}

  addresseeRemove() {
    this.store.dispatch(removeAddresseeAction());
  }
}
