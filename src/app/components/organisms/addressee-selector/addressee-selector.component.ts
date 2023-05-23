import {
    addresseeSelector,
    isAddresseeSubmittedSelector,
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
    @ViewChild(ModalComponent)
    protected modal: ModalComponent | undefined;

    protected openModalEmitter: EventEmitter<void> = new EventEmitter<void>();
    protected closeModalEmitter: EventEmitter<void> = new EventEmitter<void>();

    protected isAddresseeAdded$ = this._store$.select(
        isAddresseeSubmittedSelector,
    );
    protected addressee$ = this._store$.select(addresseeSelector);

    constructor(private _store$: Store) {}

    protected removeAddressee(): void {
        this._store$.dispatch(resetAddresseeAction());
    }

    protected showSelectorModal(): void {
        this.openModalEmitter.emit();
    }

    protected hideSelectorModal(): void {
        this.closeModalEmitter.emit();
    }
}
