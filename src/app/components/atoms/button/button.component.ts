import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ButtonStyleOption = 'solid' | 'blank' | 'skeleton';
type TColor = 'regular' | 'danger' | 'custom';
type TIcon = 'plus' | 'upload' | 'sign' | 'trash' | '';
type TSize = 'medium' | 'custom';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
    @Input() public styleOption: ButtonStyleOption = 'solid';
    @Input() public colorOption: TColor = 'regular';
    @Input() public iconOption: TIcon = '';
    @Input() public sizeOption: TSize = 'medium';
    @Input() public isEnabled = true;
    @Input() public typeOption = 'button';

    @Output() protected customClick = new EventEmitter<void>();

    protected clickHandler(): void {
        this.customClick.emit();
    }
}
