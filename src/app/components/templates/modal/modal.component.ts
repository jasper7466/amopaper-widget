import {
    Component,
    HostBinding,
    Input,
    EventEmitter,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
    @HostBinding('class.opened')
    protected isOpened = false;
    @Input()
    protected isClosable = true;
    @Input()
    public openTrigger: EventEmitter<void>;
    @Input()
    public closeTrigger: EventEmitter<void>;

    private _onDestroyEmitter = new EventEmitter<void>();

    public ngOnInit(): void {
        this.openTrigger
            .pipe(takeUntil(this._onDestroyEmitter))
            .subscribe(() => this.open());
        this.closeTrigger
            .pipe(takeUntil(this._onDestroyEmitter))
            .subscribe(() => this.close());
    }

    public ngOnDestroy(): void {
        this._onDestroyEmitter.emit();
    }

    protected close(): void {
        if (this.isClosable) {
            this.isOpened = false;
        }
    }

    protected open(): void {
        this.isOpened = true;
    }
}
