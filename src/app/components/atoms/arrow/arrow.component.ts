import { Component, Input } from '@angular/core';

type TDirection = 'left' | 'right' | 'up' | 'down' | '';
type TColor = 'gray' | 'black' | 'primary' | '';

@Component({
    selector: 'app-arrow',
    templateUrl: './arrow.component.html',
    styleUrls: ['./arrow.component.css'],
})
export class ArrowComponent {
    @Input()
    public direction: TDirection = 'left';
    @Input()
    public color: TColor = 'gray';
}
