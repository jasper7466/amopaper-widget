import { ButtonStyleOption } from './../../atoms/button/button.component';
import { switchMap, tap, take } from 'rxjs';
import { shareLinkSelector } from './../../../store/misc/selectors';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

const captions = {
    initial: 'Скопировать ссылку на подпись КЭП',
    copied: 'Скопировано',
};

@Component({
    selector: 'app-share-link-button',
    templateUrl: './share-link-button.component.html',
    styleUrls: ['./share-link-button.component.css'],
})
export class ShareLinkButtonComponent {
    @Input()
    public packetId: number;

    protected caption: string = captions.initial;
    protected style: ButtonStyleOption = 'solid';
    protected isEnabled = true;

    protected shareLink$ = this._store$.select(shareLinkSelector);

    constructor(
        private _store$: Store,
        private _nopaperService: NopaperService,
        private _clipboard: Clipboard
    ) {}

    protected clickHandler(): void {
        this.isEnabled = false;

        this._nopaperService
            .getShareLink$(this.packetId)
            .pipe(
                switchMap(() => this.shareLink$),
                take(1),
                tap((link) => {
                    this._clipboard.copy(link);
                    this.isEnabled = true;
                    this.caption = captions.copied;
                    this.style = 'blank';
                })
            )
            .subscribe();
    }
}
