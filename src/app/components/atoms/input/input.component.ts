import { Component, EventEmitter, Input, Output } from '@angular/core';

type TTooltip = 'tooltip' | null;

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.css'],
})
export class InputComponent {
    @Input()
    public label = '';
    @Input()
    public placeholder = '';
    @Input()
    public tooltipOption: TTooltip = null;
    @Input()
    public mask = '';
    @Input()
    public type = 'text';
    @Input()
    public maskPrefix = '';

    @Output()
    protected keyUp = new EventEmitter<string>();

    protected inputKeyUpHandler(value: string): void {
        this.keyUp.emit(value);
    }
}
