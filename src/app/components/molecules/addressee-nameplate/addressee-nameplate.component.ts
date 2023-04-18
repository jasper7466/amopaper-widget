import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ADDRESSEE_ID_TYPE } from 'src/app/interfaces/addressee.interface';

@Component({
    selector: 'app-addressee-nameplate',
    templateUrl: './addressee-nameplate.component.html',
    styleUrls: ['./addressee-nameplate.component.css'],
})
export class AddresseeNameplateComponent {
    @Input()
    public name = 'Получатель';
    @Input()
    public idValue: string;
    @Input()
    public idType: ADDRESSEE_ID_TYPE;

    @Output()
    protected clickRemoveButton = new EventEmitter<void>();

    protected addresseeIdType = ADDRESSEE_ID_TYPE;

    protected removeButtonClickHandler(): void {
        this.clickRemoveButton.emit();
    }
}
